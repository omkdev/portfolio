import nodemailer from 'nodemailer'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

let ratelimit

function getRatelimit() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return null
  }

  if (!ratelimit) {
    const redis = new Redis({ url, token })
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
    })
  }

  return ratelimit
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  const forwardedIp =
    typeof forwarded === 'string'
      ? forwarded.split(',')[0]?.trim()
      : forwarded?.[0]?.trim()

  return forwardedIp || req.socket?.remoteAddress || 'unknown'
}

async function checkRateLimit(req) {
  const limiter = getRatelimit()

  if (!limiter) {
    console.warn('Upstash not configured — skipping rate limit')
    return true
  }

  const ip = getClientIp(req)
  const { success } = await limiter.limit(ip)
  return success
}

async function verifyTurnstile(turnstileToken) {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY not set — skipping captcha verification')
    return true
  }

  if (!turnstileToken) {
    return false
  }

  const verification = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: turnstileToken,
      }),
    },
  )

  const result = await verification.json()
  return result.success === true
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const rateLimitOk = await checkRateLimit(req)
  if (!rateLimitOk) {
    return res.status(429).json({
      error: 'Too many submissions. Try again later.',
    })
  }

  const { name, email, message, turnstileToken } = req.body ?? {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedMessage = message.trim()

  if (trimmedName.length > 100) {
    return res.status(400).json({ error: 'Name too long' })
  }

  if (trimmedEmail.length > 254) {
    return res.status(400).json({ error: 'Email too long' })
  }

  if (trimmedMessage.length > 2000) {
    return res.status(400).json({ error: 'Message too long' })
  }

  if (!isValidEmail(trimmedEmail)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  const captchaValid = await verifyTurnstile(turnstileToken)
  if (!captchaValid) {
    return res.status(400).json({ error: 'Captcha verification failed' })
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, SMTP_FROM } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('SMTP environment variables are not configured')
    return res.status(500).json({ error: 'Email service is not configured.' })
  }

  const to = CONTACT_TO_EMAIL || SMTP_USER
  const from = SMTP_FROM || SMTP_USER

  const safeName = escapeHtml(trimmedName)
  const safeEmail = escapeHtml(trimmedEmail)
  const safeMessage = escapeHtml(trimmedMessage)

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${from}>`,
      to,
      replyTo: trimmedEmail,
      subject: `Portfolio contact from ${trimmedName}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        '',
        trimmedMessage,
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr />
        <p>${safeMessage.replace(/\n/g, '<br />')}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact form email error:', error)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}

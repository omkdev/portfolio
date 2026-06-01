import nodemailer from 'nodemailer'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body ?? {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, SMTP_FROM } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('SMTP environment variables are not configured')
    return res.status(500).json({ error: 'Email service is not configured.' })
  }

  const to = CONTACT_TO_EMAIL || SMTP_USER
  const from = SMTP_FROM || SMTP_USER

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
      replyTo: email.trim(),
      subject: `Portfolio contact from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        '',
        message.trim(),
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <hr />
        <p>${message.trim().replace(/\n/g, '<br />')}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact form email error:', error)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}

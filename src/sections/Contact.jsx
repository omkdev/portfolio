import { useRef, useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { AtSign, Code2, Download, Link, Mail, Send } from 'lucide-react'
import { capture, identify } from '../lib/posthog'
import SectionTitle from '../components/SectionTitle'
import { profile, socialLinks } from '../constants/navLinks'

const availability = [
  'Full-Time Roles',
  'Software Engineering',
  'Platform Engineering',
  'Security Engineering',
]

const links = [
  { label: profile.email, href: socialLinks.email, icon: Mail },
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Link },
  { label: 'X', href: socialLinks.x, icon: AtSign },
  { label: 'GitHub', href: socialLinks.github, icon: Code2 },
  { label: 'Resume', href: socialLinks.resume, icon: Download },
]

const initialFormData = { name: '', email: '', message: '' }

const fieldClass =
  'w-full rounded-xl border border-accent/20 bg-bg px-4 py-3 text-sm text-text placeholder:text-muted outline-none transition focus:border-accent/50'

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
const captchaRequired = Boolean(turnstileSiteKey)

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef(null)

  const getClickHandler = (label) => {
    if (label === 'Resume') return () => capture('resume_downloaded')
    if (label === 'GitHub') return () => capture('github_clicked')
    if (label === 'LinkedIn') return () => capture('linkedin_clicked')
    if (label === profile.email) return () => capture('contact_clicked')
    return undefined
  }

  const resetTurnstile = () => {
    setTurnstileToken('')
    turnstileRef.current?.reset()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (captchaRequired && !turnstileToken) {
      setStatus('error')
      setErrorMessage('Please complete the captcha verification.')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      identify(formData.email, {
        name: formData.name,
        email: formData.email,
        source: 'portfolio_contact_form',
      })

      capture('contact_form_submitted', {
        name: formData.name,
        email: formData.email,
      })

      setFormData(initialFormData)
      resetTurnstile()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      resetTurnstile()
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <section id="contact" className="section-block section-bg-alt pb-10">
      <div className="section-container">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8">
            <SectionTitle
              eyebrow="Contact"
              title="Looking for a backend engineer with fintech and security experience?"
              highlight="fintech and security"
              subtitle="Reach out — open to on-site, hybrid, or remote roles."
              className="mb-0 max-w-none"
            />

            <div>
              <p className="mb-3 text-xs font-medium tracking-wider text-muted uppercase">
                Available for
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {availability.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1.5 text-xs font-medium text-text"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {links.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    onClick={getClickHandler(label)}
                    className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-text transition hover:border-accent/40"
                  >
                    <Icon size={16} className="shrink-0 text-accent" />
                    <span className="truncate">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass space-y-4 rounded-2xl p-6"
          >
            <div>
              <p className="text-sm font-medium text-text">Send a message</p>
              <p className="mt-1 text-xs text-muted">
                I usually reply within 24–48 hours.
              </p>
            </div>

            <input
              id="contact-name"
              type="text"
              name="name"
              required
              maxLength={100}
              autoComplete="name"
              aria-label="Your name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={fieldClass}
            />

            <input
              id="contact-email"
              type="email"
              name="email"
              required
              maxLength={254}
              autoComplete="email"
              aria-label="Your email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={fieldClass}
            />

            <textarea
              id="contact-message"
              name="message"
              required
              maxLength={2000}
              rows={4}
              aria-label="Your message"
              placeholder="Your message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className={`${fieldClass} resize-y`}
            />

            {captchaRequired && (
              <Turnstile
                ref={turnstileRef}
                siteKey={turnstileSiteKey}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken('')}
                onError={() => setTurnstileToken('')}
                options={{ theme: 'dark' }}
              />
            )}

            {status === 'success' && (
              <output className="block text-sm text-accent">
                Thanks — your message was sent. I&apos;ll get back to you soon.
              </output>
            )}

            {status === 'error' && (
              <p className="text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={
                status === 'sending' || (captchaRequired && !turnstileToken)
              }
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-hover disabled:opacity-60"
            >
              <Send size={16} />
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

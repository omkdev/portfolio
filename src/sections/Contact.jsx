import { useState } from 'react'
import { AtSign, Code2, Download, Link, Mail, Send } from 'lucide-react'
import posthog from 'posthog-js'
import SectionTitle from '../components/SectionTitle'
import { profile, socialLinks } from '../constants/navLinks'

const availability = [
  'Full-Time Roles',
  'Backend Engineering',
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

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState('idle')

  const handleResumeClick = () => {
    posthog.capture('resume_downloaded')
  }
  const handleGithubClick = () => {
    posthog.capture('github_clicked')
  }
  const handleLinkedinClick = () => {
    posthog.capture('linkedin_clicked')
  }
  const handleContactClick = () => {
    posthog.capture('contact_clicked')
  }

  const getClickHandler = (label) => {
    if (label === 'Resume') return handleResumeClick
    if (label === 'GitHub') return handleGithubClick
    if (label === 'LinkedIn') return handleLinkedinClick
    if (label === profile.email) return handleContactClick
    return undefined
  }

  const trackContactFormSubmit = () => {
    posthog.identify(formData.email, {
      name: formData.name,
      email: formData.email,
      source: 'portfolio_contact_form',
    })

    posthog.capture('contact_form_submitted', {
      name: formData.name,
      email: formData.email,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    try {
      if (accessKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio contact from ${formData.name}`,
          }),
        })

        const result = await response.json()
        if (!response.ok || !result.success) {
          throw new Error('Form submission failed')
        }
      } else {
        const body = [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          '',
          formData.message,
        ].join('\n')

        const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
          `Portfolio contact from ${formData.name}`,
        )}&body=${encodeURIComponent(body)}`

        trackContactFormSubmit()
        window.location.href = mailto
        setFormData(initialFormData)
        setStatus('idle')
        return
      }

      trackContactFormSubmit()
      setFormData(initialFormData)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-block section-bg-alt pb-10">
      <div className="section-container">
        <SectionTitle
          eyebrow="Contact"
          title="Looking for a backend engineer with fintech and security experience?"
          highlight="fintech and security"
          subtitle="Reach out — open to on-site, hybrid, or remote roles."
        />

        <div className="mb-6">
          <p className="mb-3 text-xs font-medium tracking-wider text-muted uppercase">
            Available for
          </p>
          <div className="flex flex-wrap gap-2">
            {availability.map((role) => (
              <span
                key={role}
                className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1.5 text-xs font-medium text-text"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass mb-8 max-w-xl space-y-4 rounded-2xl p-6"
        >
          <p className="text-sm font-medium text-text">Send a message</p>

          <div>
            <label htmlFor="contact-name" className="sr-only">
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-xl border border-accent/20 bg-bg px-4 py-3 text-sm text-text placeholder:text-muted outline-none transition focus:border-accent/50"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="sr-only">
              Your email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-xl border border-accent/20 bg-bg px-4 py-3 text-sm text-text placeholder:text-muted outline-none transition focus:border-accent/50"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              placeholder="Your message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full resize-y rounded-xl border border-accent/20 bg-bg px-4 py-3 text-sm text-text placeholder:text-muted outline-none transition focus:border-accent/50"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-hover disabled:opacity-60"
          >
            <Send size={16} />
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <p className="text-sm text-accent" role="status">
              Thanks — your message was sent.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400" role="alert">
              Something went wrong. Try again or email me directly below.
            </p>
          )}
        </form>

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
    </section>
  )
}

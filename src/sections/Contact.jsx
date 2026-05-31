import { AtSign, Code2, Download, Link, Mail } from 'lucide-react'
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

export default function Contact() {
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

        <div className="flex flex-wrap gap-2">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
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

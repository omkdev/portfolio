import { AtSign, Code2, Download, Link, Mail } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { profile, socialLinks } from '../constants/navLinks'

const links = [
  { label: profile.email, href: socialLinks.email, icon: Mail },
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Link },
  { label: 'X', href: socialLinks.x, icon: AtSign },
  { label: 'GitHub', href: socialLinks.github, icon: Code2 },
  { label: 'Resume', href: socialLinks.resume, icon: Download },
]

export default function Contact() {
  return (
    <section id="contact" className="section-block pb-10">
      <div className="section-container">
        <SectionTitle
          eyebrow="Contact"
          title="Let's connect"
          subtitle="Open to backend and full-stack roles — on-site, hybrid, or remote."
        />

        <div className="flex flex-wrap gap-4">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="glass glow-blue inline-flex items-center gap-3 rounded-xl px-5 py-3 text-sm text-text transition hover:bg-white/10"
            >
              <Icon size={18} className="text-accent" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

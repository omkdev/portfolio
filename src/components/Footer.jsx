import { profile } from '../constants/navLinks'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-muted">
          © {year} {profile.name} · Pune, India
        </p>
        <p className="text-xs text-muted/80">Designed &amp; Developed by {profile.name}</p>
      </div>
    </footer>
  )
}

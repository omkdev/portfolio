import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks } from '../constants/navLinks'

const SECTION_IDS = [
  'home',
  'metrics',
  'about',
  'experience',
  'projects',
  'skills',
  'principles',
  'contact',
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('home')
      const threshold = hero ? hero.offsetHeight - 80 : window.innerHeight * 0.85
      setScrolled(window.scrollY >= threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.15, 0.4] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onHero = !scrolled

  const linkClasses = (href) => {
    const isActive = active === href.slice(1)

    if (isActive) {
      return 'font-medium text-accent'
    }

    if (onHero) {
      return 'text-white/55 transition-colors hover:text-accent'
    }

    return 'text-muted transition-colors hover:text-accent'
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        onHero
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-white/10 bg-bg/85 shadow-lg shadow-black/20 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px] lg:px-10">
        <a
          href="#home"
          className="font-heading text-sm font-bold tracking-[0.18em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-base"
        >
          OM KANSE
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative text-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] ${linkClasses(link.href)}`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <span
            className={`hidden text-[11px] font-medium tracking-[0.22em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] lg:block ${
              onHero ? 'text-white/50' : 'text-muted'
            }`}
          >
            Backend Engineer · Trully Capital
          </span>

          <button
            type="button"
            className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-black/92 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-8">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block rounded-lg px-3 py-3 text-lg ${
                      isActive
                        ? 'bg-accent/10 font-medium text-accent'
                        : 'text-white/60 hover:text-accent'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}

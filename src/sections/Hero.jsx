import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import heroVideo from '../assets/videos/HeroSectionVdo.mp4'
import { heroSocialLinks } from '../constants/navLinks'
import { defaultTransition, fadeUp } from '../lib/motion'

const headline = ['BUILDING SECURE SYSTEMS', 'FOR FINTECH PRODUCTION']

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="home" className="relative h-screen min-h-[640px] overflow-hidden">
      {reduceMotion ? (
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-bg to-black" />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40" />

      <div className="absolute top-24 right-5 z-10 flex gap-4 md:hidden">
        {heroSocialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            className="text-[10px] font-medium tracking-[0.14em] text-white/45 uppercase"
          >
            {link.label}
          </a>
        ))}
      </div>

      <aside className="absolute top-1/2 left-5 z-10 hidden -translate-y-1/2 flex-col gap-5 md:flex lg:left-8">
        {heroSocialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...defaultTransition, delay: 0.3 + index * 0.08 }}
            className="text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase transition-colors hover:text-white"
          >
            {link.label}
          </motion.a>
        ))}
      </aside>

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 sm:px-8 sm:pb-10 lg:px-10 lg:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.45 }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-neutral-900/90 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-neutral-800"
            >
              View My Work
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-white/20">
                <ArrowUpRight size={15} />
              </span>
            </a>

            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/50 md:hidden">
              Backend Engineer @ Trully Capital · Node.js · OAuth2 · JWT · AWS
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.55 }}
            className="md:max-w-3xl md:text-right"
          >
            <h1 className="font-heading text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-tight text-white uppercase">
              {headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 hidden text-sm tracking-wide text-white/55 md:block">
              Trully Capital · Node.js · OAuth2 · JWT · AWS · 99.5% uptime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

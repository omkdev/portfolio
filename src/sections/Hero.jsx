import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import heroVideo from '../assets/videos/HeroSectionVdo.mp4'
import { heroSocialLinks } from '../constants/navLinks'
import { defaultTransition, fadeUp } from '../lib/motion'

const headline = [
  { text: 'BUILDING ', highlight: 'SECURE SYSTEMS' },
  { text: 'FOR ', highlight: 'FINTECH', suffix: ' PRODUCTION' },
]

const heroSubtitle = [
  'Building secure authentication systems,',
  'real-time fintech platforms,',
  'and production backend infrastructure.',
]

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [videoFailed, setVideoFailed] = useState(false)
  const showVideo = !reduceMotion && !videoFailed

  return (
    <section id="home" className="section-bg relative h-screen min-h-[680px] overflow-hidden">
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-bg" />
      )}

      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-black/20 to-transparent" />

      <div className="absolute top-24 right-5 z-20 flex gap-4 md:hidden">
        {heroSocialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            className="relative text-[10px] font-medium tracking-[0.14em] text-white/45 uppercase transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>

      <aside className="absolute top-1/2 left-5 z-20 hidden -translate-y-1/2 flex-col gap-5 md:flex lg:left-8">
        {heroSocialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...defaultTransition, delay: 0.3 + index * 0.08 }}
            className="relative text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase transition-colors hover:text-accent"
          >
            {link.label}
          </motion.a>
        ))}
      </aside>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-8 sm:px-8 sm:pb-10 lg:px-10 lg:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.45 }}
            className="pointer-events-auto"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:bg-accent-hover"
            >
              Explore Projects
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg/20 transition group-hover:bg-bg/30">
                <ArrowUpRight size={15} className="text-bg" />
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.55 }}
            className="pointer-events-auto md:max-w-3xl md:text-right"
          >
            <div className="mb-4 flex flex-col items-start gap-2 md:ml-auto md:items-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Available for Backend Engineering Roles
              </span>

              <div className="inline-flex flex-col items-start gap-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-left md:items-end">
                <p className="text-xs font-semibold tracking-wide text-white">
                  Backend Engineer @ Trully Capital
                </p>
                <p className="text-[11px] tracking-wide text-white/50">
                  OAuth2 · AWS · Distributed Systems
                </p>
              </div>
            </div>

            <h1 className="font-heading text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-tight text-white uppercase">
              {headline.map((line) => (
                <span key={line.highlight} className="block">
                  {line.text}
                  <span className="text-gradient-accent">{line.highlight}</span>
                  {line.suffix ?? ''}
                </span>
              ))}
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 md:ml-auto">
              {heroSubtitle.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

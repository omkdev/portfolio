import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Skeleton from '../components/Skeleton'
import { capture } from '../lib/posthog'
import { heroSocialLinks } from '../constants/navLinks'

import { defaultTransition, fadeUp } from '../lib/motion'

const headline = [
  { text: 'BUILDING ', highlight: 'SECURE SYSTEMS' },
  { text: 'FOR ', highlight: 'FINTECH', suffix: ' PRODUCTION' },
]

const heroSubtitle = [
  'Software Engineer. Fintech. Security-first.',
  'Java · Spring Boot · Kafka · AWS · OAuth2.',
  'From auth flows to distributed backends.',
]

export default function Hero({ heroVideoUrl = '' }) {
  const reduceMotion = useReducedMotion()
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const showVideo = Boolean(heroVideoUrl) && !reduceMotion && !videoFailed

  const markVideoReady = () => setVideoReady(true)

  const handleSocialClick = (label) => {
    if (label === 'GitHub') {
      capture('github_clicked')
    } else if (label === 'LinkedIn') {
      capture('linkedin_clicked')
    } else if (label === 'Email') {
      capture('contact_clicked')
    }
  }

  const mediaLayerClass =
    'pointer-events-none absolute inset-0 md:pointer-events-auto'

  return (
    <section
      id="home"
      className="section-bg relative overflow-hidden md:h-screen md:min-h-[680px]"
    >
      <div className="relative h-[38vh] min-h-[220px] max-h-[360px] w-full md:absolute md:inset-0 md:h-full md:max-h-none">
        {showVideo ? (
          <>
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                videoReady ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Skeleton className="h-full w-full rounded-none" />
            </div>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              tabIndex={-1}
              className={`absolute inset-0 object-cover object-top transition-[opacity,transform] duration-700 ease-out md:object-center ${
                videoReady ? 'scale-[1.04] opacity-100' : 'scale-[1.02] opacity-0'
              }`}
              onLoadedData={markVideoReady}
              onCanPlay={markVideoReady}
              onError={() => setVideoFailed(true)}
            >
              <source src={heroVideoUrl} type="video/mp4" />
            </video>
          </>
        ) : (
          <div className="absolute inset-0 bg-bg" />
        )}

        <div className={`${mediaLayerClass} hero-grid opacity-60`} aria-hidden="true" />
        <div
          className={`${mediaLayerClass} bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.06),transparent_40%)]`}
        />
        <div className={`${mediaLayerClass} bg-black/30`} />
        <div
          className={`${mediaLayerClass} bg-gradient-to-t from-bg via-black/50 to-transparent md:via-black/20`}
        />
      </div>

      <div className="absolute top-24 right-5 z-20 flex gap-4 md:hidden">
        {heroSocialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            onClick={() => handleSocialClick(link.label)}
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
            onClick={() => handleSocialClick(link.label)}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...defaultTransition, delay: 0.3 + index * 0.08 }}
            className="relative text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase transition-colors hover:text-accent"
          >
            {link.label}
          </motion.a>
        ))}
      </aside>

      <div className="relative z-10 bg-bg px-5 py-6 sm:px-8 md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:bg-transparent md:py-0 md:pb-10 lg:px-10 lg:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.45 }}
            className="pointer-events-auto order-2 md:order-1"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:bg-accent-hover"
            >
              <span>Explore Projects</span>
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
            className="pointer-events-auto order-1 md:order-2 md:max-w-3xl md:text-right"
          >
            <div className="mb-4 flex flex-col items-start gap-2 md:ml-auto md:items-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Available for Software Engineering Roles</span>
              </span>

              <div className="inline-flex flex-col items-start gap-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-left md:items-end">
                <p className="text-xs font-semibold tracking-wide text-white">
                  Software Engineer · Fintech company
                </p>
                <p className="text-[11px] tracking-wide text-white/50">
                  OAuth2 · AWS · Distributed Systems
                </p>
              </div>
            </div>

            <h1 className="font-heading text-[clamp(1.65rem,5.5vw,4.5rem)] leading-[0.95] font-bold tracking-tight text-white uppercase">
              {headline.map((line) => (
                <span key={line.highlight} className="block">
                  {line.text}
                  <span className="text-gradient-accent">{line.highlight}</span>
                  {line.suffix ?? ''}
                </span>
              ))}
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:mt-4 md:text-white/60 md:ml-auto">
              {heroSubtitle.map((line, index) => (
                <span
                  key={line}
                  className={`block ${index > 0 ? 'hidden sm:block' : ''}`}
                >
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

Hero.propTypes = {
  heroVideoUrl: PropTypes.string,
}

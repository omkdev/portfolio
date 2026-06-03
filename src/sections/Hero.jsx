import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
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

const socialLinkClass =
  'relative text-[10px] font-medium tracking-[0.14em] text-white/60 uppercase transition-colors hover:text-white md:text-[11px] md:tracking-[0.16em]'

function SocialLinks({ onLinkClick, animate = false }) {
  return heroSocialLinks.map((link, index) => (
    <motion.a
      key={link.label}
      href={link.href}
      target={link.href.startsWith('http') ? '_blank' : undefined}
      rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
      onClick={() => onLinkClick(link.label)}
      {...(animate
        ? {
            initial: { opacity: 0, x: -12 },
            animate: { opacity: 1, x: 0 },
            transition: { ...defaultTransition, delay: 0.3 + index * 0.08 },
          }
        : {})}
      className={socialLinkClass}
    >
      {link.label}
    </motion.a>
  ))
}

SocialLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  animate: PropTypes.bool,
}

export default function Hero({ heroVideoUrl = '' }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const showVideo = Boolean(heroVideoUrl) && !videoFailed

  const markVideoReady = () => setVideoReady(true)

  useEffect(() => {
    if (!showVideo) {
      return undefined
    }

    const fallbackReady = globalThis.setTimeout(() => setVideoReady(true), 4000)
    return () => globalThis.clearTimeout(fallbackReady)
  }, [showVideo, heroVideoUrl])

  const handleSocialClick = (label) => {
    if (label === 'GitHub') {
      capture('github_clicked')
    } else if (label === 'LinkedIn') {
      capture('linkedin_clicked')
    } else if (label === 'Email') {
      capture('contact_clicked')
    }
  }

  return (
    <section
      id="home"
      className="hero-viewport relative isolate overflow-hidden lg:min-h-[680px]"
    >
      <div className="absolute inset-0 z-0">
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
              preload="auto"
              tabIndex={-1}
              className={`absolute inset-0 h-full w-full object-cover object-[center_20%] brightness-[1] transition-opacity duration-700 ease-out md:object-center ${
                videoReady ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadStart={() => setVideoReady(false)}
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

        <div
          className="pointer-events-none absolute inset-0 bg-black/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/32 from-0% via-transparent via-45% to-transparent to-100%"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/52 from-0% via-black/26 via-45% to-black/14 to-100% md:from-black/42 md:via-black/18 md:to-black/10 md:to-100%"
          aria-hidden="true"
        />
      </div>

      <aside className="absolute top-1/2 left-5 z-20 hidden -translate-y-1/2 flex-col gap-5 lg:flex lg:left-8">
        <SocialLinks onLinkClick={handleSocialClick} animate />
      </aside>

      <div className="absolute inset-0 z-10 flex h-full max-h-full min-h-0 flex-col justify-between overflow-visible px-5 pt-16 pb-6 sm:px-8 sm:pb-8 lg:pointer-events-none lg:justify-end lg:px-10 lg:pb-12 lg:pt-0">
        <div className="pointer-events-auto shrink-0 lg:hidden">
          <div className="flex flex-row flex-wrap gap-x-5 gap-y-2">
            <SocialLinks onLinkClick={handleSocialClick} />
          </div>
        </div>

        <div className="mx-auto flex w-full min-h-0 max-w-7xl shrink flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.55 }}
            className="pointer-events-auto flex min-h-0 flex-col gap-2 lg:order-2 lg:max-w-3xl lg:items-end lg:gap-2 lg:text-right"
          >
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>Available for Software Engineering Roles</span>
            </span>

            <div className="inline-flex w-fit flex-col gap-1 rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-left backdrop-blur-sm lg:items-end">
              <p className="text-xs font-semibold tracking-wide text-white">
                Software Engineer · Fintech company
              </p>
              <p className="text-[11px] tracking-wide text-white/50">
                OAuth2 · AWS · Distributed Systems
              </p>
            </div>

            <h1 className="font-heading text-[clamp(1.5rem,3.8vw,4.5rem)] leading-[0.95] font-bold tracking-tight text-white uppercase">
              {headline.map((line) => (
                <span key={line.highlight} className="block">
                  {line.text}
                  <span className="text-gradient-accent">{line.highlight}</span>
                  {line.suffix ?? ''}
                </span>
              ))}
            </h1>

            <p className="max-w-lg text-xs leading-relaxed text-white/75 sm:text-sm lg:ml-auto">
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.45 }}
            className="pointer-events-auto shrink-0 lg:order-1"
          >
            <a
              href="#projects"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:bg-accent-hover"
            >
              <span>Explore Projects</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg/20 transition group-hover:bg-bg/30">
                <ArrowUpRight size={15} className="text-bg" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

Hero.propTypes = {
  heroVideoUrl: PropTypes.string,
}

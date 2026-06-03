import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { experience } from '../data/experience'
import { fadeUp, staggerContainer } from '../lib/motion'

export default function Experience() {
  return (
    <section id="experience" className="section-block section-bg-alt">
      <div className="section-container">
        <SectionTitle
          eyebrow="Experience"
          title="Growth timeline"
          highlight="timeline"
          subtitle="Intern → Associate at Trully Capital in 6 months · OSS security work via NSoC 2026."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-2xl"
        >
          <div className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent" />

          <div className="space-y-6">
            {experience.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeUp}
                className={`relative pl-12 ${
                  item.current
                    ? 'rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] py-5 pr-5'
                    : ''
                }`}
              >
                <span
                  className={`absolute top-2 left-2.5 h-3 w-3 rounded-full ${
                    item.current ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-accent'
                  }`}
                />

                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <p className="text-sm text-accent">{item.period}</p>
                  {item.current && (
                    <>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-400 uppercase">
                        Current Role
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                        Current
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-heading text-xl font-semibold text-white">{item.role}</h3>
                <p className="text-muted">{item.company}</p>
                {item.location && <p className="text-xs text-muted/80">{item.location}</p>}
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-accent">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-text">
                      {highlight}
                    </li>
                  ))}
                </ul>
                {item.links && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.links.github && (
                      <a
                        href={item.links.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:text-accent-hover"
                      >
                        GitHub — omkdev
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                    {item.links.showcase && (
                      <a
                        href={item.links.showcase}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-accent"
                      >
                        Security PR (Aurakriti)
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

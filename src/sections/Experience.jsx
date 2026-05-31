import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import { experience } from '../data/experience'
import { fadeUp, staggerContainer } from '../lib/motion'

export default function Experience() {
  return (
    <section id="experience" className="section-block">
      <div className="section-container">
        <SectionTitle
          eyebrow="Experience"
          title="Growth timeline"
          subtitle="Intern → Associate Software Engineer at Trully Capital in 6 months."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-2xl"
        >
          <div className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />

          <div className="space-y-6">
            {experience.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeUp}
                className="relative pl-12"
              >
                <span className="absolute top-1.5 left-2.5 h-3 w-3 rounded-full bg-accent glow-blue" />
                <p className="text-sm text-accent">{item.period}</p>
                <h3 className="font-heading mt-1 text-xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="text-muted">{item.company}</p>
                {item.location && (
                  <p className="text-xs text-muted/80">{item.location}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <ul className="mt-3 space-y-1">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-text">
                      · {highlight}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

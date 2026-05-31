import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { principles } from '../data/principles'
import { fadeUp, staggerContainer } from '../lib/motion'

export default function Principles() {
  return (
    <section id="principles" className="section-block section-bg">
      <div className="section-container">
        <SectionTitle
          eyebrow="Engineering"
          title="Principles I work by"
          highlight="Principles"
          subtitle="How I approach production systems — not just features."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((principle) => (
            <motion.li
              key={principle}
              variants={fadeUp}
              className="glass flex items-start gap-3 rounded-xl px-4 py-3.5"
            >
              <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm text-text">{principle}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

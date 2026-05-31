import { motion } from 'framer-motion'
import SkillCard from '../components/SkillCard'
import SectionTitle from '../components/SectionTitle'
import { skillGroups } from '../data/skills'
import { fadeUp, staggerContainer } from '../lib/motion'

export default function Skills() {
  return (
    <section id="skills" className="section-block section-bg-alt">
      <div className="section-container">
        <SectionTitle
          eyebrow="Skills"
          title="Systems I build with"
          highlight="build"
          subtitle="Backend-first, security-aware, production-ready."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={fadeUp}>
              <SkillCard title={group.title} skills={group.skills} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

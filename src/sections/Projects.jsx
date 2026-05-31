import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import SectionTitle from '../components/SectionTitle'
import { socialLinks } from '../constants/navLinks'
import { projects } from '../data/projects'
import { fadeUp, staggerContainer } from '../lib/motion'

export default function Projects() {
  return (
    <section id="projects" className="section-block">
      <div className="section-container">
        <SectionTitle
          eyebrow="Projects"
          title="Problem → Built → Impact"
          subtitle="Each project tells a story — with code on GitHub."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
          >
            View all repositories on GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

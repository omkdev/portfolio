import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import posthog from 'posthog-js'
import ProjectCard from '../components/ProjectCard'
import SectionTitle from '../components/SectionTitle'
import { socialLinks } from '../constants/navLinks'
import { projects } from '../data/projects'
import { fadeUp, staggerContainer } from '../lib/motion'

const featuredProject = projects.find((project) => project.featured)
const otherProjects = projects.filter((project) => !project.featured)

export default function Projects() {
  return (
    <section id="projects" className="section-block section-bg">
      <div className="section-container">
        <SectionTitle
          eyebrow="Projects"
          title="Problem → Built → Impact"
          highlight="Impact"
          subtitle="Each project tells a story — with code on GitHub."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-4"
        >
          {featuredProject && (
            <motion.div variants={fadeUp}>
              <p className="mb-3 text-xs font-medium tracking-[0.2em] text-accent uppercase">
                Featured Project
              </p>
              <ProjectCard project={featuredProject} featured />
            </motion.div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {otherProjects.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
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
            onClick={() => posthog.capture('github_clicked')}
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            View all repositories on GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

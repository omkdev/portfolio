import { ExternalLink, Code2 } from 'lucide-react'

export default function ProjectCard({ project }) {
  return (
    <article className="glass glow-blue flex h-full flex-col overflow-hidden rounded-2xl">
      {project.image && (
        <div className="border-b border-white/10 bg-white/5">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-40 w-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {project.period && (
              <p className="text-xs font-medium tracking-wider text-accent uppercase">
                {project.period}
              </p>
            )}
            {project.badge && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tracking-wide text-muted uppercase">
                {project.badge}
              </span>
            )}
          </div>
          <h3 className="font-heading text-xl font-semibold text-white">{project.title}</h3>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
              Problem
            </p>
            <p className="text-muted">{project.problem}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
              What I Built
            </p>
            <p className="text-muted">{project.built}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
              Impact
            </p>
            <p className="text-text">{project.impact}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
            >
              <Code2 size={16} />
              Code
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
            >
              <ExternalLink size={16} />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

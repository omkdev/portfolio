import {
  Code2,
  ExternalLink,
  Layers,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react'
import posthog from 'posthog-js'

const headerIcons = {
  Layers,
  ShieldCheck,
  ShoppingCart,
}

function ArchNode({ label }) {
  return (
    <span className="w-full max-w-[200px] rounded border border-white/10 bg-bg-elevated px-3 py-1.5 text-center text-text">
      {label}
    </span>
  )
}

function ArchArrow() {
  return (
    <span className="py-1 text-accent/70" aria-hidden="true">
      ↓
    </span>
  )
}

function LinearArchitecture({ layers }) {
  return (
    <>
      {layers.map((layer, index) => (
        <div key={layer} className="flex flex-col items-center">
          <ArchNode label={layer} />
          {index < layers.length - 1 && <ArchArrow />}
        </div>
      ))}
    </>
  )
}

function DistributedArchitecture({ trunk, branches }) {
  return (
    <>
      {trunk.map((layer, index) => (
        <div key={layer} className="flex flex-col items-center">
          <ArchNode label={layer} />
          {index < trunk.length - 1 && <ArchArrow />}
        </div>
      ))}

      <div className="mt-1 grid w-full max-w-xs grid-cols-2 gap-4 sm:max-w-sm">
        {branches.map((branch, index) => (
          <div key={branch.label ?? branch.path[0]} className="flex flex-col items-center">
            <span className="mb-1 text-accent/70" aria-hidden="true">
              {index === 0 ? '↙' : '↘'}
            </span>
            {branch.label ? (
              <ArchNode label={branch.label} />
            ) : (
              <>
                {branch.path.map((node, pathIndex) => (
                  <div key={node} className="flex flex-col items-center">
                    <ArchNode label={node} />
                    {pathIndex < branch.path.length - 1 && <ArchArrow />}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

function ArchitecturePreview({ architecture }) {
  const isDistributed = architecture && typeof architecture === 'object' && !Array.isArray(architecture)

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-bg/60 p-4">
      <p className="mb-3 text-xs font-medium tracking-wider text-accent uppercase">Architecture</p>
      <div className="font-mono flex flex-col items-center text-xs leading-relaxed text-muted">
        {isDistributed ? (
          <DistributedArchitecture trunk={architecture.trunk} branches={architecture.branches} />
        ) : (
          <LinearArchitecture layers={architecture} />
        )}
      </div>
    </div>
  )
}

export default function ProjectCard({ project, featured = false }) {
  const HeaderIcon = headerIcons[project.headerIcon]

  const handleProjectClick = () => {
    posthog.capture('project_clicked', {
      project: project.shortName,
      category: project.headerLabel,
      featured: featured,
    })
  }

  return (
    <article
      onClick={handleProjectClick}
      className={`glass flex h-full flex-col overflow-hidden rounded-xl cursor-pointer ${
        featured ? 'border-accent/30' : ''
      }`}
    >
      {project.image ? (
        <div className="border-b border-white/10">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-40 w-full object-cover object-center"
            loading="lazy"
          />
        </div>
      ) : (
        <div className={`border-b px-5 py-4 ${project.headerAccent ?? 'border-white/10 bg-bg-elevated'}`}>
          <div className="flex items-center gap-2">
            {HeaderIcon && <HeaderIcon size={16} className="text-accent" />}
            <span className="text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
              {project.headerLabel}
            </span>
          </div>
          <p className="font-heading mt-2 text-lg font-semibold text-white">{project.shortName}</p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {project.period && (
              <p className="text-xs font-medium tracking-wider text-muted uppercase">
                {project.period}
              </p>
            )}
            {project.badge && (
              <span className="rounded-full border border-white/10 bg-bg px-2 py-0.5 text-[10px] tracking-wide text-muted uppercase">
                {project.badge}
              </span>
            )}
          </div>
          <h3 className="font-heading text-lg font-semibold leading-snug text-white">
            {project.title}
          </h3>
        </div>

        <div className="space-y-3 text-sm leading-relaxed">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">Problem</p>
            <p className="text-muted">{project.problem}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
              What I Built
            </p>
            <p className="text-muted">{project.built}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">Impact</p>
            <p className="text-text">{project.impact}</p>
          </div>
        </div>

        {project.architecture && <ArchitecturePreview architecture={project.architecture} />}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-bg px-2.5 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-3 border-t border-white/10 pt-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation()
                posthog.capture('github_clicked')
              }}
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
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
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
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

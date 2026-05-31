const FEATURED_TECH = [
  'Java',
  'Spring Boot',
  'AWS',
  'Kafka',
  'PostgreSQL',
  'Redis',
  'OAuth2',
  'Keycloak',
]

export default function FeaturedTechnologies() {
  return (
    <div
      className="section-divider section-bg-alt py-5 sm:py-6"
      aria-label="Featured technologies"
    >
      <div className="section-container text-center">
        <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
          Featured Technologies
        </p>
        <p className="font-heading text-sm font-medium tracking-wide text-text sm:text-base">
          {FEATURED_TECH.map((tech, index) => (
            <span key={tech}>
              {index > 0 && <span className="px-2 text-white/30 sm:px-3">•</span>}
              {tech}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

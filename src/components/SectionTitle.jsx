function renderTitle(title, highlight) {
  if (!highlight || !title.includes(highlight)) {
    return title
  }

  const index = title.indexOf(highlight)
  const before = title.slice(0, index)
  const after = title.slice(index + highlight.length)

  return (
    <>
      {before}
      <span className="text-gradient-accent">{highlight}</span>
      {after}
    </>
  )
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  highlight,
  className = '',
}) {
  return (
    <div className={`mb-6 max-w-2xl ${className}`.trim()}>
      {eyebrow && (
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
        {renderTitle(title, highlight)}
      </h2>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </div>
  )
}

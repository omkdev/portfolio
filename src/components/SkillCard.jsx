export default function SkillCard({ title, skills }) {
  return (
    <div className="glass glow-blue rounded-2xl p-6">
      <h3 className="font-heading mb-4 text-lg font-semibold text-white">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-text"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

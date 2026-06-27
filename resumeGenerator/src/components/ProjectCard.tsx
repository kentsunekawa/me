import type { Project } from '../types'

/** プロジェクト 1 件分。職務経歴書の主役。装飾は抑え、余白と文字の塊で見せる。 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project">
      <header className="project-head">
        <h3 className="project-name">{project.name}</h3>
        <span className="project-period">{project.period}</span>
      </header>

      <p className="project-meta">
        <span>{project.company}</span>
        <span>{project.role}</span>
        <span>{project.team}</span>
      </p>

      <p className="project-overview">{project.overview}</p>

      <ul className="project-highlights">
        {project.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      <p className="project-stack">{project.stack}</p>
    </article>
  )
}

import type { Career, CareerKind, Resume } from './types'
import { chunk } from './utils'
import { Page } from './components/Page'
import { Section } from './components/Section'
import { ProjectCard } from './components/ProjectCard'

// 1 ページに載せるプロジェクト数。ここを変えるとページ割りが変わる。
const PROJECTS_PER_PAGE = 6

const CAREER_GROUPS: { kind: CareerKind; label: string }[] = [
  { kind: 'develop', label: 'Web 開発' },
  { kind: 'create', label: 'Web 制作' },
]

/** ドキュメントヘッダー（職務経歴書 / 日付 / 氏名 / 生年月日）。 */
function DocHeader({ meta }: { meta: Resume['meta'] }) {
  return (
    <header className="doc-header">
      <h1 className="doc-title">{meta.title}</h1>
      <div className="doc-header-meta">
        <div className="doc-date">{meta.date}</div>
        <div className="doc-name">{meta.name}</div>
        <div className="doc-sub">
          生年月日：{meta.birth}　/　{meta.contact.join('　')}
        </div>
      </div>
    </header>
  )
}

/** 職歴を Web 開発 / Web 制作に分け、各群を（データ順＝新しい順のまま）表示する。 */
function Careers({ careers }: { careers: Career[] }) {
  return (
    <div className="careers">
      {CAREER_GROUPS.map((g) => {
        const rows = careers.filter((c) => c.kind === g.kind)
        if (rows.length === 0) return null
        return (
          <div className="career-group" key={g.kind}>
            <h3 className="career-group-title">{g.label}</h3>
            <table className="career-table">
              <tbody>
                {rows.map((c, i) => (
                  <tr key={i}>
                    <td className="c-period">{c.period}</td>
                    <td className="c-company">{c.company}</td>
                    <td className="c-employment">{c.employment}</td>
                    <td className="c-role">{c.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export function ResumeDoc({ resume }: { resume: Resume }) {
  const { meta, summary, skills, education, careers, projectsNote, projects, qualifications, awards, pr } =
    resume

  const projectPages = chunk(projects, PROJECTS_PER_PAGE)
  // 1 ページ目（要約など）＋ プロジェクト各ページ ＋ 最終ページ（資格など）
  const totalPages = 2 + projectPages.length

  return (
    <div className="resume">
      {/* ── ページ 1：職務要約 / スキル / 学歴 / 職歴 ── */}
      <Page page={1} total={totalPages}>
        <DocHeader meta={meta} />

        <Section title="職務要約">
          <p className="summary-text">{summary}</p>
        </Section>

        <Section title="活かせる経験・知識・スキル">
          <ul className="skill-highlights">
            {skills.highlights.map((h, i) => (
              <li key={i}>
                <span className="sh-title">{h.title}</span>
                <span className="sh-body">{h.body}</span>
              </li>
            ))}
          </ul>
          <div className="stack-list">
            {skills.stack.map((s, i) => (
              <div className="stack-row" key={i}>
                <div className="stack-label">{s.label}</div>
                <div className="stack-value">{s.value}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="学歴">
          <table className="simple-table">
            <tbody>
              {education.map((e, i) => (
                <tr key={i}>
                  <td className="e-period">{e.period}</td>
                  <td>{e.school}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="職歴">
          <Careers careers={careers} />
        </Section>
      </Page>

      {/* ── ページ 2〜：プロジェクト ── */}
      {projectPages.map((group, pageIdx) => (
        <Page key={pageIdx} page={2 + pageIdx} total={totalPages}>
          <Section title={pageIdx === 0 ? 'プロジェクト' : 'プロジェクト（続き）'}>
            {pageIdx === 0 && projectsNote && <p className="projects-note">{projectsNote}</p>}
            {group.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </Section>
        </Page>
      ))}

      {/* ── 最終ページ：資格 / 受賞歴 / 自己 PR ── */}
      <Page page={totalPages} total={totalPages}>
        <Section title="資格・免許">
          <table className="mini-table">
            <tbody>
              {qualifications.map((q, i) => (
                <tr key={i}>
                  <td className="m-date">{q.date}</td>
                  <td>{q.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="受賞歴">
          <div className="awards-grid">
            {awards.map((a, i) => (
              <div className="award" key={i}>
                <span className="m-date">{a.date}</span>
                {a.name}
              </div>
            ))}
          </div>
        </Section>

        <Section title="自己 PR">
          {pr.map((sec, i) => (
            <div className="pr-section" key={i}>
              <h3 className="pr-section-title">{sec.title}</h3>
              {sec.items ? (
                <div className="pr-items">
                  {sec.items.map((it, j) => (
                    <div className="pr-item" key={j}>
                      <h4 className="pr-item-title">{it.title}</h4>
                      <p className="pr-item-body">{it.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="pr-body">{sec.body}</p>
              )}
            </div>
          ))}
        </Section>
      </Page>
    </div>
  )
}

// content/resume.yaml と一致させる契約（スキーマ）。
// yaml 側のキー名・ネスト構造はこの型に合わせて維持する。

export type CareerKind = 'develop' | 'create'

export interface Meta {
  title: string
  date: string
  name: string
  birth: string
  contact: string[]
}

export interface SkillHighlight {
  title: string
  body: string
}

export interface StackRow {
  label: string
  value: string
}

export interface Skills {
  highlights: SkillHighlight[]
  stack: StackRow[]
}

export interface Education {
  period: string
  school: string
}

export interface Career {
  kind: CareerKind
  period: string
  company: string
  employment: string
  role: string
}

export interface Project {
  name: string
  period: string
  role: string
  company: string
  team: string
  stack: string
  overview: string
  highlights: string[]
}

export interface Qualification {
  date: string
  name: string
}

export interface Award {
  date: string
  name: string
}

export interface PrItem {
  title: string
  body: string
}

/** 自己 PR の各セクション。items（小見出し付き）か body（散文）のどちらかを持つ。 */
export interface PrSection {
  title: string
  items?: PrItem[]
  body?: string
}

export interface Resume {
  meta: Meta
  summary: string
  skills: Skills
  education: Education[]
  careers: Career[]
  projectsNote?: string
  projects: Project[]
  qualifications: Qualification[]
  awards: Award[]
  pr: PrSection[]
}

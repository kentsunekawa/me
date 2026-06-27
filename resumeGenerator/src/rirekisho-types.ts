// 日本書式の履歴書の構造化データ（content/private/rirekisho.yaml と一致させる契約）。

export interface RirekishoMeta {
  title: string
  date: string
}

export interface RirekishoBasic {
  furigana: string
  name: string
  birthYear: number
  birthMonth: number
  birthDay: number
  age: number
  gender: string
}

export interface RirekishoAddress {
  furigana: string
  zip: string
  address: string
  tel: string
  email: string
}

export interface HeadingRow {
  heading: string
}
export interface PageBreakRow {
  pageBreak: true
}
export interface EntryRow {
  year?: number
  month?: number
  text: string
  right?: string
}
export type HistoryRow = HeadingRow | PageBreakRow | EntryRow
export type HistoryContentRow = HeadingRow | EntryRow

export interface QualRow {
  year?: number
  month?: number
  text: string
}

export interface RirekishoData {
  meta: RirekishoMeta
  basic: RirekishoBasic
  address: RirekishoAddress
  contact: RirekishoAddress
  history: HistoryRow[]
  qualifications: QualRow[]
  motivation: string
  request: string
}

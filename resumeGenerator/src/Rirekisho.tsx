import { useState } from 'react'
import './rirekisho.css'
import type { HistoryContentRow, HistoryRow, QualRow, RirekishoData } from './rirekisho-types'

// content/private/photo.{jpg,png,…} があれば証明写真として表示（gitignore・ローカルのみ）。
// 無ければプレースホルダの枠のまま。eager glob なので欠けていてもエラーにならない。
const photoModules = import.meta.glob('../content/private/photo.*', { eager: true, import: 'default' })
const photoUrl = Object.values(photoModules)[0] as string | undefined

// pageBreak で学歴・職歴をページ（横）ごとに分割する。
function splitByPageBreak(rows: HistoryRow[]): HistoryContentRow[][] {
  const pages: HistoryContentRow[][] = [[]]
  for (const r of rows) {
    if ('pageBreak' in r) {
      pages.push([])
      continue
    }
    pages[pages.length - 1].push(r)
  }
  return pages
}

function fillers(count: number) {
  return Array.from({ length: Math.max(0, count) })
}

/** メールアドレスを @ の直前で改行して表示する。 */
function renderEmail(email: string) {
  const i = email.indexOf('@')
  if (i < 0) return email
  return (
    <>
      {email.slice(0, i)}
      <br />
      {email.slice(i)}
    </>
  )
}

/** "2026年6月28日現在" のような文字列から基準日を取り出す。取れなければ今日。 */
function parseRefDate(dateStr: string): Date {
  const m = dateStr.match(/(\d+)\s*年\s*(\d+)\s*月\s*(\d+)\s*日/)
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date()
}

/** 基準日（履歴書の日付）時点の満年齢。誕生日前ならマイナス1。 */
function calcAge(birthYear: number, birthMonth: number, birthDay: number, ref: Date): number {
  let age = ref.getFullYear() - birthYear
  const refMonth = ref.getMonth() + 1
  if (refMonth < birthMonth || (refMonth === birthMonth && ref.getDate() < birthDay)) {
    age--
  }
  return age
}

/** 学歴・職歴テーブル（年 / 月 / 内容）。minRows までは空行で埋めてフォームらしく見せる。 */
function HistoryTable({ rows, minRows }: { rows: HistoryContentRow[]; minRows: number }) {
  return (
    <table className="r-table r-history">
      <thead>
        <tr>
          <th className="r-c-year">年</th>
          <th className="r-c-month">月</th>
          <th>学歴・職歴</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) =>
          'heading' in r ? (
            <tr key={i}>
              <td className="r-c-year" />
              <td className="r-c-month" />
              <td className="r-heading">{r.heading}</td>
            </tr>
          ) : (
            <tr key={i}>
              <td className="r-c-year">{r.year ?? ''}</td>
              <td className="r-c-month">{r.month ?? ''}</td>
              <td>
                {r.text}
                {r.right && <span className="r-right">{r.right}</span>}
              </td>
            </tr>
          ),
        )}
        {fillers(minRows - rows.length).map((_, i) => (
          <tr key={`f${i}`} className="r-fill">
            <td className="r-c-year" />
            <td className="r-c-month" />
            <td />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function QualTable({ rows, minRows }: { rows: QualRow[]; minRows: number }) {
  return (
    <table className="r-table r-qual">
      <thead>
        <tr>
          <th className="r-c-year">年</th>
          <th className="r-c-month">月</th>
          <th>資格・免許</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td className="r-c-year">{r.year ?? ''}</td>
            <td className="r-c-month">{r.month ?? ''}</td>
            <td>{r.text}</td>
          </tr>
        ))}
        {fillers(minRows - rows.length).map((_, i) => (
          <tr key={`f${i}`} className="r-fill">
            <td className="r-c-year" />
            <td className="r-c-month" />
            <td />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function Rirekisho({ data }: { data: RirekishoData }) {
  const { meta, basic, address, contact, history, qualifications } = data
  const motivations = data.motivations ?? []

  // 「なし」を選ぶと志望動機欄を空にする。activeMotivation が無効（コメントアウト等）なら なし を既定に。
  const NONE = 'なし'
  const [target, setTarget] = useState(
    motivations.some((m) => m.target === data.activeMotivation) ? (data.activeMotivation as string) : NONE,
  )
  const motivation = motivations.find((m) => m.target === target)
  const motivationParagraphs = (motivation?.body ?? '').split('\n').filter((s) => s.trim() !== '')

  const age = calcAge(basic.birthYear, basic.birthMonth, basic.birthDay, parseRefDate(meta.date))

  const historyPages = splitByPageBreak(history)
  const page1History = historyPages[0] ?? []
  const page2History = historyPages[1] ?? []

  return (
    <>
      <div className="toolbar no-print">
        <label className="toolbar-field">
          志望先
          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value={NONE}>なし</option>
            {motivations.map((m) => (
              <option key={m.target} value={m.target}>
                {m.target}
              </option>
            ))}
          </select>
        </label>
        <button className="toolbar-btn" type="button" onClick={() => window.print()}>
          印刷
        </button>
      </div>

      {/* ── A3 横 1 枚＝A4 縦 2 ページの見開き ── */}
      <section className="sheet">
        <div className="r-spread">
          {/* 左ページ：個人情報 ＋ 学歴・職歴（前半）*/}
          <div className="r-page">
            <header className="r-head">
              <h1 className="r-title">履歴書</h1>
              <span className="r-date">{meta.date}</span>
            </header>

            <div className="r-section r-idblock">
              <div className="r-person">
                <table className="r-table r-basic">
                <tbody>
                  <tr>
                    <th className="r-label">ふりがな</th>
                    <td className="r-furigana" colSpan={3}>
                      {basic.furigana}
                    </td>
                  </tr>
                  <tr className="r-row-kanji">
                    <th className="r-label">氏名</th>
                    <td className="r-name" colSpan={3}>
                      {basic.name}
                    </td>
                  </tr>
                  <tr>
                    <th className="r-label"></th>
                    <td className="r-birth">
                      {basic.birthYear}年 {basic.birthMonth}月 {basic.birthDay}日生（満 {age} 歳）
                    </td>
                    <th className="r-label r-label-narrow">性別</th>
                    <td className="r-gender">{basic.gender}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table className="r-table r-address">
              <tbody>
                <tr>
                  <th className="r-label">ふりがな</th>
                  <td className="r-furigana">{address.furigana}</td>
                  <th className="r-label r-label-narrow">電話</th>
                  <td>{address.tel}</td>
                </tr>
                <tr className="r-row-kanji">
                  <th className="r-label">現住所</th>
                  <td>
                    〒{address.zip}
                    <br />
                    {address.address}
                  </td>
                  <th className="r-label r-label-narrow">E-mail</th>
                  <td>{renderEmail(address.email)}</td>
                </tr>
                <tr>
                  <th className="r-label">ふりがな</th>
                  <td className="r-furigana">{contact.furigana}</td>
                  <th className="r-label r-label-narrow">電話</th>
                  <td>{contact.tel}</td>
                </tr>
                <tr className="r-row-kanji">
                  <th className="r-label">連絡先</th>
                  <td className="r-contact-cell">
                    <span className="r-note">（現住所以外に連絡を希望する場合のみ記入）</span>
                    {contact.address && (
                      <>
                        〒{contact.zip}　{contact.address}
                      </>
                    )}
                  </td>
                  <th className="r-label r-label-narrow">E-mail</th>
                  <td>{renderEmail(contact.email)}</td>
                </tr>
              </tbody>
            </table>
              {/* 写真：個人情報ラッパー基準で absolute 配置（一旦 右上）*/}
              <div className="r-photo">
                {photoUrl ? <img className="r-photo-img" src={photoUrl} alt="" /> : <span>写真</span>}
              </div>
            </div>

            <HistoryTable rows={page1History} minRows={16} />
          </div>

          {/* 右ページ：学歴・職歴（後半）／資格・志望動機・本人希望 */}
          <div className="r-page">
            <div className="r-section">
              <HistoryTable rows={page2History} minRows={10} />
              <QualTable rows={qualifications} minRows={4} />
            </div>

            <div className="r-box r-box--motivation">
              <div className="r-box-label">志望の動機、特技、好きな学科、アピールポイントなど</div>
              <div className="r-box-body">
                {motivationParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="r-box r-box--request">
              <div className="r-box-label">
                本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）
              </div>
              <div className="r-box-body">{data.request}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

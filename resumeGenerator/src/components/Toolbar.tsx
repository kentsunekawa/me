// 画面用のツールバー。印刷時は .no-print で非表示にする（印刷結果には出ない）。
// ダウンロードは public/ に置いた生成済み PDF への静的リンク。
const pdfUrl = `${import.meta.env.BASE_URL}resume.pdf`

export function Toolbar() {
  return (
    <div className="toolbar no-print">
      <a className="toolbar-btn toolbar-btn--primary" href={pdfUrl} download="職務経歴書_常川健.pdf">
        PDF をダウンロード
      </a>
      <button className="toolbar-btn" type="button" onClick={() => window.print()}>
        印刷
      </button>
    </div>
  )
}

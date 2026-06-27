import './resume.css'

// 日本書式の履歴書テンプレート。
// 様式（項目・レイアウト）は別途指定の上で実装する。現状はローカル確認用の仮置き。
// テンプレは content/rirekisho.example.yaml（コミット）、個人情報の実データは
// content/private/rirekisho.yaml（gitignore・ローカルのみ）に持たせる予定。
export function Rirekisho() {
  return (
    <div className="rirekisho">
      <section className="sheet">
        <h1 className="doc-title">履歴書</h1>
        <p style={{ marginTop: '10mm', color: '#767676' }}>
          様式は別途指定の上で実装予定。このページはローカル確認専用で、ビルド・デプロイには含めない。
        </p>
      </section>
    </div>
  )
}

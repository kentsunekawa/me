# resumeGenerator

職務経歴書（A4・縦・印刷用）を React + Vite で組み、ブラウザの印刷機能から PDF を出力する。

## 構成

```
resumeGenerator/
├─ content/resume.yaml   … 職務経歴書の中身（構造化データ＝正本）。ここを編集する
├─ src/
│  ├─ types.ts           … resume.yaml の型（テンプレートとの契約）
│  ├─ Resume.tsx         … ページ構成（どのセクションを何ページ目に置くか）
│  ├─ components/        … Page / Section / ProjectCard
│  └─ resume.css         … A4 print CSS（ページ送り・組版）
├─ index.html / vite.config.ts / tsconfig*.json / package.json
└─ dist/                 … ビルド成果物（.gitignore 済み）
```

データ（`content/resume.yaml`）と組版（`src/`）は分離している。中身を直すときは
基本 `resume.yaml` だけを編集する。キー名・ネスト構造は `src/types.ts` と一致させる。

## 使い方（PDF 出力）

```sh
npm install
npm run dev
```

表示された `http://localhost:5173` をブラウザ（Chrome 推奨）で開き、`⌘P`（印刷）→
送信先を「PDF に保存」、用紙 A4・余白「なし」・「背景のグラフィック」ON で保存する。

## ページ割り（A4 × 3 ページ）

- 1 ページ目：職務要約 / スキル / 学歴 / 職歴
- 2 ページ目：プロジェクト
- 3 ページ目：資格 / 受賞歴 / 自己 PR

プロジェクトは `src/Resume.tsx` の `PROJECTS_PER_PAGE`（1 ページの件数）で割る。
件数や文量を増やして収まらなくなったら、この値を下げてプロジェクトを複数ページに分ける。
実際の収まりは画面の A4 プレビューで確認しながら、`resume.yaml` の文量で調整する。

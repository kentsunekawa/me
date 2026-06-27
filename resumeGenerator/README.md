# resumeGenerator

職務経歴書（A4・縦・印刷用）を React + Vite で組み、ブラウザの印刷機能から PDF を出力する。

## 構成

```
resumeGenerator/
├─ content/resume.yaml   … 職務経歴書の中身（構造化データ＝正本）。ここを編集する
├─ public/resume.pdf     … 配布用の生成済み PDF（ローカル印刷で更新してコミット）
├─ src/
│  ├─ types.ts           … resume.yaml の型（テンプレートとの契約）
│  ├─ Resume.tsx         … ページ構成（どのセクションを何ページ目に置くか）
│  ├─ components/        … Page / Section / ProjectCard / Toolbar
│  └─ resume.css         … A4 print CSS（ページ送り・組版）＋ 画面 UI
├─ index.html / vite.config.ts / tsconfig*.json / package.json
└─ dist/                 … ビルド成果物（.gitignore 済み）
```

データ（`content/resume.yaml`）と組版（`src/`）は分離している。中身を直すときは
基本 `resume.yaml` だけを編集する。キー名・ネスト構造は `src/types.ts` と一致させる。

## 使い方（プレビュー / 印刷）

```sh
npm install
npm run dev
```

表示された URL（例 `http://localhost:5173`）を Chrome で開く。画面右上に
「PDF をダウンロード」「印刷」ボタンが出る（このツールバーは印刷時は非表示）。

- **印刷**ボタン or `⌘P` → 送信先「PDF に保存」、用紙 A4・余白「なし」・「背景のグラフィック」ON。
- **ダウンロード**ボタンは `public/resume.pdf`（配布用の生成済み PDF）を返す。

## 配布用 PDF の更新

PDF は CI で生成せず、ローカルで印刷したものを `public/resume.pdf` に置いてコミットする
（CI に Puppeteer を持ち込まないための運用）。中身（`resume.yaml`）や見た目を変えたら：

1. `npm run dev` で開き、`⌘P` → A4・余白なしで PDF 保存
2. それを `public/resume.pdf` として上書き保存
3. コミット → 次のデプロイで配布 PDF も更新される

## デプロイ（GitHub Pages）

プロフィールサイト（VitePress, `https://kentsunekawa.github.io/me/`）の Pages デプロイに
相乗りし、**`https://kentsunekawa.github.io/me/resume/`** で配信する。

- `.github/workflows/deploy.yml`（`main` への push でトリガー）が VitePress と resume を
  両方ビルドし、resume の `dist` を VitePress 出力の `resume/` 配下に置いて Pages へ上げる。
- そのため本番ビルドのみ Vite の `base` を `/me/resume/` にしている（`vite.config.ts`）。
- Pages（Source: GitHub Actions）は `/me/` のプロフィールサイトで既に有効。`main` に
  マージすれば次のデプロイで `/me/resume/` も反映される。

## ページ割り（A4 × 3 ページ）

- 1 ページ目：職務要約 / スキル / 学歴 / 職歴
- 2 ページ目：プロジェクト
- 3 ページ目：資格 / 受賞歴 / 自己 PR

プロジェクトは `src/Resume.tsx` の `PROJECTS_PER_PAGE`（1 ページの件数）で割る。
件数や文量を増やして収まらなくなったら、この値を下げてプロジェクトを複数ページに分ける。
実際の収まりは画面の A4 プレビューで確認しながら、`resume.yaml` の文量で調整する。

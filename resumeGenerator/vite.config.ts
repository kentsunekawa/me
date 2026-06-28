import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from '@rollup/plugin-yaml'

// content/resume.yaml を import で構造化データとして読み込めるよう yaml プラグインを使う。
// 印刷は dev サーバー（npm run dev）の localhost を開いて ⌘P → PDF 保存で行う。
//
// 本番は VitePress サイト（GitHub Pages: /me/）に相乗りし /me/resume/ で配信するため、
// build 時のみ base を /me/resume/ にする。dev はルート（/）。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/me/resume/' : '/',
  plugins: [react(), yaml()],
  // content/private は data/resources（private リポ me-resources）への symlink。
  // root 外のその実体を dev で読めるよう、symlink を保持しつつ data/ 配下へのアクセスを許可する。
  resolve: { preserveSymlinks: true },
  server: { fs: { allow: ['../..'] } },
  build: {
    rollupOptions: {
      // 履歴書(rirekisho.html)は個人情報を含むため本番ビルドに含めない（＝公開しない）。
      // dev サーバーは入口設定に関係なく rirekisho.html を配信するのでローカル確認はできる。
      input: { index: 'index.html' },
    },
  },
}))

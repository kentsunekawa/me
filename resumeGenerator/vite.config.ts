import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from '@rollup/plugin-yaml'

// content/resume.yaml を import で構造化データとして読み込めるよう yaml プラグインを使う。
// 印刷は dev サーバー（npm run dev）の localhost を開いて ⌘P → PDF 保存で行う。
export default defineConfig({
  base: './',
  plugins: [react(), yaml()],
})

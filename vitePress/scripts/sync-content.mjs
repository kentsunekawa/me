// ルートの *.md を vitePress/src/ にシンボリックリンクとして同期する。
// dev / build の前に自動実行され、ルートに .md を足すだけでページ化される。
// （index.md は src/ 直下の実ファイルなので対象外。README.md も除外）
import { readdirSync, symlinkSync, rmSync, lstatSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..', '..') // me/
const srcDir = join(here, '..', 'src') // vitePress/src/

const EXCLUDE = new Set(['README.md'])

// 既存のシンボリックリンクを一旦掃除（実ファイル＝index.md などは触らない）
for (const name of readdirSync(srcDir)) {
  const p = join(srcDir, name)
  if (lstatSync(p).isSymbolicLink()) rmSync(p)
}

// ルートの *.md をすべてリンク
let count = 0
for (const name of readdirSync(repoRoot)) {
  if (!name.endsWith('.md') || EXCLUDE.has(name)) continue
  symlinkSync(join('..', '..', name), join(srcDir, name))
  count++
}

console.log(`content synced: ${count} file(s)`)

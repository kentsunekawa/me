import { defineConfig } from 'vitepress'

// VitePress のプロジェクトルートは vitePress/（標準構成）。
// コンテンツの .md はリポジトリのルートに据え置き、src/ にシンボリックリンクで集約している。
// index.md だけは src/ 直下の実ファイル。
export default defineConfig({
  lang: 'ja-JP',
  title: '常川 健 / Ken Tsunekawa',
  description: 'Web Developer / Front-End Developer のプロフィール',

  // GitHub Pages（プロジェクトページ）: https://kentsunekawa.github.io/me/
  base: '/me/',

  // コンテンツ元 = vitePress/src（中身はルート .md へのシンボリックリンク＋index.md）
  srcDir: 'src',

  vite: {
    // シンボリックリンクを実体パスに解決せず、依存解決を vitePress/ 内に留める
    resolve: { preserveSymlinks: true },
    // シンボリックリンクの実体（リポジトリのルート）への配信を許可
    server: { fs: { allow: ['..'] } },
  },

  themeConfig: {
    nav: [
      { text: 'プロフィール', link: '/SUMMARY' },
      { text: '自己紹介', link: '/ABOUT' },
      { text: 'プロジェクト', link: '/PROJECTS' },
      { text: 'Q&A', link: '/QA' },
    ],

    sidebar: [
      {
        text: 'プロフィール',
        items: [
          { text: 'サマリー', link: '/SUMMARY' },
          { text: 'スキル', link: '/SKILLS' },
          { text: '職歴・経歴', link: '/HISTORY' },
        ],
      },
      {
        text: '詳細',
        items: [
          { text: '自己紹介・人となり', link: '/ABOUT' },
          { text: 'プロジェクト', link: '/PROJECTS' },
          { text: 'Q&A', link: '/QA' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kentsunekawa' },
    ],

    footer: {
      message: 'Built with VitePress',
      copyright: '© 2026 Ken Tsunekawa',
    },

    outline: { label: '目次', level: [2, 3] },
    docFooter: { prev: '前へ', next: '次へ' },
  },
})

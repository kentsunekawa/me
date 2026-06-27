import React from 'react'
import { createRoot } from 'react-dom/client'
import { Rirekisho } from './Rirekisho'

// 履歴書エントリ（ローカル確認用）。
// 本番ビルドからは vite.config.ts の rollupOptions.input で除外している。
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Rirekisho />
  </React.StrictMode>,
)

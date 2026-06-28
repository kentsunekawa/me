import React from 'react'
import { createRoot } from 'react-dom/client'
import rirekishoData from '../content/private/rirekisho.yaml'
import type { RirekishoData } from './rirekisho-types'
import { Rirekisho } from './Rirekisho'

// 履歴書エントリ（ローカル確認用）。本番ビルドからは vite.config.ts で除外している。
// 実データは content/private/rirekisho.yaml（gitignore）。無ければ
// rirekisho.example.yaml をコピーして作る。
const data = rirekishoData as RirekishoData

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Rirekisho data={data} />
  </React.StrictMode>,
)

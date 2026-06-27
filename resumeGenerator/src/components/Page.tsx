import type { ReactNode } from 'react'

/** A4 1 枚分のシート。画面ではカードとして見え、印刷では 1 ページになる。 */
export function Page({
  page,
  total,
  children,
}: {
  page: number
  total: number
  children: ReactNode
}) {
  return (
    <section className="sheet">
      {children}
      <footer className="sheet-footer">
        {page} / {total}
      </footer>
    </section>
  )
}

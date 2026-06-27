import type { ReactNode } from 'react'

/** 見出し付きのセクションブロック。 */
export function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="block">
      <h2 className="block-title">{title}</h2>
      <div className="block-content">{children}</div>
    </section>
  )
}

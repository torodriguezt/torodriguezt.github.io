"use client"

import { useEffect, useState } from "react"
import type { Heading } from "@/lib/blog"

/** Sticky table of contents that tracks the heading nearest the top. */
export default function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // Top strip of the viewport, so a heading counts as "current" once it
      // reaches roughly where the eye is.
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav className="sticky top-28 hidden max-h-[70vh] overflow-y-auto lg:block" aria-label="On this page">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
        On this page
      </p>
      <ul className="m-0 list-none space-y-2 p-0">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className={`block border-l pl-3 text-[12.5px] leading-[1.45] transition-colors ${
                active === h.id
                  ? "border-brand text-brand"
                  : "border-rule text-dim hover:text-ink2"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

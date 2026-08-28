"use client"

import type { ReactNode } from "react"

/**
 * A figure, not a dashboard card: no fill, no rounding, no header bar. Hairline
 * rules top and bottom set it off from the prose, and the numbered caption
 * underneath carries the explanation — the same job a caption does in print.
 */
export function FigureFrame({
  n,
  caption,
  controls,
  children,
}: {
  n: number
  caption: ReactNode
  controls?: ReactNode
  children: ReactNode
}) {
  return (
    <figure className="m-0 border-y border-rule py-7">
      {controls && (
        <div className="mb-6 flex flex-wrap items-center gap-x-7 gap-y-3">{controls}</div>
      )}
      {children}
      <figcaption className="mt-5 max-w-[74ch] text-[12.5px] leading-[1.65] text-dim">
        <span className="font-medium text-ink2">Fig. {n}</span> · {caption}
      </figcaption>
    </figure>
  )
}

/**
 * Quiet label for a control group. Sentence case in the page's sans: small
 * uppercase mono with letterspacing is the site's voice for section markers,
 * and inside a figure it reads mechanical rather than legible.
 */
export function ControlLabel({ children }: { children: ReactNode }) {
  return <span className="text-[12px] text-dim">{children}</span>
}

/**
 * Text options rather than pills — the selected one is marked by the accent and
 * a rule under it, so the control reads as annotation instead of chrome.
 */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  format = (v: T) => String(v),
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  format?: (v: T) => string
}) {
  return (
    <span className="flex items-center gap-3.5">
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={String(option)}
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={`border-b pb-0.5 text-[12.5px] tabular-nums transition-colors ${
              active
                ? "border-brand text-brand"
                : "border-transparent text-dim hover:text-ink2"
            }`}
          >
            {format(option)}
          </button>
        )
      })}
    </span>
  )
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  width = "w-40",
}: {
  min: number
  max: number
  step?: number
  value: number
  onChange: (v: number) => void
  label: string
  width?: string
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={label}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`h-px ${width} cursor-pointer appearance-none rounded-full bg-rule accent-brand`}
    />
  )
}

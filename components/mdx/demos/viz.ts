/**
 * Shared visual language for the post's figures.
 *
 * The rule the figures follow: **ink encodes data, the brand colour encodes
 * interaction.** Nothing in a plot is coloured to say what it is — series are
 * told apart by shape (solid line, wash, open circle) the way a printed figure
 * does it. The one accent is reserved for what the reader is pointing at:
 * crosshair, active marker, selected control. That keeps the accent meaningful
 * instead of decorative, and keeps the figures readable in grayscale.
 *
 * The sequential ramps are near-achromatic — a trace of the brand hue so they
 * do not read as dead gray on a warm page, but magnitude is carried by
 * lightness alone. Generated in OKLCH and checked with the palette validator:
 * lightness monotone, every adjacent ΔL ≥ 0.076.
 */

export const RAMP_LIGHT = [
  "#F9F6F5",
  "#E3DCDA",
  "#CAC0BD",
  "#AEA3A0",
  "#8F8582",
  "#6C6461",
  "#44403E",
]

export const RAMP_DARK = [
  "#12100F",
  "#2A2523",
  "#473F3C",
  "#655B58",
  "#857B77",
  "#A89F9D",
  "#D5CFCE",
]

/** Colour for a value already normalised to [0, 1]. */
export function rampColor(t: number, ramp: string[]): string {
  const pos = Math.min(1, Math.max(0, t)) * (ramp.length - 1)
  const i = Math.min(ramp.length - 2, Math.floor(pos))
  const f = pos - i
  const [a, b] = [ramp[i], ramp[i + 1]]
  const channel = (offset: number) =>
    Math.round(
      parseInt(a.slice(offset, offset + 2), 16) * (1 - f) +
        parseInt(b.slice(offset, offset + 2), 16) * f
    )
  return `rgb(${channel(1)}, ${channel(3)}, ${channel(5)})`
}

/**
 * Mark specs. Figures sit directly on the page, so the ring that keeps
 * overlapping marks legible is the page colour, not a panel colour.
 */
export const MARK = {
  /** Primary series. */
  line: 1.75,
  /** Reference lines, axes, contours. */
  hair: 1,
  dot: 4,
  ring: 2,
  ringColor: "var(--bg)",
  bandOpacity: 0.13,
  /** Reserved for interaction, never for data. */
  accent: "var(--brand)",
} as const

/** Outward tick marks, the length a printed axis uses. */
export const TICK = 4

/** Round a domain out to friendly tick values. */
export function niceTicks(min: number, max: number, count = 4): number[] {
  const raw = (max - min) / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? mag * 10
  const start = Math.ceil(min / step) * step
  const out: number[] = []
  for (let v = start; v <= max + 1e-9; v += step) out.push(Number(v.toFixed(6)))
  return out
}

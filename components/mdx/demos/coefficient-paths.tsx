"use client"

import { useState } from "react"
import Axes from "./axes"
import { ALD_GRID, DESIGN_COLUMNS, LABELS, TAUS } from "./bqr-data"
import { FigureFrame } from "./figure-frame"
import { MARK } from "./viz"

const PW = 200
const PH = 205
const PAD = { top: 26, right: 14, bottom: 34, left: 50 }

/** `n` is the figure number, which belongs to the document, not the component. */
export default function CoefficientPaths({ n = 2 }: { n?: number }) {
  const [hover, setHover] = useState<{ variable: string; tau: number } | null>(null)

  return (
    <FigureFrame
      n={n}
      caption={
        <>
          Each coefficient across seven quantile levels, with its 95% credible band. The
          quadratic term decreases in magnitude from −0.457 at τ = 0.05 to −0.091 at τ = 0.95,
          and its band includes zero at the highest level. The sex effect is flat across
          levels. Hover a point for its posterior mean.
        </>
      }
    >
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
        {DESIGN_COLUMNS.map((variable) => {
          const series = ALD_GRID.map((fit) => {
            const i = fit.variable.indexOf(variable)
            return { tau: fit.tau, mean: fit.mean[i], lower: fit.lower[i], upper: fit.upper[i] }
          })

          const lo = Math.min(...series.map((s) => s.lower))
          const hi = Math.max(...series.map((s) => s.upper))
          const pad = (hi - lo) * 0.12 || 0.1
          const [y0, y1] = [lo - pad, hi + pad]

          const fx = (tau: number) =>
            PAD.left + ((tau - TAUS[0]) / (TAUS[TAUS.length - 1] - TAUS[0])) * (PW - PAD.left - PAD.right)
          const fy = (v: number) =>
            PH - PAD.bottom - ((v - y0) / (y1 - y0)) * (PH - PAD.top - PAD.bottom)

          const line = series
            .map((s, i) => `${i === 0 ? "M" : "L"}${fx(s.tau).toFixed(1)} ${fy(s.mean).toFixed(1)}`)
            .join(" ")
          const band = [
            ...series.map((s, i) => `${i === 0 ? "M" : "L"}${fx(s.tau).toFixed(1)} ${fy(s.upper).toFixed(1)}`),
            ...series.map((s) => `L${fx(s.tau).toFixed(1)} ${fy(s.lower).toFixed(1)}`).reverse(),
            "Z",
          ].join(" ")

          const crossesZero = y0 < 0 && y1 > 0
          const active = hover?.variable === variable ? hover.tau : null
          const activePoint = series.find((s) => s.tau === active)

          return (
            <svg
              key={variable}
              viewBox={`0 0 ${PW} ${PH}`}
              className="block w-full min-w-0 overflow-visible"
              role="img"
              aria-label={`${LABELS[variable] ?? variable} across quantile levels`}
            >
              <text x={PAD.left - 38} y={12} fontSize={11.5} fontWeight={600} fill="var(--fg)">
                {LABELS[variable] ?? variable}
              </text>

              <Axes
                left={PAD.left}
                right={PW - PAD.right}
                top={PAD.top}
                bottom={PH - PAD.bottom}
                xTicks={[0.05, 0.5, 0.95]}
                yTicks={niceThree(y0, y1)}
                fx={fx}
                fy={fy}
                xTitle="τ"
                format={(v) => (Math.abs(v) < 1 ? v.toFixed(2) : v.toFixed(1))}
                viewHeight={PH}
              />

              {/* Zero matters here: where the band crosses it, the coefficient
                  is no longer distinguishable from no effect. */}
              {crossesZero && (
                <line
                  x1={PAD.left}
                  y1={fy(0)}
                  x2={PW - PAD.right}
                  y2={fy(0)}
                  stroke="var(--fg)"
                  strokeOpacity={0.28}
                  strokeWidth={MARK.hair}
                />
              )}

              <path d={band} fill="var(--fg)" fillOpacity={MARK.bandOpacity} />
              <path
                d={line}
                fill="none"
                stroke="var(--fg)"
                strokeWidth={MARK.line}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {series.map((s) => (
                <circle
                  key={s.tau}
                  cx={fx(s.tau)}
                  cy={fy(s.mean)}
                  r={active === s.tau ? MARK.dot : 2.6}
                  fill={active === s.tau ? MARK.accent : "var(--bg)"}
                  stroke={active === s.tau ? MARK.accent : "var(--fg)"}
                  strokeWidth={active === s.tau ? MARK.ring : 1.2}
                  onMouseEnter={() => setHover({ variable, tau: s.tau })}
                  onMouseLeave={() => setHover(null)}
                />
              ))}

              {activePoint && (
                <text
                  x={fx(activePoint.tau)}
                  y={fy(activePoint.upper) - 8}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--fg)"
                  stroke="var(--bg)"
                  strokeWidth={3}
                  paintOrder="stroke"
                  className="tabular-nums"
                >
                  {activePoint.mean.toFixed(3)}
                </text>
              )}
            </svg>
          )
        })}
      </div>
    </FigureFrame>
  )
}

/** A few round ticks spanning the panel's own domain. */
function niceThree(lo: number, hi: number): number[] {
  const step = (hi - lo) / 2
  const mag = 10 ** Math.floor(Math.log10(step))
  const nice = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step) ?? mag * 10
  const start = Math.ceil(lo / nice) * nice
  const out: number[] = []
  for (let v = start; v <= hi + 1e-9; v += nice) out.push(Number(v.toFixed(6)))
  return out
}

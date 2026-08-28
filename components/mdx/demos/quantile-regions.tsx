"use client"

import { useMemo, useState } from "react"
import Axes from "./axes"
import { CHILDREN, MO_TAUS, N_DIR, quantileRegion } from "./bqr-data"
import { ControlLabel, FigureFrame, Segmented, Slider } from "./figure-frame"
import { MARK } from "./viz"

const VW = 660
const VH = 420
const PAD = { top: 22, right: 22, bottom: 40, left: 54 }

// Fixed domains: the point of the control is to watch the regions travel, and
// a rescaling axis would cancel exactly that.
const X = [4, 20]
const Y = [55, 118]

const AGE_FROM = 0.3
const AGE_TO = 4.9

/** `n` is the figure number, which belongs to the document, not the component. */
export default function QuantileRegions({ n = 3 }: { n?: number }) {
  const [age, setAge] = useState(2)
  const [girls, setGirls] = useState(false)

  const fx = (w: number) => PAD.left + ((w - X[0]) / (X[1] - X[0])) * (VW - PAD.left - PAD.right)
  const fy = (h: number) =>
    VH - PAD.bottom - ((h - Y[0]) / (Y[1] - Y[0])) * (VH - PAD.top - PAD.bottom)

  const regions = useMemo(
    () =>
      MO_TAUS.map((tau) => {
        const vertices = quantileRegion(tau, age, girls)
        // An intersection of half-planes can in principle come out empty; a
        // profile far outside the data could produce one.
        if (vertices.length < 3) return { tau, d: "", label: null }
        const top = vertices.reduce((best, v) => (v[1] > best[1] ? v : best), vertices[0])
        return {
          tau,
          d: vertices.map((v, i) => `${i === 0 ? "M" : "L"}${fx(v[0])} ${fy(v[1])}`).join(" ") + " Z",
          label: { x: fx(top[0]), y: fy(top[1]) },
        }
      }),
    [age, girls]
  )

  return (
    <FigureFrame
      n={n}
      caption={
        <>
          Directional quantile regions for weight and height, from <code>mo.bqr.svy()</code>.
          Each of the {N_DIR} fitted directions contributes one half-plane, and the region is
          their intersection: convex by construction, polygonal because the direction set is
          finite. Regions are read from the outside in, with magnitude 0.05 outermost. Points
          are the {CHILDREN.length} observed children, with those near the selected profile
          emphasised. Each region is conditional on a covariate profile, so changing age or
          sex moves the whole family.
        </>
      }
      controls={
        <>
          <span className="flex items-center gap-3">
            <ControlLabel>Age</ControlLabel>
            <Slider
              min={AGE_FROM}
              max={AGE_TO}
              step={0.1}
              value={age}
              onChange={setAge}
              label="Age in years"
            />
            <span className="text-[12px] tabular-nums text-ink">{age.toFixed(1)} yr</span>
          </span>
          <span className="flex items-center gap-3.5">
            <ControlLabel>Sex</ControlLabel>
            <Segmented
              options={["Boys", "Girls"]}
              value={girls ? "Girls" : "Boys"}
              onChange={(v) => setGirls(v === "Girls")}
            />
          </span>
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="block w-full"
        role="img"
        aria-label={`Nested directional quantile regions for weight and height at age ${age.toFixed(1)}`}
      >
        <Axes
          left={PAD.left}
          right={VW - PAD.right}
          top={PAD.top}
          bottom={VH - PAD.bottom}
          xTicks={[5, 10, 15, 20]}
          yTicks={[60, 75, 90, 105]}
          fx={fx}
          fy={fy}
          xTitle="Weight (kg)"
          yTitle="Height (cm)"
          viewHeight={VH}
        />

        {/* The observed children; those near the selected profile come forward. */}
        <g>
          {CHILDREN.map((c, i) => (
            <circle
              key={i}
              cx={fx(c.wgt)}
              cy={fy(c.hgt)}
              r={1.7}
              fill="var(--fg)"
              fillOpacity={Math.abs(c.age - age) < 0.4 && c.girls === girls ? 0.5 : 0.13}
            />
          ))}
        </g>

        {regions.map((r, i) => (
          <path
            key={r.tau}
            d={r.d}
            fill="var(--fg)"
            fillOpacity={0.05}
            stroke="var(--fg)"
            strokeOpacity={0.3 + i * 0.2}
            strokeWidth={MARK.hair}
            strokeLinejoin="round"
          />
        ))}

        {regions.map((r) =>
          r.label ? (
          <text
            key={r.tau}
            x={r.label.x}
            y={r.label.y - 6}
            textAnchor="middle"
            fontSize={11}
            fill="var(--fg2)"
            stroke="var(--bg)"
            strokeWidth={3}
            paintOrder="stroke"
            className="tabular-nums"
          >
            {r.tau.toFixed(2)}
          </text>
          ) : null
        )}

      </svg>
    </FigureFrame>
  )
}

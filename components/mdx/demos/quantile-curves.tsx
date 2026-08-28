"use client"

import { useMemo, useRef, useState } from "react"
import Axes from "./axes"
import { AGE_MAX, CHILDREN, weightQuantile } from "./bqr-data"
import { ControlLabel, FigureFrame, Segmented } from "./figure-frame"
import { MARK } from "./viz"

const VW = 720
const VH = 320
const PAD = { top: 20, right: 22, bottom: 36, left: 52 }
const N = 120
const SHOWN = [0.1, 0.5, 0.9]
const AGE_FROM = 0.3

const Y_MIN = 4
const Y_MAX = 21

/** `n` is the figure number, which belongs to the document, not the component. */
export default function QuantileCurves({ n = 1 }: { n?: number }) {
  const [girls, setGirls] = useState(false)
  const [probe, setProbe] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const fx = (age: number) =>
    PAD.left + ((age - AGE_FROM) / (AGE_MAX - AGE_FROM)) * (VW - PAD.left - PAD.right)
  const fy = (w: number) =>
    VH - PAD.bottom - ((w - Y_MIN) / (Y_MAX - Y_MIN)) * (VH - PAD.top - PAD.bottom)

  const { curves, spreadPath } = useMemo(() => {
    const ages = Array.from(
      { length: N },
      (_, i) => AGE_FROM + (i / (N - 1)) * (AGE_MAX - AGE_FROM)
    )
    const curves = SHOWN.map((tau) => ({
      tau,
      d: ages
        .map(
          (a, i) =>
            `${i === 0 ? "M" : "L"}${fx(a).toFixed(1)} ${fy(weightQuantile(tau, a, girls)).toFixed(1)}`
        )
        .join(" "),
    }))

    // The band between the 10th and 90th conditional quantiles: the spread the
    // model estimates directly, which a mean regression never produces.
    const spreadPath = [
      ...ages.map(
        (a, i) =>
          `${i === 0 ? "M" : "L"}${fx(a).toFixed(1)} ${fy(weightQuantile(0.9, a, girls)).toFixed(1)}`
      ),
      ...ages
        .map((a) => `L${fx(a).toFixed(1)} ${fy(weightQuantile(0.1, a, girls)).toFixed(1)}`)
        .reverse(),
      "Z",
    ].join(" ")

    return { curves, spreadPath }
  }, [girls])

  function onMove(event: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = ((event.clientX - rect.left) / rect.width) * VW
    const age =
      AGE_FROM + ((px - PAD.left) / (VW - PAD.left - PAD.right)) * (AGE_MAX - AGE_FROM)
    setProbe(age >= AGE_FROM && age <= AGE_MAX ? age : null)
  }

  const readout =
    probe === null
      ? null
      : {
          age: probe,
          values: SHOWN.map((tau) => ({ tau, w: weightQuantile(tau, probe, girls) })),
        }

  return (
    <FigureFrame
      n={n}
      caption={
        <>
          Conditional quantiles of weight against age at τ = 0.1, 0.5 and 0.9, over the{" "}
          {CHILDREN.length} children in <code>Anthro</code>. Posterior means from{" "}
          <code>bqr.svy()</code>. Points are the observed data for the selected sex; the shaded
          band is the interval between the 10th and 90th conditional percentiles.
        </>
      }
      controls={
        <>
          <span className="flex items-center gap-3.5">
            <ControlLabel>Sex</ControlLabel>
            <Segmented
              options={["Boys", "Girls"]}
              value={girls ? "Girls" : "Boys"}
              onChange={(v) => setGirls(v === "Girls")}
            />
          </span>
          {readout && (
            <span className="ml-auto tabular-nums text-[12px] text-ink2">
              {readout.age.toFixed(1)} yr ·{" "}
              {readout.values.map((v, i) => (
                <span key={v.tau}>
                  {i > 0 && " · "}
                  <span className="text-dim">τ={v.tau}</span> {v.w.toFixed(1)} kg
                </span>
              ))}
            </span>
          )}
        </>
      }
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        className="block w-full"
        onMouseMove={onMove}
        onMouseLeave={() => setProbe(null)}
        role="img"
        aria-label="Fitted conditional quantile curves of weight against age"
      >
        <Axes
          left={PAD.left}
          right={VW - PAD.right}
          top={PAD.top}
          bottom={VH - PAD.bottom}
          xTicks={[1, 2, 3, 4, 5]}
          yTicks={[5, 10, 15, 20]}
          fx={fx}
          fy={fy}
          xTitle="Age (years)"
          yTitle="Weight (kg)"
          viewHeight={VH}
        />

        {/* The children the model was fitted to. The vignette's own figure
            passes add_points = FALSE; on screen a faint cloud costs nothing and
            shows how much of the spread the outer quantiles are tracking. */}
        <g pointerEvents="none">
          {CHILDREN.filter((c) => c.girls === girls && c.age >= AGE_FROM).map((c, i) => (
            <circle key={i} cx={fx(c.age)} cy={fy(c.wgt)} r={1.7} fill="var(--fg)" fillOpacity={0.22} />
          ))}
        </g>

        <path d={spreadPath} fill="var(--fg)" fillOpacity={MARK.bandOpacity} />

        {curves.map((c) => (
          <path
            key={c.tau}
            d={c.d}
            fill="none"
            stroke="var(--fg)"
            strokeWidth={c.tau === 0.5 ? MARK.line : MARK.hair}
            strokeOpacity={c.tau === 0.5 ? 1 : 0.75}
            strokeLinecap="round"
          />
        ))}

        {/* Each curve labelled where it ends, so no legend is needed. */}
        {curves.map((c) => (
          <text
            key={c.tau}
            x={fx(AGE_MAX) + 5}
            y={fy(weightQuantile(c.tau, AGE_MAX, girls)) + 3.5}
            fontSize={11}
            fill="var(--fg2)"
            className="tabular-nums"
          >
            {c.tau}
          </text>
        ))}

        {probe !== null && (
          <g pointerEvents="none">
            <line
              x1={fx(probe)}
              y1={PAD.top}
              x2={fx(probe)}
              y2={VH - PAD.bottom}
              stroke={MARK.accent}
              strokeWidth={MARK.hair}
            />
            {SHOWN.map((tau) => (
              <circle
                key={tau}
                cx={fx(probe)}
                cy={fy(weightQuantile(tau, probe, girls))}
                r={3.5}
                fill={MARK.accent}
                stroke={MARK.ringColor}
                strokeWidth={MARK.ring}
              />
            ))}
          </g>
        )}
      </svg>
    </FigureFrame>
  )
}

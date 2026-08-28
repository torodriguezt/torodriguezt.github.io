"use client"

import { TICK } from "./viz"

interface AxesProps {
  /** Plot rectangle in viewBox units. */
  left: number
  right: number
  top: number
  bottom: number
  xTicks: number[]
  yTicks: number[]
  fx: (v: number) => number
  fy: (v: number) => number
  xTitle?: string
  yTitle?: string
  format?: (v: number) => string
  /** Height of the whole viewBox, so the x title clears its bottom edge. */
  viewHeight: number
}

/**
 * Left and bottom spines with outward ticks — no box, no gridlines. The ticks
 * carry the values so the plot keeps its ink for the data.
 */
export default function Axes({
  left,
  right,
  top,
  bottom,
  xTicks,
  yTicks,
  fx,
  fy,
  xTitle,
  yTitle,
  format = String,
  viewHeight,
}: AxesProps) {
  return (
    <g>
      <line x1={left} y1={top} x2={left} y2={bottom} stroke="var(--line)" />
      <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="var(--line)" />

      {yTicks.map((t) => (
        <g key={t}>
          <line x1={left - TICK} y1={fy(t)} x2={left} y2={fy(t)} stroke="var(--line)" />
          <text
            x={left - TICK - 4}
            y={fy(t) + 3.5}
            textAnchor="end"
            fontSize={11}
            fill="var(--dim)"
            className="tabular-nums"
          >
            {format(t)}
          </text>
        </g>
      ))}

      {xTicks.map((t) => (
        <g key={t}>
          <line x1={fx(t)} y1={bottom} x2={fx(t)} y2={bottom + TICK} stroke="var(--line)" />
          <text
            x={fx(t)}
            y={bottom + TICK + 12}
            textAnchor="middle"
            fontSize={11}
            fill="var(--dim)"
            className="tabular-nums"
          >
            {format(t)}
          </text>
        </g>
      ))}

      {xTitle && (
        // Clear of the viewBox edge: an SVG root clips its descenders.
        <text
          x={(left + right) / 2}
          y={viewHeight - 4}
          textAnchor="middle"
          fontSize={11.5}
          fill="var(--fg2)"
        >
          {xTitle}
        </text>
      )}
      {yTitle && (
        <text
          transform={`translate(11, ${(top + bottom) / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize={11.5}
          fill="var(--fg2)"
        >
          {yTitle}
        </text>
      )}
    </g>
  )
}

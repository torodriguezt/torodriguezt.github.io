"use client"

import { useEffect, useRef } from "react"
import { startBanner, type BannerHandle } from "@/lib/gp-banner"
import { useTheme } from "@/contexts/theme-context"

interface GpBannerProps {
  curveCount?: number
  className?: string
}

/**
 * Sits behind the content of a `relative overflow-hidden` parent: the posterior
 * draws fill the block while the copy stays on top.
 */
export default function GpBanner({ curveCount = 12, className = "" }: GpBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<BannerHandle | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!canvasRef.current) return
    handleRef.current = startBanner(canvasRef.current, { curveCount })
    return () => {
      handleRef.current?.stop()
      handleRef.current = null
    }
  }, [curveCount])

  // The mean curve and the observations are drawn from CSS variables, so a
  // theme flip needs one repaint.
  useEffect(() => {
    handleRef.current?.redraw()
  }, [theme])

  return (
    <div className={`pointer-events-none absolute inset-0 opacity-[0.45] ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}

// Gaussian-process banner: posterior samples drawn one by one through fixed
// observations, then drifting continuously by rotating between two independent
// posterior draws. Ported from the design canvas (gp-banner.js).

const CURVE_COLORS = [
  "#E67348", "#FF8A65", "#C9A227", "#9E4A5F", "#D9533C", "#6B4A36",
  "#E9A13B", "#B8384A", "#8C6A55", "#EFB183", "#A9552F", "#7C4B2A",
]
const ANCHORS_X = [0.05, 0.19, 0.34, 0.47, 0.61, 0.76, 0.93]
const ANCHORS_Y = [-0.5, 0.55, -0.6, 0.25, 0.8, -0.35, 0.4]

interface Curve {
  a: Float64Array
  b: Float64Array
  phase: number
  speed: number
  /** Fraction of the draw-in elapsed before this curve starts. */
  delay: number
  /** Relative drawing pace, so the strokes don't land in lockstep. */
  pace: number
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

// Draw-in timeline, in units of "fraction of one curve".
const MEAN_DELAY = 0.14
const DRAW_END = 1.75
const DRAW_STEP = 0.02

// The posterior and its samples are built once per page load and reused by
// every banner: same curves on every route, one Cholesky instead of one per
// navigation, and the draw-in only plays the first time.
let gpCache: { mean: Float64Array; L: Float64Array[] } | null = null
const curvesCache = new Map<number, Curve[]>()
let sharedT0 = 0
let hasDrawnIn = false

export interface BannerHandle {
  redraw: () => void
  stop: () => void
}

function rbf(a: number, b: number, ls: number) {
  const d = (a - b) / ls
  return Math.exp(-0.5 * d * d)
}

function cholesky(A: ArrayLike<number>[], n: number) {
  const L: Float64Array[] = []
  for (let i = 0; i < n; i++) L.push(new Float64Array(n))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = A[i][j]
      for (let k = 0; k < j; k++) sum -= L[i][k] * L[j][k]
      if (i === j) L[i][j] = Math.sqrt(Math.max(sum, 1e-12))
      else L[i][j] = sum / L[j][j]
    }
  }
  return L
}

function solveChol(L: Float64Array[], b: ArrayLike<number>, n: number) {
  const y = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    let s = b[i]
    for (let k = 0; k < i; k++) s -= L[i][k] * y[k]
    y[i] = s / L[i][i]
  }
  const x = new Float64Array(n)
  for (let i = n - 1; i >= 0; i--) {
    let s = y[i]
    for (let k = i + 1; k < n; k++) s -= L[k][i] * x[k]
    x[i] = s / L[i][i]
  }
  return x
}

function gpPosterior(grid: number[], ax: number[], ay: number[], ls: number, sigma: number) {
  const m = ax.length
  const n = grid.length
  const Kxx: Float64Array[] = []
  for (let i = 0; i < m; i++) {
    const row = new Float64Array(m)
    for (let j = 0; j < m; j++) row[j] = sigma * rbf(ax[i], ax[j], ls) + (i === j ? 1e-6 : 0)
    Kxx.push(row)
  }
  const Lx = cholesky(Kxx, m)
  const alpha = solveChol(Lx, ay, m)
  const mean = new Float64Array(n)
  const Ksx: Float64Array[] = []
  for (let i = 0; i < n; i++) {
    const row = new Float64Array(m)
    let mu = 0
    for (let j = 0; j < m; j++) {
      row[j] = sigma * rbf(grid[i], ax[j], ls)
      mu += row[j] * alpha[j]
    }
    Ksx.push(row)
    mean[i] = mu
  }
  const cov: Float64Array[] = []
  for (let i = 0; i < n; i++) {
    const v = solveChol(Lx, Ksx[i], m)
    const row = new Float64Array(n)
    for (let j = 0; j < n; j++) {
      let red = 0
      for (let k = 0; k < m; k++) red += v[k] * Ksx[j][k]
      row[j] = sigma * rbf(grid[i], grid[j], ls) - red + (i === j ? 2e-5 : 0)
    }
    cov.push(row)
  }
  return { mean, L: cholesky(cov, n) }
}

function gpDeviation(gp: { L: Float64Array[] }, n: number) {
  const z = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    let u = 0
    for (let k = 0; k < 3; k++) u += Math.random()
    z[i] = (u - 1.5) * 2
  }
  const out = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    let s = 0
    for (let k = 0; k <= i; k++) s += gp.L[i][k] * z[k]
    out[i] = s
  }
  return out
}

export function startBanner(
  canvas: HTMLCanvasElement,
  options: { curveCount?: number } = {},
): BannerHandle {
  const n = 220
  const count = Math.max(2, Math.min(24, options.curveCount || 10))
  const grid: number[] = []
  for (let i = 0; i < n; i++) grid.push(i / (n - 1))

  const gp = gpCache ?? (gpCache = gpPosterior(grid, ANCHORS_X, ANCHORS_Y, 0.098, 1.7))

  let cached = curvesCache.get(count)
  if (!cached) {
    cached = []
    for (let s = 0; s < count; s++) {
      cached.push({
        a: gpDeviation(gp, n),
        b: gpDeviation(gp, n),
        phase: Math.random() * Math.PI * 2,
        speed: 0.055 + Math.random() * 0.03,
        // Everything starts within the first third, so the strokes advance
        // together rather than queueing up one curve at a time.
        delay: (s / count) * 0.3 + Math.random() * 0.09,
        pace: 0.85 + Math.random() * 0.4,
      })
    }
    curvesCache.set(count, cached)
  }
  // A const so the closures below see a non-nullable value.
  const curves = cached
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!sharedT0 && typeof performance !== "undefined") sharedT0 = performance.now()
  const state = {
    progress: reduced || hasDrawnIn ? DRAW_END : 0,
    t0: sharedT0,
    dims: { w: 1, h: 1 },
    raf: 0,
  }

  function fit() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.clientWidth || 1200
    const h = canvas.clientHeight || 200
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0)
    state.dims = { w, h }
  }

  // Read once per theme change instead of once per frame: getComputedStyle
  // forces a style recalculation, which is what made the banner stutter.
  let meanColor = "#1F6F78"
  function refreshMeanColor() {
    meanColor = (
      getComputedStyle(document.documentElement).getPropertyValue("--curve-mean") || "#1F6F78"
    ).trim()
  }

  function draw() {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const { w, h } = state.dims
    const cy = h * 0.5
    const amp = h * 0.34
    const t = reduced ? 0 : (performance.now() - state.t0) / 1000
    ctx.clearRect(0, 0, w, h)
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = 1.35
    const p = state.progress
    for (let s = 0; s < curves.length; s++) {
      const c = curves[s]
      const upto = Math.floor(clamp01((p - c.delay) * c.pace) * n)
      if (upto < 2) continue
      const th = c.phase + t * c.speed
      const ca = Math.cos(th)
      const sa = Math.sin(th)
      ctx.strokeStyle = CURVE_COLORS[s % CURVE_COLORS.length]
      ctx.globalAlpha = 0.82
      ctx.beginPath()
      for (let i = 0; i < upto; i++) {
        let v = gp.mean[i] + ca * c.a[i] + sa * c.b[i]
        if (v > 2.4) v = 2.4
        else if (v < -2.4) v = -2.4
        const x = grid[i] * w
        const y = cy - v * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    const meanFrac = clamp01((p - MEAN_DELAY) * 1.15)
    const meanUpto = Math.floor(meanFrac * n)
    if (meanUpto > 1) {
      ctx.globalAlpha = 1
      ctx.lineWidth = 2.3
      ctx.strokeStyle = meanColor
      ctx.beginPath()
      for (let i = 0; i < meanUpto; i++) {
        const x = grid[i] * w
        const y = cy - gp.mean[i] * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.lineWidth = 1.35
    }
    ctx.globalAlpha = 1
    ctx.fillStyle = meanColor
    for (let a = 0; a < ANCHORS_X.length; a++) {
      if (meanFrac < ANCHORS_X[a]) continue
      ctx.beginPath()
      ctx.arc(ANCHORS_X[a] * w, cy - ANCHORS_Y[a] * amp, 4.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  fit()
  refreshMeanColor()
  const onResize = () => {
    fit()
    draw()
  }
  window.addEventListener("resize", onResize)

  // The drift is slow enough that 30fps is indistinguishable from 60 and costs
  // half the work; progress steps double to keep the draw-in the same length.
  const FRAME_MS = 1000 / 30
  let running = false
  let inView = true
  let lastFrame = 0
  let pausedAt = 0

  function loop(ts: number) {
    state.raf = requestAnimationFrame(loop)
    if (ts - lastFrame < FRAME_MS) return
    lastFrame = ts
    if (state.progress < DRAW_END) {
      state.progress += DRAW_STEP
      if (state.progress >= DRAW_END) hasDrawnIn = true
    }
    draw()
  }

  function play() {
    if (running || reduced) return
    running = true
    // Skip the paused interval so the curves don't jump on resume.
    if (pausedAt) {
      state.t0 += performance.now() - pausedAt
      pausedAt = 0
    }
    lastFrame = 0
    state.raf = requestAnimationFrame(loop)
  }

  function pause() {
    if (!running) return
    running = false
    pausedAt = performance.now()
    cancelAnimationFrame(state.raf)
  }

  const onVisibility = () => {
    if (document.hidden) pause()
    else if (inView) play()
  }
  document.addEventListener("visibilitychange", onVisibility)

  // An off-screen banner keeps burning frames otherwise — noticeable once you
  // scroll past the header on every page.
  let observer: IntersectionObserver | null = null
  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting)
        if (inView && !document.hidden) play()
        else pause()
      },
      { threshold: 0 },
    )
    observer.observe(canvas)
  }

  if (reduced) {
    hasDrawnIn = true
    draw()
  }
  else if (!observer) play()

  return {
    redraw: () => {
      refreshMeanColor()
      draw()
    },
    stop: () => {
      pause()
      cancelAnimationFrame(state.raf)
      observer?.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("resize", onResize)
    },
  }
}

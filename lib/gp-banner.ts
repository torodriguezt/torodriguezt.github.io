// Gaussian-process banner: posterior samples drawn one by one through fixed
// observations, then drifting continuously by rotating between two independent
// posterior draws. Ported from the design canvas (gp-banner.js).

// Four observations, widely spaced. Seven of them, alternating sign every 0.14
// with a length scale of 0.098, made the posterior mean itself zigzag six times
// — that busyness read as noise in the draws when it was really the fit
// following the data. Four anchors over a longer length scale give a mean with
// two gentle turns and room for the band to open between them.
const ANCHORS_X = [0.08, 0.36, 0.64, 0.92]
const ANCHORS_Y = [0.45, -0.5, 0.55, -0.35]
/** Long enough that the draws undulate rather than wobble. */
const LENGTH_SCALE = 0.22
const SIGNAL_VAR = 1.7

interface Curve {
  a: Float64Array
  b: Float64Array
  phase: number
  speed: number
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

// One draw-in timeline for every layer. Band, draws and mean all advance
// against this same fraction and reach the right edge together — previously
// each curve carried its own delay and pace while the mean ran on a third
// clock, so the layers arrived at different times.
const DRAW_END = 1
const DRAW_STEP = 0.02

// The posterior and its samples are built once per page load and reused by
// every banner: same curves on every route, one Cholesky instead of one per
// navigation, and the draw-in only plays the first time.
//
// This lives on globalThis rather than in module scope on purpose: a module can
// be instantiated more than once (duplicated across route chunks, re-evaluated
// by Fast Refresh), and each copy would bring its own blank cache and replay the
// draw-in. A page load is the only thing that clears this.
interface BannerScene {
  gp: { mean: Float64Array; sd: Float64Array; L: Float64Array[] } | null
  curves: Map<number, Curve[]>
  t0: number
  /** How far the draw-in got, so navigating mid-stroke picks it up there. */
  progress: number
}

const globalScope = globalThis as unknown as { __gpBannerScene?: BannerScene }
const scene: BannerScene =
  globalScope.__gpBannerScene ??
  (globalScope.__gpBannerScene = { gp: null, curves: new Map(), t0: 0, progress: 0 })

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
  // Marginal sd for the credible band. Σ = LLᵀ, so diag(Σ) is the squared row
  // norm of L — no second pass over the covariance needed.
  const L = cholesky(cov, n)
  const sd = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    let ss = 0
    for (let k = 0; k <= i; k++) ss += L[i][k] * L[i][k]
    sd[i] = Math.sqrt(ss)
  }

  return { mean, sd, L }
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
  options: { curveCount?: number; drift?: boolean } = {},
): BannerHandle {
  // With drift off the draws settle into one fixed posterior sample and the
  // render loop shuts down after the draw-in, so the page stops repainting.
  const drift = options.drift ?? false
  const n = 220
  const count = Math.max(2, Math.min(24, options.curveCount || 10))
  const grid: number[] = []
  for (let i = 0; i < n; i++) grid.push(i / (n - 1))

  const gp =
    scene.gp ??
    (scene.gp = gpPosterior(grid, ANCHORS_X, ANCHORS_Y, LENGTH_SCALE, SIGNAL_VAR))

  let cached = scene.curves.get(count)
  if (!cached) {
    cached = []
    for (let s = 0; s < count; s++) {
      cached.push({
        a: gpDeviation(gp, n),
        b: gpDeviation(gp, n),
        phase: Math.random() * Math.PI * 2,
        speed: 0.055 + Math.random() * 0.03,
      })
    }
    scene.curves.set(count, cached)
  }
  // A const so the closures below see a non-nullable value.
  const curves = cached
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!scene.t0 && typeof performance !== "undefined") scene.t0 = performance.now()
  const state = {
    progress: reduced ? DRAW_END : scene.progress,
    t0: scene.t0,
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
  // Fallbacks mirror the light palette, which is the default theme.
  let meanColor = "#1B7A4B"
  let drawColor = "#E67348"
  let pageColor = "#FFFDFC"
  // Per-theme, because the same alpha does not buy the same presence on a
  // near-white and a near-black page. Tuned in globals.css beside the palette.
  let bandAlpha = 0.18
  let drawAlpha = 0.3
  function refreshMeanColor() {
    const style = getComputedStyle(document.documentElement)
    const read = (name: string, fallback: string) =>
      (style.getPropertyValue(name) || fallback).trim()
    const readNumber = (name: string, fallback: number) => {
      const value = Number.parseFloat(style.getPropertyValue(name))
      return Number.isFinite(value) ? value : fallback
    }
    meanColor = read("--curve-mean", "#1B7A4B")
    drawColor = read("--brand", "#E67348")
    pageColor = read("--bg", "#FFFDFC")
    bandAlpha = readNumber("--banner-band", 0.18)
    drawAlpha = readNumber("--banner-draw", 0.3)
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
    // Draws are hairlines so the mean, at more than twice the weight, is
    // unmistakably the fit and they are unmistakably the samples around it.
    ctx.lineWidth = 1.2
    // One fraction drives every layer, so the band, the draws and the mean
    // sweep across together.
    const frac = clamp01(state.progress)
    const upto = Math.floor(frac * n)

    // The 95% band, drawn first so everything else sits on top of it. This is
    // the element that makes the picture read as a fit: it pinches at the
    // observations and opens between them.
    const bandUpto = upto
    if (bandUpto > 1) {
      // The wrapper already sits at 0.45 opacity, so this is halved again
      // on screen.
      ctx.globalAlpha = bandAlpha
      ctx.fillStyle = drawColor
      ctx.beginPath()
      for (let i = 0; i < bandUpto; i++) {
        const x = grid[i] * w
        const y = cy - (gp.mean[i] + 1.96 * gp.sd[i]) * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      for (let i = bandUpto - 1; i >= 0; i--) {
        ctx.lineTo(grid[i] * w, cy - (gp.mean[i] - 1.96 * gp.sd[i]) * amp)
      }
      ctx.closePath()
      ctx.fill()
    }

    ctx.strokeStyle = drawColor
    for (let s = 0; s < curves.length; s++) {
      const c = curves[s]
      if (upto < 2) continue
      // Static: the draw holds the phase it was born with. Drifting: the phase
      // rotates between two independent posterior draws, which keeps every
      // intermediate frame a valid draw rather than an average of two.
      const th = drift ? c.phase + t * c.speed : c.phase
      const ca = Math.cos(th)
      const sa = Math.sin(th)
      // Every draw shares one hue: they are exchangeable samples, so colouring
      // them apart would encode an identity that does not exist. At low alpha
      // the strokes pile up where the draws agree and thin out where they do
      // not, which turns the bundle into a density.
      ctx.globalAlpha = drawAlpha
      ctx.beginPath()
      for (let i = 0; i < upto; i++) {
        const v = gp.mean[i] + ca * c.a[i] + sa * c.b[i]
        const x = grid[i] * w
        const y = cy - v * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    if (upto > 1) {
      ctx.globalAlpha = 1
      ctx.lineWidth = 2.8
      ctx.strokeStyle = meanColor
      ctx.beginPath()
      for (let i = 0; i < upto; i++) {
        const x = grid[i] * w
        const y = cy - gp.mean[i] * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.lineWidth = 1.2
    }
    // The observations last, each with a ring in the page colour so it stays
    // legible where the bundle of draws crosses it. These are the points the
    // whole picture is conditioned on, so they should be the clearest thing in
    // it — before, they were the same flat dot the draws ran straight over.
    ctx.globalAlpha = 1
    for (let a = 0; a < ANCHORS_X.length; a++) {
      if (frac < ANCHORS_X[a]) continue
      const x = ANCHORS_X[a] * w
      const y = cy - ANCHORS_Y[a] * amp
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = pageColor
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x, y, 4.2, 0, Math.PI * 2)
      ctx.fillStyle = meanColor
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
  /** Set once a static banner has finished drawing in: nothing left to animate. */
  let settled = false

  function loop(ts: number) {
    if (ts - lastFrame >= FRAME_MS) {
      lastFrame = ts
      if (state.progress < DRAW_END) {
        state.progress += DRAW_STEP
        scene.progress = state.progress
      }
      draw()
      if (!drift && state.progress >= DRAW_END) {
        settled = true
        running = false
        return
      }
    }
    state.raf = requestAnimationFrame(loop)
  }

  function play() {
    if (running || reduced || settled) return
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
    scene.progress = DRAW_END
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

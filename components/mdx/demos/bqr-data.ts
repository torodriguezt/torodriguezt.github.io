/**
 * Numbers behind the bayesQRsurvey figures.
 *
 * All of it comes out of `scripts/extract-bqr.R`, which refits the vignette's
 * models and writes `content/data/*.json`. Nothing here is invented, and
 * nothing is fitted in the browser — the JSON is committed and the figures just
 * read it.
 *
 * One deliberate difference from the vignette: the chains are longer. The
 * vignette runs 6000 iterations so it builds quickly, which leaves effective
 * sample sizes in the hundreds; these run 40000 with 20000 burned in, so the
 * intervals are not limited by Monte Carlo error.
 */

import anthro from "@/content/data/anthro.json"
import fits from "@/content/data/bqr-fits.json"

export interface TauFit {
  tau: number
  variable: string[]
  mean: number[]
  lower: number[]
  upper: number[]
  rhat: number[]
  ess_bulk: number[]
  ess_tail: number[]
}

export const ALD_GRID = fits.ald_grid as TauFit[]
export const SCORE_MEDIAN = fits.score_median as TauFit
export const DESIGN_COLUMNS = fits.design_columns as string[]
export const PACKAGE_VERSION = fits.package_version as string

export const TAUS = ALD_GRID.map((f) => f.tau)

/** Human-facing names for the design-matrix columns. */
export const LABELS: Record<string, string> = {
  "(Intercept)": "Intercept",
  age: "age",
  "I(age^2)": "age²",
  sexGirls: "sexGirls",
}

function at(fit: TauFit, variable: string) {
  const i = fit.variable.indexOf(variable)
  if (i < 0) throw new Error(`no coefficient ${variable}`)
  return { mean: fit.mean[i], lower: fit.lower[i], upper: fit.upper[i] }
}

export function coefficient(tau: number, variable: string) {
  const fit = ALD_GRID.find((f) => f.tau === tau)
  if (!fit) throw new Error(`no fit at tau=${tau}`)
  return at(fit, variable)
}

/** Design row for a child, in the order of `DESIGN_COLUMNS`. */
export function designRow(age: number, girls: boolean): number[] {
  return [1, age, age * age, girls ? 1 : 0]
}

/** Conditional quantile of weight, in kg. */
export function weightQuantile(tau: number, age: number, girls: boolean): number {
  const fit = ALD_GRID.find((f) => f.tau === tau)
  if (!fit) throw new Error(`no fit at tau=${tau}`)
  const x = designRow(age, girls)
  return DESIGN_COLUMNS.reduce((sum, name, i) => sum + at(fit, name).mean * x[i], 0)
}

// ── The observed children ──────────────────────────────────────────────────

export interface Child {
  wgt: number
  hgt: number
  age: number
  girls: boolean
}

export const CHILDREN: Child[] = anthro.wgt.map((w, i) => ({
  wgt: w,
  hgt: anthro.hgt[i],
  age: anthro.age[i],
  girls: anthro.girls[i] === 1,
}))

export const AGE_MIN = Math.min(...CHILDREN.map((c) => c.age))
export const AGE_MAX = Math.max(...CHILDREN.map((c) => c.age))

// ── Multiple-output quantile regions ───────────────────────────────────────

export const MO_TAUS = fits.mo.taus as number[]
export const N_DIR = fits.mo.n_dir as number

interface Direction {
  u: number[]
  gammaVec: number[]
}

const DIRECTIONS = fits.mo.directions as Direction[]
const MO_FITS = fits.mo.fits as { tau: number; beta: number[][]; gamma: number[] }[]

/**
 * The quantile region for one covariate profile.
 *
 * For direction j the fitted equation is
 *
 *     u_j' y  =  x' beta_j  +  gamma_j (Gamma_j' y)
 *
 * so collecting the y terms gives a hyperplane with normal
 * `n_j = u_j - gamma_j Gamma_j` and offset `x' beta_j`.
 *
 * The side matters. `n_j' y <= x' beta_j` is the *tail* — the lower tau of the
 * projection onto direction j — so the quantile region is the intersection of
 * the complements, `n_j' y >= x' beta_j` over every direction: the points that
 * are extreme in no direction at all. Because the directions cover the whole
 * circle the intersection is bounded, convex by construction, and polygonal
 * rather than smooth because the direction set is finite.
 *
 * The half-spaces are intersected by clipping a large box against each in turn
 * (Sutherland-Hodgman) rather than by pairing neighbouring directions — once
 * gamma tilts each normal away from its own u, "neighbouring in u" no longer
 * means "neighbouring in the polygon".
 */
export function quantileRegion(
  tau: number,
  age: number,
  girls: boolean
): [number, number][] {
  const fit = MO_FITS.find((f) => f.tau === tau)
  if (!fit) return []
  const x = designRow(age, girls)

  const halfPlanes = DIRECTIONS.map((dir, j) => {
    const g = fit.gamma[j]
    const normal: [number, number] = [
      dir.u[0] - g * dir.gammaVec[0],
      dir.u[1] - g * dir.gammaVec[1],
    ]
    const offset = fit.beta[j].reduce((s, b, k) => s + b * x[k], 0)
    return { normal, offset }
  })

  // A box comfortably larger than any plausible (weight, height).
  let poly: [number, number][] = [
    [-200, -400],
    [400, -400],
    [400, 600],
    [-200, 600],
  ]

  for (const { normal, offset } of halfPlanes) {
    if (poly.length === 0) break
    const inside = (p: [number, number]) => normal[0] * p[0] + normal[1] * p[1] >= offset
    const next: [number, number][] = []

    for (let i = 0; i < poly.length; i++) {
      const a = poly[i]
      const b = poly[(i + 1) % poly.length]
      const aIn = inside(a)
      const bIn = inside(b)
      if (aIn) next.push(a)
      if (aIn !== bIn) {
        const da = normal[0] * a[0] + normal[1] * a[1] - offset
        const db = normal[0] * b[0] + normal[1] * b[1] - offset
        const t = da / (da - db)
        next.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])])
      }
    }
    poly = next
  }

  return poly
}

import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxOptions } from "@/lib/mdx"
import Callout from "./callout"
import Figure from "./figure"
import Wide from "./wide"
import CoefficientPaths from "./demos/coefficient-paths"
import QuantileCurves from "./demos/quantile-curves"
import QuantileRegions from "./demos/quantile-regions"

/**
 * Every name here is available inside any .mdx post with no import statement.
 * Generic building blocks first, then the interactive pieces a given post pulls
 * in — the client bundle only grows for posts that actually use them.
 */
const components = {
  Callout,
  Figure,
  Wide,
  CoefficientPaths,
  QuantileCurves,
  QuantileRegions,
}

export default function MdxBody({ source }: { source: string }) {
  // Compiled during `next build`: KaTeX and Shiki never reach the browser.
  return <MDXRemote source={source} options={mdxOptions} components={components} />
}

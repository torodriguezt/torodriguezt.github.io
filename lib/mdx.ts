import type { PluggableList } from "unified"
import type { Options as PrettyCodeOptions } from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

// Two themes in one pass: every token carries --shiki-light and --shiki-dark,
// and globals.css picks the side matching [data-theme]. No client JS involved —
// highlighting happens at build time.
const prettyCode: PrettyCodeOptions = {
  theme: { light: "vitesse-light", dark: "vitesse-dark" },
  // A theme record turns on dual output automatically: each token gets
  // --shiki-light and --shiki-dark instead of a baked-in color.
  keepBackground: false,
  onVisitLine(node) {
    // Keeps blank lines from collapsing, which would break the line numbering.
    if (node.children.length === 0) node.children = [{ type: "text", value: " " }]
  },
}

const autolink = {
  behavior: "append" as const,
  properties: { className: "heading-anchor", ariaHidden: true, tabIndex: -1 },
  content: { type: "element" as const, tagName: "span", properties: {}, children: [{ type: "text" as const, value: "¶" }] },
}

export const mdxOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath] as PluggableList,
    // KaTeX runs after the code highlighter so a $ inside a code block is
    // never mistaken for math.
    rehypePlugins: ([
      [rehypePrettyCode, prettyCode],
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, autolink],
    ] as PluggableList),
  },
}

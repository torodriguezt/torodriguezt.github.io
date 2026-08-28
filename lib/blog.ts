import fs from "node:fs"
import path from "node:path"
import GithubSlugger from "github-slugger"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  category: string
  /** Frontmatter wins; otherwise estimated from the word count. */
  readTime: string
}

export interface Post extends PostMeta {
  body: string
}

/** ~200 wpm, ignoring code fences and JSX so demos don't inflate the estimate. */
function estimateReadTime(body: string): string {
  const prose = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, "")
  const words = prose.split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min`
}

function readPost(fileName: string): Post | null {
  const slug = fileName.replace(/\.mdx?$/, "")
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8")
  const { data, content } = matter(raw)

  // No title means it is not a post — README.md and notes live here too.
  if (data.draft || !data.title) return null

  return {
    slug,
    title: data.title,
    date: data.date ? String(data.date).slice(0, 10) : "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    category: data.category ?? "Notes",
    readTime: data.readTime ?? estimateReadTime(content),
    body: content,
  }
}

/** Files prefixed with `_` are drafts and never reach the build. */
function postFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
}

export function getAllPosts(): PostMeta[] {
  return postFiles()
    .map(readPost)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ body, ...meta }) => meta)
}

export function getPost(slug: string): Post | null {
  const file = postFiles().find((f) => f.replace(/\.mdx?$/, "") === slug)
  return file ? readPost(file) : null
}

export interface Heading {
  depth: 2 | 3
  text: string
  id: string
}

/**
 * Headings for the in-page table of contents. Slugs are produced with the same
 * slugger rehype-slug uses, so the anchors line up.
 */
export function getHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger()
  return body
    .replace(/```[\s\S]*?```/g, "") // a `# comment` inside a fence is not a heading
    .split("\n")
    .map((line) => /^(#{2,3})\s+(.*)$/.exec(line.trim()))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => {
      const text = m[2].replace(/`/g, "").replace(/\*\*/g, "").trim()
      return { depth: m[1].length as 2 | 3, text, id: slugger.slug(text) }
    })
}

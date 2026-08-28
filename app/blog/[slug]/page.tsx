import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import MdxBody from "@/components/mdx/mdx-body"
import ReadingProgress from "@/components/mdx/reading-progress"
import Toc from "@/components/mdx/toc"
import { getAllPosts, getHeadings, getPost } from "@/lib/blog"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Tomás Rodríguez Taborda`,
    description: post.description,
  }
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const headings = getHeadings(post.body)

  return (
    <>
      <ReadingProgress />

      <article className="pb-24 pt-[104px]">
        <header className="rise mx-auto max-w-[720px] px-6 sm:px-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-[11.5px] text-dim transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            Blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
            <span className="text-brand">{post.category}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-4 text-pretty text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[38px]">
            {post.title}
          </h1>

          <div className="mt-[22px] h-px w-9 bg-brand" />

          {post.description && (
            <p className="mt-[18px] max-w-[56ch] text-[16.5px] leading-[1.65] text-ink2">
              {post.description}
            </p>
          )}

          <p className="mt-6 font-mono text-[11.5px] text-dim">{post.tags.join(" · ")}</p>
        </header>

        <div className="mx-auto mt-14 max-w-[1240px] px-6 sm:px-8 lg:grid lg:grid-cols-[1fr_minmax(0,720px)_1fr] lg:gap-10">
          <div className="hidden lg:block" />
          <div className="prose prose-tr prose-post max-w-none">
            <MdxBody source={post.body} />
          </div>
          <Toc headings={headings} />
        </div>

        <footer className="mx-auto mt-20 max-w-[720px] border-t border-rule px-6 pt-8 sm:px-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-[12px] text-ink2 transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            All posts
          </Link>
        </footer>
      </article>
    </>
  )
}

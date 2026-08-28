import Link from "next/link"
import PageHeader from "@/components/page-header"
import { getAllPosts } from "@/lib/blog"

export const metadata = {
  title: "Blog | Tomás Rodríguez Taborda",
  description: "Notes on Bayesian computation, spatial statistics and the software around them.",
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Notes on Bayesian computation, spatial statistics and the software around them."
      />

      <section className="rise-2 mx-auto max-w-[900px] px-6 pb-24 pt-[52px] sm:px-8">
        {posts.length === 0 ? (
          <p className="text-[15.5px] leading-[1.7] text-ink2">Nothing published yet.</p>
        ) : (
          <ol className="m-0 list-none p-0">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-rule">
                <Link href={`/blog/${post.slug}`} className="group block py-[26px]">
                  <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-dim">
                    <span className="rounded-full border border-rule px-2.5 py-[3px] text-[10.5px] transition-colors group-hover:border-brand group-hover:text-brand">
                      {post.category}
                    </span>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="max-w-[62ch] text-pretty text-[19px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink transition-colors group-hover:text-brand">
                    {post.title}
                  </h2>

                  <p className="mt-2.5 max-w-[68ch] text-pretty text-[14.5px] leading-[1.7] text-ink2">
                    {post.description}
                  </p>

                  <p className="mt-3.5 font-mono text-[11.5px] leading-[1.6] text-dim">
                    {post.tags.join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  )
}

import GpBanner from "@/components/gp-banner"

export default function BlogPage() {
  return (
    <section className="relative overflow-hidden">
      <GpBanner curveCount={12} />

      <div className="rise relative flex min-h-[70vh] flex-col items-center justify-center gap-[22px] px-6 py-20 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          Under construction
        </p>

        <h1 className="text-center text-[34px] font-semibold tracking-[-0.03em] text-ink">Blog</h1>

        <p className="max-w-[44ch] text-pretty text-center text-[15.5px] leading-[1.7] text-ink2">
          I&rsquo;m still putting the material together. Deployment write-ups and project notes will
          land here.
        </p>
      </div>
    </section>
  )
}

import PageHeader from "@/components/page-header"

interface Award {
  year: string
  title: string
  context: string
}

// Most recent first.
const AWARDS: Award[] = [
  {
    year: "2025",
    title: "First Place — Hackathon UdeA × Source Meridian",
    context:
      "Universidad de Antioquia — Built a BERT-based multi-label and multi-class classifier for medical articles",
  },
  {
    year: "2024",
    title: "Best Poster Award — ISBA 2024",
    context: "International Society for Bayesian Analysis World Meeting",
  },
]

export default function AwardsPage() {
  return (
    <>
      <PageHeader title="Awards" />

      <section className="rise-2 mx-auto max-w-[900px] px-6 pb-24 pt-10 sm:px-8">
        {AWARDS.map((award) => (
          <div
            key={award.title}
            className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[88px_1fr] sm:gap-6"
          >
            <span className="font-mono text-[13px] text-ink sm:pt-1">{award.year}</span>
            <div>
              <h2 className="max-w-[60ch] text-[16.5px] font-semibold leading-[1.4] tracking-[-0.01em] text-ink">
                {award.title}
              </h2>
              <p className="mt-2 max-w-[66ch] text-pretty text-[14.5px] leading-[1.65] text-ink2">
                {award.context}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

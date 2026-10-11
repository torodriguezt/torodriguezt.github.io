import PageHeader from "@/components/page-header"

interface Award {
  date: string
  dateTime: string
  title: string
  context: string
}

// Most recent first.
const AWARDS: Award[] = [
  {
    date: "11 Aug 2025",
    dateTime: "2025-08-11",
    title: "1st Place — Biomedical Literature Classification Hackathon",
    context:
      "Developed a BERT-based multilabel classifier for medical articles, achieving an F1 score of 0.93 and Hamming loss of 0.03.",
  },
  {
    date: "15 Jul 2024",
    dateTime: "2024-07-15",
    title: "Best Poster Award — 2024 ISBA World Meeting",
    context: "Bayesian Analysis of Geochemical Risk in the Province of Huelva, Spain.",
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
            className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[112px_1fr] sm:gap-6"
          >
            <time dateTime={award.dateTime} className="font-mono text-[13px] text-ink sm:pt-1">{award.date}</time>
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

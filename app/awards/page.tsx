import PageHeader from "@/components/page-header"

interface Award {
  title: string
  context: string
}

const AWARDS: Award[] = [
  {
    title: "1st Place — Biomedical Literature Classification Hackathon",
    context:
      "Developed a BERT-based multilabel classifier for medical articles, achieving an F1 score of 0.93 and Hamming loss of 0.03.",
  },
  {
    title: "Best Poster Award — ISBA World Meeting",
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
            className="border-b border-rule py-6"
          >
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

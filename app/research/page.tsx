import PageHeader from "@/components/page-header"
import { CONFERENCES, GRANTS, PAPERS } from "@/lib/data/research"

export default function ResearchPage() {
  return (
    <>
      <PageHeader title="Research" subtitle="Academic papers and conference presentations." />

      <section className="rise-2 mx-auto max-w-[900px] px-6 pt-[52px] sm:px-8">
        <div className="flex items-baseline gap-3.5 border-b border-rule pb-2">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">Papers</h2>
        </div>

        <ol className="m-0 list-none p-0">
          {PAPERS.map((paper) => {
            // Submitted work carries the journal in accent; in-preparation stays quiet.
            const submitted = paper.status.toLowerCase().startsWith("submitted")
            return (
              <li key={paper.title} className="border-b border-rule py-[26px]">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full border px-2.5 py-[3px] font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] ${
                      submitted ? "border-brand text-brand" : "border-rule text-dim"
                    }`}
                  >
                    {paper.status}
                  </span>
                  {paper.link && (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-rule pb-px font-mono text-[11.5px] text-ink2 transition-colors hover:border-brand hover:text-brand"
                    >
                      arXiv ↗
                    </a>
                  )}
                </div>
                <h3 className="max-w-[62ch] text-pretty text-[16.5px] font-semibold leading-[1.4] tracking-[-0.01em] text-ink">
                  {paper.title}
                </h3>
                <p className="mt-2 max-w-[68ch] text-[13.5px] italic leading-[1.6] text-ink2">
                  {paper.collaborators}
                </p>
                <p className="mt-3 max-w-[68ch] text-pretty text-[14.5px] leading-[1.7] text-ink2">
                  {paper.description}
                </p>
                <p className="mt-3.5 font-mono text-[11.5px] leading-[1.6] text-dim">
                  {paper.tags.join(" · ")}
                </p>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="rise-3 mx-auto max-w-[900px] px-6 pt-[52px] sm:px-8">
        <div className="flex items-baseline gap-3.5 border-b border-rule pb-2">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">Grants</h2>
        </div>

        {GRANTS.map((grant) => (
          <div
            key={grant.title}
            className="grid gap-3 border-b border-rule py-[26px] sm:grid-cols-[88px_1fr] sm:gap-6"
          >
            <span className="font-mono text-[13px] text-ink sm:pt-0.5">{grant.years}</span>
            <div>
              <h3 className="max-w-[62ch] text-pretty text-[16.5px] font-semibold leading-[1.4] tracking-[-0.01em] text-ink">
                {grant.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-ink2">
                {grant.role} · Director: {grant.director}
              </p>
              <p className="mt-1.5 font-mono text-[11.5px] leading-[1.6] text-dim">
                {grant.sponsor} · {grant.amount}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="rise-3 mx-auto max-w-[900px] px-6 pb-24 pt-[52px] sm:px-8">
        <div className="flex items-baseline gap-3.5 border-b border-rule pb-2">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">Conferences</h2>
        </div>

        {CONFERENCES.map((group) => (
          <div
            key={group.year}
            className="grid gap-3 border-b border-rule py-[26px] sm:grid-cols-[88px_1fr] sm:gap-6"
          >
            <span className="font-mono text-[13px] text-ink sm:pt-0.5">{group.year}</span>
            <div className="flex flex-col gap-[22px]">
              {group.conferences.map((conf) => (
                <div key={conf.name}>
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
                      {conf.name}
                    </h3>
                    <span className="font-mono text-[11.5px] text-dim">{conf.location}</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {conf.presentations.map((pres) => (
                      <div
                        key={pres.topic}
                        className="grid items-baseline gap-1 sm:grid-cols-[64px_1fr] sm:gap-3.5"
                      >
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-brand">
                          {pres.type}
                        </span>
                        <span className="max-w-[62ch] text-pretty text-[14.5px] leading-[1.6] text-ink2">
                          {pres.topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

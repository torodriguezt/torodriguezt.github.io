import PageHeader from "@/components/page-header"
import { EDUCATION, JOBS, ORGS, UI, type OrgKey } from "@/lib/data/experience"

const ORG_ORDER: OrgKey[] = ["ic", "unal"]

export default function ExperiencePage() {
  const groups = ORG_ORDER.map((key) => ({
    key,
    org: ORGS[key],
    range: UI.orgRange[key],
    roles: JOBS.filter((job) => job.org === key),
  }))

  return (
    <>
      <PageHeader title={UI.title} />

      <section className="rise-2 mx-auto max-w-[900px] px-6 pt-11 sm:px-8">
        {groups.map((group) => (
          <div key={group.key} className="mb-11">
            <div className="flex items-baseline justify-between gap-5 border-b border-rule pb-3">
              <h2 className="text-[19px] font-semibold tracking-[-0.015em] text-ink">{group.org}</h2>
              <span className="whitespace-nowrap font-mono text-xs text-dim">{group.range}</span>
            </div>

            <div className="flex flex-col gap-[26px] pt-[22px]">
              {group.roles.map((role) => (
                <div
                  key={`${role.org}-${role.period}-${role.title}`}
                  className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-5"
                >
                  <span className="font-mono text-[11.5px] leading-[1.6] text-dim sm:pt-1">
                    {role.period}
                  </span>
                  <div>
                    <h3 className="mb-2.5 text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
                      {role.title}
                    </h3>
                    <p className="max-w-[66ch] text-pretty text-[14.5px] leading-[1.7] text-ink2">
                      {role.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="rise-3 mx-auto max-w-[900px] px-6 pb-24 sm:px-8">
        <div className="border-t border-rule pt-[26px]">
          <h2 className="mb-[22px] font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
            {UI.education}
          </h2>
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="grid gap-2 pb-[18px] sm:grid-cols-[150px_1fr] sm:gap-5">
              <span className="font-mono text-[11.5px] text-dim sm:pt-1">{edu.period}</span>
              <div>
                <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm text-ink2">{ORGS[edu.org]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

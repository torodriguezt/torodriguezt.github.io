import PageHeader from "@/components/page-header"
import { JOBS, ORGS, ORG_LOCATIONS, UI, type OrgKey } from "@/lib/data/experience"

const ORG_ORDER: OrgKey[] = ["kaust", "unal", "ic"]

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

      <section className="rise-2 mx-auto max-w-[900px] px-6 pb-24 pt-11 sm:px-8">
        {groups.map((group) => (
          <div key={group.key} className="mb-11 last:mb-0">
            <div className="flex flex-col gap-2 border-b border-rule pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
              <h2 className="text-[19px] font-semibold tracking-[-0.015em] text-ink">{group.org}</h2>
              <span className="whitespace-nowrap font-mono text-xs text-dim">{group.range}</span>
            </div>

            <div className="flex flex-col gap-[26px] pt-[22px]">
              {group.roles.map((role) => (
                <div
                  key={`${role.org}-${role.period}-${role.title}`}
                  className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-5"
                >
                  <div className="min-w-0 text-dim sm:pt-1">
                    <p className="font-mono text-[11.5px] leading-[1.6]">{role.period}</p>
                    <p className="mt-1 text-xs leading-[1.6]">{ORG_LOCATIONS[role.org]}</p>
                  </div>
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
    </>
  )
}

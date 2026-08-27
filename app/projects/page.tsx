import PageHeader from "@/components/page-header"
import { GROUPS, UI } from "@/lib/data/projects"

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title={UI.title} subtitle={UI.subtitle} />

      {GROUPS.map((group) => (
        <section key={group.key} className="rise-2 mx-auto max-w-[900px] px-6 pt-12 sm:px-8">
          <div className="flex items-baseline gap-3.5 pb-[18px]">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
              {group.label}
            </h2>
            <span className="h-px flex-1 bg-rule" />
            <span className="font-mono text-[11px] text-dim">{group.items.length}</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {group.items.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-[14px] border border-rule bg-panel px-[22px] pb-5 pt-[22px] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand"
              >
                <div className="flex items-start justify-between gap-3.5">
                  <h3 className="text-pretty text-[15.5px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink">
                    {item.title}
                  </h3>
                  {item.links.length > 0 && (
                    <div className="flex shrink-0 flex-wrap justify-end gap-2.5 pt-0.5">
                      {item.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-nowrap font-mono text-[11px] text-dim transition-colors hover:text-brand"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-pretty text-sm leading-[1.65] text-ink2">{item.description}</p>

                {item.collaborators && (
                  <p className="text-[12.5px] italic leading-[1.55] text-dim">
                    {item.collaborators}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap gap-1.5 pt-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-rule px-[9px] py-[3px] font-mono text-[10.5px] text-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {group.key === "side" && (
            <p className="max-w-[72ch] pt-[22px] text-[13.5px] leading-[1.7] text-ink2">
              {UI.deploymentNote}
            </p>
          )}
        </section>
      ))}

      <div className="h-[88px]" />
    </>
  )
}

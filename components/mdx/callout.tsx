import type { ReactNode } from "react"
import { AlertTriangle, Info, Lightbulb, Sigma } from "lucide-react"

type Variant = "note" | "warning" | "insight" | "aside"

const VARIANTS: Record<Variant, { icon: typeof Info; label: string; accent: string }> = {
  note: { icon: Info, label: "Note", accent: "var(--fg2)" },
  warning: { icon: AlertTriangle, label: "Careful", accent: "#C9822F" },
  insight: { icon: Lightbulb, label: "Takeaway", accent: "var(--brand)" },
  aside: { icon: Sigma, label: "Detail", accent: "var(--dim)" },
}

/**
 * Sidebar-style note. `<Callout variant="insight" title="...">` in MDX; the
 * body is ordinary markdown, so links and math work inside it.
 */
export default function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant
  title?: string
  children: ReactNode
}) {
  const { icon: Icon, label, accent } = VARIANTS[variant]

  return (
    <aside
      className="my-8 rounded-lg border border-rule bg-panel px-5 py-4"
      style={{ borderLeft: `2px solid ${accent}` }}
    >
      <div className="mb-2 flex items-center gap-2" style={{ color: accent }}>
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em]">
          {title ?? label}
        </span>
      </div>
      <div className="text-[15px] leading-[1.7] text-ink2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-2">
        {children}
      </div>
    </aside>
  )
}

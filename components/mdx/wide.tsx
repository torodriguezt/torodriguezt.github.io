import type { ReactNode } from "react"

/**
 * Breaks a block out of the 68ch measure — for maps, charts and anything that
 * needs the room. The class is styled in globals.css under `.prose-post`.
 */
export default function Wide({ children }: { children: ReactNode }) {
  return <div className="not-prose-wide my-9">{children}</div>
}

import type { ReactNode } from "react"

/**
 * Captioned static figure — PNG, SVG or animated GIF. Matches the frame the
 * interactive figures use: no card, hairline rules, numbered caption
 * underneath. Pass `n` to number it; leave it off for an unnumbered image.
 */
export default function Figure({
  src,
  alt,
  caption,
  n,
  children,
}: {
  src?: string
  alt?: string
  caption?: ReactNode
  n?: number
  children?: ReactNode
}) {
  return (
    <figure className="not-prose-wide m-0 border-y border-rule py-7">
      {src ? (
        // Plain <img>: the export is static and images are unoptimized, so
        // next/image would only add markup here.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ""} className="mx-auto block max-w-full" loading="lazy" />
      ) : (
        children
      )}
      {caption && (
        <figcaption className="mt-5 max-w-[74ch] text-[12.5px] leading-[1.65] text-dim">
          {n !== undefined && (
            <>
              <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink2">
                Fig. {n}
              </span>{" "}
              ·{" "}
            </>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

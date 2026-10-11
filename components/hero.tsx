import Link from "next/link"
import GpBanner from "@/components/gp-banner"

const INTRO =
  "I work on computational statistics, with a focus on Bayesian computation. My current research develops algorithms that make Bayesian inference feasible for models where exact computation is out of reach."

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <GpBanner curveCount={12} />

      <div className="rise relative mx-auto max-w-[900px] px-6 pb-14 pt-16 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_236px] lg:gap-12">
          <div>
            <h1 className="text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[46px]">
              Tom{"á"}s Rodr{"í"}guez
              <br />
              Taborda
            </h1>

            <p className="mt-[26px] max-w-[40ch] text-pretty text-[17px] leading-[1.55] text-ink2 sm:text-[18px]">
              {INTRO}
            </p>

            <p className="mt-5 max-w-[46ch] text-pretty text-[14px] leading-[1.65] text-ink2">
              Incoming Visiting Research Student at KAUST, hosted by Prof. Håvard Rue
              in the BAYESCOMP group (November 2026 – April 2027).
            </p>

            <div className="mt-[30px] flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-[11px] text-[13.5px] font-semibold text-paper transition-opacity hover:opacity-[0.86]"
              >
                Explore my research <span className="font-mono">→</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 border-b border-rule px-1 py-[11px] text-[13.5px] font-medium text-ink2 transition-colors hover:border-brand hover:text-ink"
              >
                Projects <span className="font-mono text-[12px]">↗</span>
              </Link>
            </div>
          </div>

          <div className="order-first w-40 overflow-hidden rounded lg:order-last lg:w-full">
            <div className="aspect-[4/5] overflow-hidden rounded">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/perfil.jpg`}
                alt="Tomás Rodríguez Taborda"
                className="block h-full w-full object-cover object-top grayscale transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

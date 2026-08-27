const PARA_1 =
  "I hold a degree in Systems and Computer Science Engineering and am finishing my degree in Statistics at the National University of Colombia. Most of my work focuses on computational statistics, in particular approximate Bayesian inference for models where exact computation isn't feasible. The applications I have worked on are mostly spatio-temporal modelling and quantile regression, and more recently uncertainty quantification. I've also started to take an interest in Bayesian deep learning."

const PARA_2 =
  "I've worked as a software engineer on clinical software for cancer sample analysis and its integration with AI-based systems, and on neural networks applied to satellite imagery to predict construction sites."

const AREAS = [
  { label: "Bayesian computation", items: "MCMC, INLA, EM algorithm, approximate inference" },
  {
    label: "Statistical modelling",
    items: "Spatio-temporal models, quantile regression, uncertainty quantification",
  },
  {
    label: "Computing",
    items: "Algorithms and data structures, parallel computing, databases, systems",
  },
]

export default function About() {
  return (
    <>
      <section className="rise-2 mx-auto max-w-[900px] px-6 sm:px-8">
        <div className="grid gap-6 border-t border-rule pt-10 sm:grid-cols-[168px_1fr]">
          <h2 className="pt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
            About
          </h2>
          <div>
            <p className="max-w-[62ch] text-pretty text-[16px] leading-[1.68] text-ink2 sm:text-[16.5px]">
              {PARA_1}
            </p>
            <p className="mt-5 max-w-[62ch] text-pretty text-[16px] leading-[1.68] text-ink2 sm:text-[16.5px]">
              {PARA_2}
            </p>
          </div>
        </div>
      </section>

      <section className="rise-3 mx-auto max-w-[900px] px-6 pt-10 sm:px-8">
        <div className="grid gap-8 border-t border-rule pt-[22px] sm:grid-cols-3">
          {AREAS.map((area) => (
            <div key={area.label} className="flex flex-col gap-[7px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
                {area.label}
              </span>
              <span className="text-sm leading-[1.6] text-ink2">{area.items}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

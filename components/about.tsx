const PARA_1 =
  "I study Statistics at the National University of Colombia, with graduation expected in December 2026. I have completed the academic requirements for Systems and Computer Science Engineering at the same university, with degree conferral pending."

const PARA_2 =
  "As a research assistant in the Department of Statistics, I work on approximate Bayesian inference, spatial and spatio-temporal modelling, hierarchical and survey quantile regression, and uncertainty quantification in machine learning. I develop open-source R and Python software and am also interested in Bayesian deep learning and high-performance computing."

const PARA_3 =
  "I've also worked as a software engineer, developing backend services and frontend components for clinical software supporting cancer patient data processing, and computer vision models for construction site analysis using satellite imagery."

const AREAS = [
  { label: "Bayesian computation", items: "MCMC, INLA, EM, approximate inference, Full Bayesian Significance Test (FBST)" },
  {
    label: "Statistical modelling",
    items: "Spatial and spatio-temporal models, hierarchical and survey quantile regression, machine learning, uncertainty quantification",
  },
  {
    label: "Computing",
    items: "R, Python, C++, SQL, LaTeX; Git, Docker, Linux; algorithms, databases, parallel computing and multithreading",
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
            <p className="mt-5 max-w-[62ch] text-pretty text-[16px] leading-[1.68] text-ink2 sm:text-[16.5px]">
              {PARA_3}
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
        <p className="mt-6 text-sm leading-[1.6] text-ink2">
          <span className="mr-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
            Languages
          </span>
          Spanish (native) · English (C1)
        </p>
      </section>
    </>
  )
}

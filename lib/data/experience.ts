export type OrgKey = "unal" | "ic"

export interface Job {
  org: OrgKey
  kind: "research" | "teaching" | "engineering"
  period: string
  title: string
  summary: string
}

export interface Education {
  org: OrgKey
  period: string
  degree: string
}

export interface ExperienceUI {
  title: string
  education: string
  orgRange: Record<OrgKey, string>
}

export const ORGS: Record<OrgKey, string> = {
  unal: "National University of Colombia",
  ic: "Impossible Code"
};

export const JOBS: Job[] = [
  {
    org: "unal", kind: "teaching", period: "Jan 2026 – Present",
    title: "Teaching Assistant — Statistics II",
    summary: "Teaching multiple linear regression, regularisation with ridge and lasso, model selection by cross-validation, logistic and Poisson regression, tree-based methods, explainable AI and uncertainty quantification, together with probabilistic sampling, covering both the mathematical theory and its implementation in Python and R, for a course of over 120 undergraduate students."
  },
  {
    org: "ic", kind: "engineering", period: "Nov 2025 – Aug 2026",
    title: "Software Engineer",
    summary: "Built frontend and backend components for clinical software used by medical teams: database schema updates integrated with existing clinical data models, concurrency control for multi-user workflows, and a disease ontology for structured cancer sample classification. I also architected the integration with external AI-based software for protein-level cancer analysis."
  },
  {
    org: "unal", kind: "teaching", period: "Mar 2025 – Jul 2025",
    title: "Teaching Assistant — Introduction to AI",
    summary: "Taught machine learning, deep learning, NLP and AI agents in Python to over 90 undergraduate students, designing materials and assignments on tree-based algorithms, CNNs, RNNs, Transformers and GANs, and supporting students through labs, code reviews and conceptual explanations."
  },
  {
    org: "unal", kind: "research", period: "Sep 2023 – Present",
    title: "Research Assistant — Statistics Department",
    summary: "Bayesian spatial and spatio-temporal modelling of environmental contamination and public health outcomes, sensitivity analysis of Bayesian quantile regression applied to educational data, and spatio-temporal modelling of violence patterns across Colombian municipalities, working with interdisciplinary teams."
  }
];

export const EDUCATION: Education[] = [
  {
    org: "unal", period: "2021 – 2026",
    degree: "Bachelor of Systems and Computer Science Engineering"
  },
  {
    org: "unal", period: "2022 – Present",
    degree: "Bachelor of Statistics"
  }
];

export const UI: ExperienceUI = {
  title: "Experience",
  education: "Education",
  orgRange: { unal: "2023 – Present", ic: "2025 – 2026" },
}

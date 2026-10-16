export type OrgKey = "kaust" | "unal" | "ic"

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
  details?: string
}

export interface ExperienceUI {
  title: string
  education: string
  educationGpa: string
  orgRange: Record<OrgKey, string>
}

export const ORGS: Record<OrgKey, string> = {
  kaust: "King Abdullah University of Science and Technology (KAUST)",
  unal: "National University of Colombia",
  ic: "Impossible Code"
};

export const ORG_LOCATIONS: Record<OrgKey, string> = {
  kaust: "Thuwal, Saudi Arabia",
  unal: "Medellín, Colombia",
  ic: "Medellín, Colombia"
};

export const JOBS: Job[] = [
  {
    org: "kaust", kind: "research", period: "Nov 2026 – Apr 2027",
    title: "Visiting Research Student (VSRP)",
    summary: "BAYESCOMP — Bayesian Computational Statistics and Modeling Research Group. Faculty host: Prof. Håvard Rue."
  },
  {
    org: "unal", kind: "research", period: "Sep 2023 – Nov 2026",
    title: "Research Assistant — Department of Statistics",
    summary: "Research with Prof. Johnatan Cardona Jiménez on Bayesian spatial and spatio-temporal modeling, hierarchical and survey quantile regression, FBST, and uncertainty quantification in machine learning. Collaborated with faculty in statistics, geology, and political science, as well as graduate students; co-authored manuscripts and preprints, developed open-source R and Python software, and contributed to a successful grant proposal on spatio-temporal air pollution modeling in the Aburrá Valley."
  },
  {
    org: "unal", kind: "teaching", period: "Feb 2026 – Nov 2026",
    title: "Teaching Assistant — Statistics II",
    summary: "Developed R and Python teaching materials and led tutorials on regression, model assessment, regularization, cross-validation, and explainable AI for over 120 undergraduate students."
  },
  {
    org: "unal", kind: "teaching", period: "Mar 2025 – Jun 2025",
    title: "Teaching Assistant — Introduction to AI",
    summary: "Developed Python-based teaching materials and delivered practical sessions on machine learning, deep learning, NLP, and generative AI for over 90 undergraduate students."
  },
  {
    org: "ic", kind: "engineering", period: "Nov 2025 – Sep 2026",
    title: "Software Engineer",
    summary: "Developed backend services with FastAPI and Flask and frontend components with Vue.js, using SQL and NoSQL databases. Supported cancer patient data processing in M-Code, managed concurrent requests to prevent race conditions, and collaborated with physicians across specialties. Also developed computer vision models in Python for predictive analysis of construction sites using satellite imagery."
  }
];

export const EDUCATION: Education[] = [
  {
    org: "unal", period: "Feb 2021 – Dec 2026 (expected)",
    degree: "B.Sc. in Statistics"
  },
  {
    org: "unal", period: "2021 – 2026",
    degree: "B.Eng. in Systems and Computer Science Engineering",
    details: "Academic requirements completed; degree conferral pending."
  }
];

export const UI: ExperienceUI = {
  title: "Experience",
  education: "Education",
  educationGpa: "Cumulative GPA: 4.7/5.0",
  orgRange: { kaust: "2026 – 2027", unal: "2023 – 2026", ic: "2025 – 2026" },
}

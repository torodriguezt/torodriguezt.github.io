export interface Paper {
  title: string
  description: string
  collaborators: string
  status: string
  journal?: string
  link?: string
  linkLabel?: string
  tags: string[]
}

export interface Presentation {
  topic: string
  type: string
}

export interface Conference {
  name: string
  location: string
  date?: string
  presentations: Presentation[]
}

export interface ConferenceYear {
  year: string
  conferences: Conference[]
}

export const PAPERS: Paper[] = [
  {
    title: "Violence Against Women in Colombia: A Bayesian Analysis Approach to a Wicked Policy Problem",
    description: "A Bayesian multinomial logistic model examines multiple typologies of violence against women using Colombian administrative records of non-lethal injuries from 2015–2024. Bayesian ANOVA assesses the relative contributions of explanatory dimensions, accounting for uncertainty and supporting context-sensitive public decision-making within Colombia’s normative framework.",
    collaborators: "Authors: Patiño A, Seguro V, Ruiz S, Castañeda X, Hernández M, Cardona J, Rodríguez T",
    status: "Accepted",
    journal: "Social Sciences & Humanities Open",
    link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6555980",
    linkLabel: "SSRN preprint",
    tags: ["Bayesian Statistics", "Multinomial", "Bayesian ANOVA", "Public Health", "Social Science"]
  },
  {
    title: "bayesQRsurvey: Bayesian Quantile Regression Approach for Complex Survey Data in R",
    description: "The bayesQRsurvey R package implements Bayesian quantile regression for complex surveys under informative sampling using survey-weighted pseudo-likelihoods. It supports single- and multiple-output models with MCMC and expectation–maximization routines implemented in C++ through Rcpp. The article illustrates posterior summaries, convergence assessment, and predictive analyses with real survey data.",
    collaborators: "Authors: Rodríguez T, Cardona J, Nascimento ML, Gonçalves KCM",
    status: "Revising for resubmission",
    journal: "Journal of Statistical Software",
    tags: ["R", "C++", "Bayesian", "Quantile Regression", "Survey Statistics"]
  },
  {
    title: "Scalable Bayesian Quantile Regression via EM and INLA: The EM-INLA Algorithm",
    description: "EM-INLA combines expectation–maximization with INLA for empirical-Bayes hierarchical quantile regression, approximating posterior marginals conditional on estimated hyperparameters without MCMC sampling. Simulations show accuracy comparable to Hamiltonian Monte Carlo with speedups of 15 to over 50 times. An application uses over 400,000 records from Colombia’s 2023 Saber 11 examination.",
    collaborators: "Authors: Rodríguez T, Cardona J",
    status: "Preprint",
    link: "https://arxiv.org/abs/2607.10432",
    linkLabel: "arXiv",
    tags: ["Bayesian Statistics", "Quantile Regression", "EM", "INLA", "Scalable Inference"]
  },
  {
    title: "The changing contribution of a shared neighbourhood pattern to reported sexual and non-sexual violence against women and girls in Medellín, Colombia, 2018–2022",
    description: "A Bayesian shared-component model analyzes 46,390 notifications of suspected violence against women and girls across 285 Medellín neighbourhoods. During COVID-19 restrictions, a common spatial pattern contributed more strongly to sexual and non-sexual violence notifications, widening neighbourhood gradients. In 2022, only the non-sexual loading remained clearly above its pre-pandemic level; sensitivity analyses retained the direction of these changes.",
    collaborators: "Authors: Rodríguez T, Patiño A, Ruiz S, Cardona J",
    status: "In preparation",
    tags: ["Bayesian Statistics", "Spatio-temporal", "COVID-19", "Public Health", "Urban Analytics"]
  },
  {
    title: "Adaptive Bayesian Evidence for Binary Pretest–Posttest Data Observed Through Marginal Totals",
    description: "A Bayesian test compares pretest–posttest proportions from marginal counts using a composite likelihood and a bivariate beta prior. A closed-form normalizing constant enables Full Bayesian Significance Test (FBST) evidence and an adaptive cutoff that minimizes the sum of prior-averaged type-I and type-II error probabilities. A vaping-prevention application examines unlinked responses and changing sample composition.",
    collaborators: "Authors: Patiño A, Cardona J, Rodríguez T",
    status: "In preparation",
    tags: ["Bayesian Statistics", "FBST", "Composite Likelihood", "Pretest–Posttest", "Public Health"]
  },
  {
    title: "Bayesian Modelling for Contamination in Geoscientific Applications",
    description: "Bayesian spatial model for environmental contamination using MCMC, EM algorithms, and Variational Bayes inference methods applied to geoscientific data.",
    collaborators: "With Johnatan Cardona Jiménez PhD, María Clara Lucía Zuluaga Vélez PhD, Francisco Javier Rodríguez Córtez PhD",
    status: "In preparation",
    tags: ["Bayesian Statistics", "MCMC", "EM", "Variational Bayes", "Geoscience"]
  }
];

export interface Grant {
  years: string
  title: string
  role: string
  director: string
  sponsor: string
  amount: string
}

export const GRANTS: Grant[] = [
  {
    years: "2026 – 2027",
    title: "Spatio-Temporal Modeling of High Quantiles of PM₂.₅ Pollution in the Aburrá Valley",
    role: "Proposal author",
    director: "Johnatan Cardona Jiménez PhD",
    sponsor: "National University of Colombia, Medellín (HERMES Project 4275)",
    amount: "USD $15,800",
  },
]

export const CONFERENCES: ConferenceYear[] = [
  {
    year: "2026",
    conferences: [
      {
        name: "GEOMED 2026",
        location: "Pamplona, Spain",
        date: "27 June 2026",
        presentations: [
          { topic: "Bivariate spatial analysis of sexual and non-sexual violence against women in Colombia", type: "Poster" },
          { topic: "Spatial Bayesian Modeling and Assessment of Posterior Approximation Algorithms", type: "Poster" }
        ]
      }
    ]
  },
  {
    year: "2025",
    conferences: [
      {
        name: "2nd Latin American Conference on Spatio-Temporal Modelling (METMA LATAM II)",
        location: "Barranquilla, Colombia",
        date: "27 June 2025",
        presentations: [
          { topic: "Bayesian Spatio-Temporal Modeling of Gender-Based Violence: The Case of Medellín, Colombia", type: "Poster" }
        ]
      },
      {
        name: "IV Colombian Congress of Statistics",
        location: "Bogotá, Colombia",
        date: "27 May 2025",
        presentations: [
          { topic: "Bayesian Quantile Regression Applied to Colombia's Saber 11 Exam Data", type: "Talk" },
          { topic: "Analytical Tools for the Study of Gender-Based Violence and Its Impact on the Mental Health of Women and Girls in Colombia", type: "Talk" }
        ]
      }
    ]
  },
  {
    year: "2024",
    conferences: [
      {
        name: "2024 ISBA World Meeting",
        location: "Venice, Italy",
        date: "1 July 2024",
        presentations: [
          { topic: "Bayesian Analysis of Geochemical Risk in the Province of Huelva, Spain", type: "Poster" },
          { topic: "Bayesian Sensitivity Analysis for Quantile Regression with an Application to Saber 11", type: "Poster" }
        ]
      }
    ]
  },
  {
    year: "2023",
    conferences: [
      {
        name: "Coloquio Nacional de Estadística",
        location: "Colombia",
        presentations: [
          { topic: "Modelling the microclimate with Gaussian processes", type: "Poster" }
        ]
      }
    ]
  }
];


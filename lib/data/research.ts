export interface Paper {
  title: string
  description: string
  collaborators: string
  status: string
  link?: string
  tags: string[]
}

export interface Presentation {
  topic: string
  type: string
}

export interface Conference {
  name: string
  location: string
  presentations: Presentation[]
}

export interface ConferenceYear {
  year: string
  conferences: Conference[]
}

export const PAPERS: Paper[] = [
  {
    title: "Multinomial Model for Gender-Based Violence in Colombia: A Bayesian Approach to a Wicked Policy Problem",
    description: "Multinomial Bayesian model for analyzing gender-based violence patterns across Colombian municipalities, addressing the complexity and multidimensionality of violence as a wicked policy problem.",
    collaborators: "With Johnatan Cardona Jiménez PhD, Alejandra Estefanía Patiño Hoyos PhD, Simón Ruiz Martínez PhD",
    status: "Submitted to Social Sciences & Humanities Open",
    tags: ["Bayesian Statistics", "Multinomial", "Spatio-temporal", "Public Health", "Social Science"]
  },
  {
    title: "Scalable Bayesian Quantile Regression via EM and INLA: The EM-INLA Algorithm",
    description: "Scalable algorithm for Bayesian quantile regression combining EM with integrated nested Laplace approximations (INLA), reducing computational cost while preserving inferential accuracy.",
    collaborators: "With Johnatan Cardona Jiménez PhD",
    status: "Submitted to Computational Statistics & Data Analysis",
    link: "https://arxiv.org/abs/2607.10432",
    tags: ["Bayesian Statistics", "Quantile Regression", "EM", "INLA", "Scalable Inference"]
  },
  {
    title: "bayesQRsurvey: Bayesian Quantile Regression Approach for Complex Survey Data in R",
    description: "Software paper presenting bayesQRsurvey, an R package implementing Bayesian quantile regression under informative sampling designs using MCMC and EM algorithms with a C++ backend.",
    collaborators: "With Johnatan Cardona Jiménez PhD, Kelly Christina Mota Gonçalves PhD, Marcus Lavagnole Nascimiento PhD",
    status: "Submitted to Journal of Statistical Software",
    tags: ["R", "C++", "Bayesian", "Quantile Regression", "Survey Statistics"]
  },
  {
    title: "Dynamic spatial coupling of violence against women in Medellín during the COVID-19 lockdown",
    description: "Spatio-temporal Bayesian model assessing how patterns of violence against women became spatially coupled across the neighbourhoods of Medellín during the COVID-19 lockdown.",
    collaborators: "With Johnatan Cardona Jiménez PhD, Alejandra Estefanía Patiño Hoyos PhD, Simón Ruiz Martínez PhD",
    status: "In preparation",
    tags: ["Bayesian Statistics", "Spatio-temporal", "COVID-19", "Public Health", "Urban Analytics"]
  },
  {
    title: "Bayesian Modelling for Contamination in Geoscientific Applications",
    description: "Bayesian spatial model for environmental contamination using MCMC, EM algorithms, and Variational Bayes inference methods applied to geoscientific data.",
    collaborators: "With Johnatan Cardona Jiménez PhD, María Clara Lucía Zuluaga Vélez PhD, Francisco Javier Rodríguez Córtez PhD",
    status: "In preparation",
    tags: ["Bayesian Statistics", "MCMC", "EM", "Variational Bayes", "Geoscience"]
  }
];

export const CONFERENCES: ConferenceYear[] = [
  {
    year: "2026",
    conferences: [
      {
        name: "GEOMED 2026",
        location: "Pamplona, Spain",
        presentations: [
          { topic: "Bivariate spatial analysis of sexual and non-sexual violence against women in Colombia", type: "Poster" },
          { topic: "Spatial Bayesian Modelling and Assessment of Posterior Approximation Algorithms", type: "Poster" }
        ]
      }
    ]
  },
  {
    year: "2025",
    conferences: [
      {
        name: "Congreso Nacional de Estadística",
        location: "Bogotá, Colombia",
        presentations: [
          { topic: "Algorithm for Bayesian quantile regression under hierarchical data", type: "Talk" },
          { topic: "Analytics tools for the study of gender-based violence in Colombia", type: "Talk" }
        ]
      },
      {
        name: "METMA II",
        location: "Barranquilla, Colombia",
        presentations: [
          { topic: "Spatio-temporal modelling of gender-based violence in Antioquia", type: "Poster" }
        ]
      }
    ]
  },
  {
    year: "2024",
    conferences: [
      {
        name: "ISBA World Meeting",
        location: "Venice, Italy",
        presentations: [
          { topic: "Modeling geochemical risk in the Huelva Province", type: "Poster" },
          { topic: "Sensitivity analysis and application of Bayesian quantile regression to Prueba Saber 11 in Antioquia", type: "Poster" }
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


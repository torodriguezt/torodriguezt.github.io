export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  title: string
  description: string
  collaborators?: string
  tags: string[]
  links: ProjectLink[]
}

export interface ProjectGroup {
  key: string
  label: string
  items: Project[]
}

export interface ProjectsUI {
  title: string
  subtitle: string
  deploymentNote: string
}

export const GROUPS: ProjectGroup[] = [
  {
    key: "opensource",
    label: "Open source",
    items: [
      {
        title: "uxplain",
        description: "Python library combining conformal prediction and explainability methods to explain how input features relate to predictive uncertainty in regression and classification.",
        collaborators: "With Verónica Seguro Varela MSc, Rafael Izbicki PhD, Johnatan Cardona Jiménez PhD",
        tags: ["Python", "Conformal Prediction", "XAI", "Uncertainty Quantification", "Machine Learning"],
        links: [
          { label: "PyPI", url: "https://pypi.org/project/uxplain/" },
          { label: "GitHub", url: "https://github.com/torodriguezt/uxplain" }
        ]
      },
      {
        title: "bayesQRsurvey",
        description: "R package for Bayesian quantile regression under informative sampling, using survey-weighted pseudo-likelihoods. Supports single- and multiple-output models, with MCMC and EM algorithms implemented in C++ through Rcpp.",
        collaborators: "With Johnatan Cardona Jiménez PhD, Marcus Lavagnole Nascimento PhD, Kelly Christina Mota Gonçalves PhD",
        tags: ["R", "C++", "Rcpp", "Bayesian", "Quantile Regression", "Survey Statistics", "MCMC", "EM"],
        links: [{ label: "CRAN", url: "https://cran.r-project.org/web/packages/bayesQRsurvey/index.html" }]
      },
      {
        title: "Statistics II — Course Materials",
        description: "Teaching materials for Statistics II at the National University of Colombia, covering multiple linear regression, regularisation and model selection, logistic and Poisson regression, tree-based methods, explainable AI, uncertainty quantification, and probabilistic sampling in Python and R.",
        tags: ["Python", "R", "Regression", "Regularisation", "Tree-based Methods", "Explainable AI", "Uncertainty Quantification", "Teaching"],
        links: [{ label: "GitHub", url: "https://github.com/torodriguezt/Estadistica-II" }]
      }
    ]
  },
  {
    key: "side",
    label: "Side projects",
    items: [
      {
        title: "Multi-label Medical Article Classification",
        description: "BERT-based multi-label and multi-class classifier for medical articles using title and abstract. Achieved an F1 score of 0.93 and Hamming loss of 0.03, earning first place in the Biomedical Literature Classification Hackathon in August 2025.",
        tags: ["Python", "BERT", "NLP", "Multi-label", "Multi-class", "Deep Learning"],
        links: [{ label: "GitHub", url: "https://github.com/torodriguezt/Clasificacion_Biomedica" }]
      },
      {
        title: "E-Commerce AI Platform",
        description: "End-to-end application combining computer vision for item classification, LSTM networks for stock prediction, and embedding-based recommendations — suggesting products based on what the user is currently browsing.",
        tags: ["Python", "Computer Vision", "LSTM", "Embeddings", "Recommendation Systems"],
        links: [
          { label: "Forecast", url: "https://github.com/RNA-y-Algo-Bioinsp-2024-02/model_forecast" },
          { label: "Recommendations", url: "https://github.com/RNA-y-Algo-Bioinsp-2024-02/model_recommendations" },
          { label: "Vision", url: "https://github.com/RNA-y-Algo-Bioinsp-2024-02/model_images" }
        ]
      },
      {
        title: "Credit Risk Classification Model",
        description: "Credit risk model for classifying borrowers into different credit risk categories along with their respective risk scores.",
        tags: ["Python", "Deep Learning", "Credit Risk", "Classification"],
        links: [{ label: "GitHub", url: "https://github.com/RNA-y-Algo-Bioinsp-2024-02/model_credit_risk" }]
      },
      {
        title: "News Intelligence Pipeline",
        description: "Classification of news articles across genres using BERT, with a generative model for automatic summary creation and LDA for latent topic discovery across the corpus.",
        tags: ["Python", "BERT", "NLP", "LDA", "Text Generation", "Topic Modeling"],
        links: []
      },
      {
        title: "FIFA World Cup Draw Fairness",
        description: "Bayesian model with simulated annealing evaluating the fairness of the FIFA World Cup group-stage draw mechanism, quantifying whether the allocation process produces balanced groups.",
        tags: ["R", "Bayesian Statistics", "Simulated Annealing", "Probability", "Sports Analytics"],
        links: [{ label: "GitHub", url: "https://github.com/torodriguezt/SABayesFIFA" }]
      },
      {
        title: "MTG Card Generator",
        description: "Diffusion model fine-tuned to generate Magic: The Gathering card artwork, exploring the creative boundaries of image generation on a highly stylized domain.",
        tags: ["Python", "Diffusion Models", "Stable Diffusion", "Generative AI"],
        links: []
      }
    ]
  }
];

export const UI: ProjectsUI = {
  title: "Projects",
  subtitle: "Bayesian models, machine learning and deep learning applications, and open-source tools.",
  deploymentNote:
    "Most of these projects were deployed on Render or Digital Ocean instances, which were later shut down due to cost.",
}

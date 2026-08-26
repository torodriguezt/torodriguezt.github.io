"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useLanguage, type Language } from "@/contexts/language-context"

interface Paper {
  collaborators: string
  status: string
  link?: string
  tags: string[]
  title: Record<Language, string>
  description: Record<Language, string>
}

const papers: Paper[] = [
  {
    collaborators: "With Johnatan Cardona Jiménez PhD, Alejandra Estefanía Patiño Hoyos PhD, Simón Ruiz Martínez PhD",
    status: "Submitted to Social Sciences & Humanities Open",
    tags: ["Bayesian Statistics", "Multinomial", "Spatio-temporal", "Public Health", "Social Science"],
    title: {
      en: "Multinomial Model for Gender-Based Violence in Colombia: A Bayesian Approach to a Wicked Policy Problem",
      es: "Modelo Multinomial para la Violencia de Género en Colombia: Un Enfoque Bayesiano a un Problema Perverso de Política Pública",
      pt: "Modelo Multinomial para Violência de Gênero na Colômbia: Uma Abordagem Bayesiana para um Problema Perverso de Política Pública",
    },
    description: {
      en: "Multinomial Bayesian model for analyzing gender-based violence patterns across Colombian municipalities, addressing the complexity and multidimensionality of violence as a wicked policy problem.",
      es: "Modelo bayesiano multinomial para analizar patrones de violencia de género en municipios colombianos, abordando la complejidad y multidimensionalidad de la violencia como un problema perverso de política pública.",
      pt: "Modelo bayesiano multinomial para analisar padrões de violência de gênero em municípios colombianos, abordando a complexidade e multidimensionalidade da violência como um problema perverso de política pública.",
    },
  },
  {
    collaborators: "With Johnatan Cardona Jiménez PhD",
    status: "Submitted to Computational Statistics & Data Analysis",
    link: "https://arxiv.org/abs/2607.10432",
    tags: ["Bayesian Statistics", "Quantile Regression", "EM", "INLA", "Scalable Inference"],
    title: {
      en: "Scalable Bayesian Quantile Regression via EM and INLA: The EM-INLA Algorithm",
      es: "Regresión Cuantílica Bayesiana Escalable vía EM e INLA: El Algoritmo EM-INLA",
      pt: "Regressão Quantílica Bayesiana Escalável via EM e INLA: O Algoritmo EM-INLA",
    },
    description: {
      en: "Scalable algorithm for Bayesian quantile regression combining EM with integrated nested Laplace approximations (INLA), reducing computational cost while preserving inferential accuracy.",
      es: "Algoritmo escalable para regresión cuantílica bayesiana que combina EM con aproximaciones de Laplace anidadas e integradas (INLA), reduciendo el costo computacional sin sacrificar la precisión inferencial.",
      pt: "Algoritmo escalável para regressão quantílica bayesiana que combina EM com aproximações de Laplace aninhadas e integradas (INLA), reduzindo o custo computacional sem sacrificar a precisão inferencial.",
    },
  },
  {
    collaborators: "With Johnatan Cardona Jiménez PhD, Kelly Christina Mota Gonçalves PhD, Marcus Lavagnole Nascimiento PhD",
    status: "Submitted to Journal of Statistical Software",
    tags: ["R", "C++", "Bayesian", "Quantile Regression", "Survey Statistics"],
    title: {
      en: "bayesQRsurvey: Bayesian Quantile Regression Approach for Complex Survey Data in R",
      es: "bayesQRsurvey: Bayesian Quantile Regression Approach for Complex Survey Data in R",
      pt: "bayesQRsurvey: Bayesian Quantile Regression Approach for Complex Survey Data in R",
    },
    description: {
      en: "Software paper presenting bayesQRsurvey, an R package implementing Bayesian quantile regression under informative sampling designs using MCMC and EM algorithms with a C++ backend.",
      es: "Artículo de software presentando bayesQRsurvey, un paquete de R que implementa regresión cuantílica bayesiana bajo diseños de muestreo informativos usando algoritmos MCMC y EM con backend en C++.",
      pt: "Artigo de software apresentando bayesQRsurvey, um pacote R que implementa regressão quantílica bayesiana sob desenhos de amostragem informativos usando algoritmos MCMC e EM com backend em C++.",
    },
  },
  {
    collaborators: "With Johnatan Cardona Jiménez PhD, Alejandra Estefanía Patiño Hoyos PhD, Simón Ruiz Martínez PhD",
    status: "In preparation",
    tags: ["Bayesian Statistics", "Spatio-temporal", "COVID-19", "Public Health", "Urban Analytics"],
    title: {
      en: "Dynamic spatial coupling of violence against women in Medellín during the COVID-19 lockdown",
      es: "Acoplamiento espacial dinámico de la violencia contra la mujer en Medellín durante el confinamiento por COVID-19",
      pt: "Acoplamento espacial dinâmico da violência contra a mulher em Medellín durante o confinamento pela COVID-19",
    },
    description: {
      en: "Spatio-temporal Bayesian model assessing how patterns of violence against women became spatially coupled across the neighbourhoods of Medellín during the COVID-19 lockdown.",
      es: "Modelo bayesiano espacio-temporal que evalúa cómo los patrones de violencia contra la mujer se acoplaron espacialmente entre los barrios de Medellín durante el confinamiento por COVID-19.",
      pt: "Modelo bayesiano espaço-temporal que avalia como os padrões de violência contra a mulher se acoplaram espacialmente entre os bairros de Medellín durante o confinamento pela COVID-19.",
    },
  },
  {
    collaborators: "With Johnatan Cardona Jiménez PhD, María Clara Lucía Zuluaga Vélez PhD, Francisco Javier Rodríguez Córtez PhD",
    status: "In preparation",
    tags: ["Bayesian Statistics", "MCMC", "EM", "Variational Bayes", "Geoscience"],
    title: {
      en: "Bayesian Modelling for Contamination in Geoscientific Applications",
      es: "Modelado Bayesiano para Contaminación en Aplicaciones Geocientíficas",
      pt: "Modelagem Bayesiana para Contaminação em Aplicações Geocientíficas",
    },
    description: {
      en: "Bayesian spatial model for environmental contamination using MCMC, EM algorithms, and Variational Bayes inference methods applied to geoscientific data.",
      es: "Modelo espacial bayesiano para contaminación ambiental usando MCMC, algoritmos EM y métodos de inferencia de Bayes Variacional aplicados a datos geocientíficos.",
      pt: "Modelo espacial bayesiano para contaminação ambiental usando MCMC, algoritmos EM e métodos de inferência de Bayes Variacional aplicados a dados geocientíficos.",
    },
  },
]

const conferencesByYear = [
  {
    year: 2026,
    conferences: [
      {
        name: "GEOMED 2026",
        location: "Pamplona, Spain",
        presentations: [
          {
            topic: "Bivariate spatial analysis of sexual and non-sexual violence against women in Colombia",
            type: "Poster",
          },
          {
            topic: "Spatial Bayesian Modelling and Assessment of Posterior Approximation Algorithms",
            type: "Poster",
          },
        ],
      },
    ],
  },
  {
    year: 2025,
    conferences: [
      {
        name: "Congreso Nacional de Estadística",
        location: "Bogotá, Colombia",
        presentations: [
          { topic: "Algorithm for Bayesian quantile regression under hierarchical data", type: "Talk" },
          { topic: "Analytics tools for the study of gender-based violence in Colombia", type: "Talk" },
        ],
      },
      {
        name: "METMA II",
        location: "Barranquilla, Colombia",
        presentations: [
          { topic: "Spatio-temporal modelling of gender-based violence in Antioquia", type: "Poster" },
        ],
      },
    ],
  },
  {
    year: 2024,
    conferences: [
      {
        name: "ISBA World Meeting",
        location: "Venice, Italy",
        presentations: [
          { topic: "Modeling geochemical risk in the Huelva Province", type: "Poster" },
          { topic: "Sensitivity analysis and application of Bayesian quantile regression to Prueba Saber 11 in Antioquia", type: "Poster" },
        ],
      },
    ],
  },
  {
    year: 2023,
    conferences: [
      {
        name: "Coloquio Nacional de Estadística",
        location: "Colombia",
        presentations: [
          { topic: "Modelling the microclimate with Gaussian processes", type: "Poster" },
        ],
      },
    ],
  },
]

type TabKey = "papers" | "conferences"

const tabLabels: Record<TabKey, Record<Language, string>> = {
  papers: { en: "Papers", es: "Artículos", pt: "Artigos" },
  conferences: { en: "Conferences", es: "Conferencias", pt: "Conferências" },
}

const tabKeys: TabKey[] = ["papers", "conferences"]

const ui = {
  en: { home: "Home", title: "Research", subtitle: "Academic papers and conference presentations." },
  es: { home: "Inicio", title: "Investigación", subtitle: "Artículos académicos y presentaciones en conferencias." },
  pt: { home: "Início", title: "Pesquisa", subtitle: "Artigos acadêmicos e apresentações em conferências." },
}

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("papers")
  const { language } = useLanguage()
  const t = ui[language]

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-16"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.home}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">{t.title}</h1>
          <p className="text-gray-600 mb-12 max-w-xl">{t.subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-14 border-b border-gray-200">
          {tabKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === key
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tabLabels[key][language]}
              {activeTab === key && (
                <motion.div
                  layoutId="researchTab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-gray-900"
                  transition={{ duration: 0.25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Papers */}
        {activeTab === "papers" && (
          <div className="space-y-0 divide-y divide-gray-200">
            {papers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="py-8 first:pt-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{paper.title[language]}</h3>
                  {paper.link ? (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-gray-900 font-mono italic underline underline-offset-2 transition-colors"
                    >
                      {paper.status}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono italic">{paper.status}</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-2 max-w-2xl">
                  {paper.description[language]}
                </p>
                <p className="text-xs text-gray-500 italic mb-3">
                  {paper.collaborators}
                </p>
                <p className="text-xs text-gray-500 font-mono">
                  {paper.tags.join(" · ")}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Conferences */}
        {activeTab === "conferences" && (
          <div className="space-y-16">
            {conferencesByYear.map((group, gi) => (
              <motion.div
                key={group.year}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: gi * 0.1 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">{group.year}</h3>

                <div className="space-y-10">
                  {group.conferences.map((conf, ci) => (
                    <div key={ci}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-4">
                        <h4 className="text-gray-900 font-medium">{conf.name}</h4>
                        <span className="text-xs text-gray-500 font-mono">{conf.location}</span>
                      </div>

                      <div className="space-y-2.5 pl-4 border-l border-gray-200">
                        {conf.presentations.map((pres, pi) => (
                          <div key={pi}>
                            <p className="text-sm text-gray-700 leading-relaxed">{pres.topic}</p>
                            <p className="text-xs text-gray-500 font-mono mt-0.5">{pres.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

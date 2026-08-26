"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage, type Language } from "@/contexts/language-context"

interface Experience {
  company: string
  period: string
  title: Record<Language, string>
  points: Record<Language, string[]>
}

const experiences: Experience[] = [
  {
    company: "Universidad Nacional de Colombia",
    period: "Jan 2026 – Present",
    title: {
      en: "Teaching Assistant — Statistics II",
      es: "Monitor — Estadística II",
      pt: "Monitor — Estatística II",
    },
    points: {
      en: [
        "Teaching multiple linear regression, logistic regression, Poisson regression, and probabilistic sampling — covering both mathematical theory and implementation in Python and R.",
        "Responsible for over 120 undergraduate students.",
      ],
      es: [
        "Enseñanza de regresión lineal múltiple, regresión logística, regresión de Poisson y muestreo probabilístico — cubriendo tanto la teoría matemática como la implementación en Python y R.",
        "Responsable de más de 120 estudiantes de pregrado.",
      ],
      pt: [
        "Ensino de regressão linear múltipla, regressão logística, regressão de Poisson e amostragem probabilística — abrangendo tanto a teoria matemática quanto a implementação em Python e R.",
        "Responsável por mais de 120 estudantes de graduação.",
      ],
    },
  },
  {
    company: "Impossible Code",
    period: "Nov 2025 – Aug 2026",
    title: {
      en: "Software Engineer",
      es: "Ingeniero de Software",
      pt: "Engenheiro de Software",
    },
    points: {
      en: [
        "Designed and implemented database schema updates integrating with existing clinical data models.",
        "Implemented concurrency control for multi-user clinical workflows.",
        "Developed a disease ontology for structured cancer sample classification.",
        "Built frontend and backend components for clinical software used by medical teams.",
        "Architected integration with external AI-based software for protein-level cancer analysis.",
      ],
      es: [
        "Diseño e implementación de actualizaciones del esquema de base de datos integrándose con modelos de datos clínicos existentes.",
        "Implementación de control de concurrencia para flujos de trabajo clínicos multiusuario.",
        "Desarrollo de una ontología de enfermedades para la clasificación estructurada de muestras de cáncer.",
        "Desarrollo de componentes frontend y backend para software clínico utilizado por equipos médicos.",
        "Diseño de la integración con software externo basado en IA para análisis de cáncer a nivel proteico.",
      ],
      pt: [
        "Projeto e implementação de atualizações do esquema de banco de dados integrando com modelos de dados clínicos existentes.",
        "Implementação de controle de concorrência para fluxos de trabalho clínicos multiusuário.",
        "Desenvolvimento de uma ontologia de doenças para classificação estruturada de amostras de câncer.",
        "Desenvolvimento de componentes frontend e backend para software clínico utilizado por equipes médicas.",
        "Projeto da integração com software externo baseado em IA para análise de câncer a nível proteico.",
      ],
    },
  },
  {
    company: "Universidad Nacional de Colombia",
    period: "Mar 2025 – Jul 2025",
    title: {
      en: "Teaching Assistant — Introduction to AI",
      es: "Monitor — Introducción a la IA",
      pt: "Monitor — Introdução à IA",
    },
    points: {
      en: [
        "Taught machine learning, deep learning, NLP, and AI agents in Python to over 90 undergraduate students.",
        "Designed materials and assignments covering tree-based algorithms, CNNs, RNNs, Transformers, and GANs.",
        "Provided support through labs, code reviews, and conceptual explanations.",
      ],
      es: [
        "Enseñanza de aprendizaje automático, aprendizaje profundo, PLN y agentes de IA en Python a más de 90 estudiantes de pregrado.",
        "Diseño de materiales y tareas sobre algoritmos basados en árboles, CNNs, RNNs, Transformers y GANs.",
        "Apoyo a través de laboratorios, revisiones de código y explicaciones conceptuales.",
      ],
      pt: [
        "Ensino de aprendizado de máquina, aprendizado profundo, PLN e agentes de IA em Python para mais de 90 estudantes de graduação.",
        "Projeto de materiais e atividades sobre algoritmos baseados em árvores, CNNs, RNNs, Transformers e GANs.",
        "Suporte através de laboratórios, revisões de código e explicações conceituais.",
      ],
    },
  },
  {
    company: "Universidad Nacional de Colombia",
    period: "Sep 2023 – Present",
    title: {
      en: "Research Assistant — Statistics Department",
      es: "Asistente de Investigación — Departamento de Estadística",
      pt: "Assistente de Pesquisa — Departamento de Estatística",
    },
    points: {
      en: [
        "Bayesian spatial and spatio-temporal modelling of environmental contamination and public health outcomes.",
        "Sensitivity analysis of Bayesian quantile regression models applied to educational data.",
        "Spatio-temporal modelling of violence patterns across Colombian municipalities.",
        "Collaborating with interdisciplinary teams on data-driven research projects.",
      ],
      es: [
        "Modelado bayesiano espacial y espacio-temporal de contaminación ambiental y resultados de salud pública.",
        "Análisis de sensibilidad de modelos de regresión cuantílica bayesiana aplicados a datos educativos.",
        "Modelado espacio-temporal de patrones de violencia en municipios colombianos.",
        "Colaboración con equipos interdisciplinarios en proyectos de investigación basados en datos.",
      ],
      pt: [
        "Modelagem bayesiana espacial e espaço-temporal de contaminação ambiental e resultados de saúde pública.",
        "Análise de sensibilidade de modelos de regressão quantílica bayesiana aplicados a dados educacionais.",
        "Modelagem espaço-temporal de padrões de violência em municípios colombianos.",
        "Colaboração com equipes interdisciplinares em projetos de pesquisa baseados em dados.",
      ],
    },
  },
]

interface Education {
  institution: string
  period: string
  degree: Record<Language, string>
}

const education: Education[] = [
  {
    institution: "Universidad Nacional de Colombia",
    period: "2021 – 2026",
    degree: {
      en: "Bachelor of Systems and Computer Science Engineering",
      es: "Pregrado en Ingeniería de Sistemas e Informática",
      pt: "Bacharelado em Engenharia de Sistemas e Informática",
    },
  },
  {
    institution: "Universidad Nacional de Colombia",
    period: "2022 – Present",
    degree: {
      en: "Bachelor of Statistics",
      es: "Pregrado en Estadística",
      pt: "Bacharelado em Estatística",
    },
  },
]

const ui = {
  en: { home: "Home", title: "Experience", education: "Education" },
  es: { home: "Inicio", title: "Experiencia", education: "Educación" },
  pt: { home: "Início", title: "Experiência", education: "Educação" },
}

export default function ExperiencePage() {
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
          <h1 className="text-4xl font-semibold text-gray-900 mb-16">{t.title}</h1>
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="text-lg font-medium text-gray-900">{exp.title[language]}</h3>
                <span className="text-sm text-gray-500 font-mono">{exp.period}</span>
              </div>

              <p className="text-gray-600 text-sm mb-5">{exp.company}</p>

              <ul className="space-y-2.5">
                {exp.points[language].map((point, i) => (
                  <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                    <span className="text-gray-400 select-none shrink-0">–</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-24 pt-12 border-t border-gray-200"
        >
          <h2 className="text-xs font-medium text-gray-500 uppercase tracking-widest font-mono mb-10">
            {t.education}
          </h2>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-lg font-medium text-gray-900">{edu.degree[language]}</h3>
                  <span className="text-sm text-gray-500 font-mono">{edu.period}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{edu.institution}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

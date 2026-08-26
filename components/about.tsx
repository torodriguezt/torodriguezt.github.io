"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

const ui = {
  en: {
    title: "About",
    bio1: 'I work at the intersection of Bayesian statistics and machine learning. Most recently a Software Engineer at <strong>Impossible Code</strong>, where I built clinical software for cancer sample analysis and architected its integration with AI-based systems.',
    bio2: "I completed a degree in <strong>Systems and Computer Science Engineering</strong> and am finishing a second degree in <strong>Statistics</strong> at Universidad Nacional de Colombia, where my research focuses on spatio-temporal Bayesian models applied to environmental science, public health, and education.",
    bio3: "My interests span machine learning, deep learning, Bayesian statistics, and spatio-temporal modeling. Outside of work, I watch movies, read books, and practice photography.",
    skillBayesian: "Bayesian Statistics",
    skillBayesianContent: "R, C++, Stan, MCMC, EM, Variational Bayes, Spatio-temporal Models, INLA",
    skillML: "Machine Learning & DL",
    skillMLContent: "Python, Hugging Face, LSTM, Diffusion Models, Computer Vision, NLP",
    skillSE: "Software Engineering",
    skillSEContent: "TypeScript, SQL, Docker, Jinja, Next.js, Git, REST APIs",
    languagesTitle: "Languages",
    languagesContent: "Spanish (Native) · English (B2, FCE)",
  },
  es: {
    title: "Acerca",
    bio1: 'Trabajo en la intersección de la estadística bayesiana y el aprendizaje automático. Más recientemente fui Ingeniero de Software en <strong>Impossible Code</strong>, donde desarrollé software clínico para análisis de muestras de cáncer y diseñé su integración con sistemas basados en IA.',
    bio2: "Terminé mi pregrado en <strong>Ingeniería de Sistemas e Informática</strong> y actualmente curso un segundo pregrado en <strong>Estadística</strong> en la Universidad Nacional de Colombia, donde mi investigación se centra en modelos bayesianos espacio-temporales aplicados a ciencias ambientales, salud pública y educación.",
    bio3: "Mis intereses abarcan aprendizaje automático, aprendizaje profundo, estadística bayesiana y modelado espacio-temporal. Fuera del trabajo, veo películas, leo libros y practico fotografía.",
    skillBayesian: "Estadística Bayesiana",
    skillBayesianContent: "R, C++, Stan, MCMC, EM, Bayes Variacional, Modelos Espacio-temporales, INLA",
    skillML: "Aprendizaje Automático y Profundo",
    skillMLContent: "Python, Hugging Face, LSTM, Modelos de Difusión, Visión por Computadora, PLN",
    skillSE: "Ingeniería de Software",
    skillSEContent: "TypeScript, SQL, Docker, Jinja, Next.js, Git, APIs REST",
    languagesTitle: "Idiomas",
    languagesContent: "Español (Nativo) · Inglés (B2, FCE)",
  },
  pt: {
    title: "Sobre",
    bio1: 'Trabalho na interseção entre estatística bayesiana e aprendizado de máquina. Mais recentemente fui Engenheiro de Software na <strong>Impossible Code</strong>, onde desenvolvi software clínico para análise de amostras de câncer e projetei sua integração com sistemas baseados em IA.',
    bio2: "Concluí minha graduação em <strong>Engenharia de Sistemas e Informática</strong> e atualmente curso uma segunda graduação em <strong>Estatística</strong> na Universidad Nacional de Colombia, onde minha pesquisa foca em modelos bayesianos espaço-temporais aplicados a ciências ambientais, saúde pública e educação.",
    bio3: "Meus interesses abrangem aprendizado de máquina, aprendizado profundo, estatística bayesiana e modelagem espaço-temporal. Fora do trabalho, assisto filmes, leio livros e pratico fotografia.",
    skillBayesian: "Estatística Bayesiana",
    skillBayesianContent: "R, C++, Stan, MCMC, EM, Bayes Variacional, Modelos Espaço-temporais, INLA",
    skillML: "Aprendizado de Máquina e Profundo",
    skillMLContent: "Python, Hugging Face, LSTM, Modelos de Difusão, Visão Computacional, PLN",
    skillSE: "Engenharia de Software",
    skillSEContent: "TypeScript, SQL, Docker, Jinja, Next.js, Git, APIs REST",
    languagesTitle: "Idiomas",
    languagesContent: "Espanhol (Nativo) · Inglês (B2, FCE)",
  },
}

export default function About() {
  const { language } = useLanguage()
  const t = ui[language]

  return (
    <section id="about" className="px-6 sm:px-8 lg:px-16 pb-32">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest font-mono mb-12">
            {t.title}
          </h2>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Text */}
            <div className="lg:col-span-2 space-y-6">
              <p
                className="text-gray-700 text-lg leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-medium"
                dangerouslySetInnerHTML={{ __html: t.bio1 }}
              />
              <p
                className="text-gray-700 text-lg leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-medium"
                dangerouslySetInnerHTML={{ __html: t.bio2 }}
              />
              <p className="text-gray-600 leading-relaxed">
                {t.bio3}
              </p>
            </div>

            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/perfil.jpg`}
                  alt="Tomás Rodríguez"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-gray-200">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest font-mono mb-4">
                {t.skillBayesian}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.skillBayesianContent}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest font-mono mb-4">
                {t.skillML}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.skillMLContent}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest font-mono mb-4">
                {t.skillSE}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.skillSEContent}
              </p>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest font-mono mb-4">
              {t.languagesTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.languagesContent}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

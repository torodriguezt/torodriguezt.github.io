"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage, type Language } from "@/contexts/language-context"

const navLinks = (language: Language) => [
  { href: "/experience", label: { en: "Experience", es: "Experiencia", pt: "Experiência" }[language] },
  { href: "/projects", label: { en: "Projects", es: "Proyectos", pt: "Projetos" }[language] },
  { href: "/research", label: { en: "Research", es: "Investigación", pt: "Pesquisa" }[language] },
  { href: "/awards", label: { en: "Awards", es: "Premios", pt: "Prêmios" }[language] },
]

const content = {
  en: {
    tagline:
      "My work focuses on developing models and software at the intersection of Bayesian statistics and machine learning, with applications ranging from spatio-temporal systems to deep learning.",
    bio: "I worked as a Software Engineer at <strong>Impossible Code</strong>, building clinical software for cancer sample analysis. I completed a degree in <strong>Systems and Computer Science Engineering</strong> and am finishing a second degree in <strong>Statistics</strong> at Universidad Nacional de Colombia.",
    interestsLabel: "Interests",
    interests: "Bayesian statistics · Machine learning · Deep learning · Spatio-temporal modeling",
    location: "Medellín, Colombia",
  },
  es: {
    tagline:
      "Mi trabajo se enfoca en desarrollar modelos y software en la intersección de la estadística bayesiana y el aprendizaje automático, con aplicaciones que van desde sistemas espacio-temporales hasta aprendizaje profundo.",
    bio: "Trabajé como Ingeniero de Software en <strong>Impossible Code</strong>, donde desarrollé software clínico para análisis de muestras de cáncer. Terminé mi pregrado en <strong>Ingeniería de Sistemas e Informática</strong> y actualmente curso un segundo pregrado en <strong>Estadística</strong> en la Universidad Nacional de Colombia.",
    interestsLabel: "Intereses",
    interests: "Estadística bayesiana · Aprendizaje automático · Aprendizaje profundo · Modelado espacio-temporal",
    location: "Medellín, Colombia",
  },
  pt: {
    tagline:
      "Meu trabalho foca no desenvolvimento de modelos e software na interseção entre estatística bayesiana e aprendizado de máquina, com aplicações que vão de sistemas espaço-temporais ao aprendizado profundo.",
    bio: "Trabalhei como Engenheiro de Software na <strong>Impossible Code</strong>, onde desenvolvi software clínico para análise de amostras de câncer. Concluí minha graduação em <strong>Engenharia de Sistemas e Informática</strong> e atualmente curso uma segunda graduação em <strong>Estatística</strong> na Universidad Nacional de Colombia.",
    interestsLabel: "Interesses",
    interests: "Estatística bayesiana · Aprendizado de máquina · Aprendizado profundo · Modelagem espaço-temporal",
    location: "Medellín, Colômbia",
  },
}

export default function Hero() {
  const { language } = useLanguage()
  const text = content[language]
  const links = navLinks(language)

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 sm:px-8 lg:px-16 py-32">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start"
        >
          {/* Left column — text */}
          <div>
            <h1 className="text-5xl sm:text-6xl font-light tracking-normal text-gray-900">
              Tom{"á"}s Rodr{"í"}guez
            </h1>

            <div className="w-12 h-px bg-gray-200 my-8" />

            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed">
              {text.tagline}
            </p>

            <p
              className="mt-6 text-base text-gray-600 leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: text.bio }}
            />

            {/* Interests */}
            <div className="mt-10">
              <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest font-mono mb-2">
                {text.interestsLabel}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {text.interests}
              </p>
            </div>

            {/* Navigation links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-900 transition-colors border-b border-gray-300 hover:border-gray-900 pb-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Contact line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-8 text-sm text-gray-500 font-mono">
              <span>{text.location}</span>
              <span className="text-gray-300">·</span>
              <a
                href="mailto:torodriguezt@unal.edu.co"
                className="hover:text-gray-900 transition-colors"
              >
                torodriguezt@unal.edu.co
              </a>
            </div>
          </div>

          {/* Right column — photo */}
          <div className="order-first lg:order-last w-40 lg:w-full">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/perfil.jpg`}
                alt="Tomás Rodríguez"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

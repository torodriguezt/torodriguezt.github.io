"use client"

import { motion } from "framer-motion"

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest font-mono mb-16">
            Experience
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
            <h3 className="text-lg font-medium text-gray-900">Software Engineer</h3>
            <span className="text-sm text-gray-400 font-mono">Nov 2025 – Aug 2026</span>
          </div>

          <p className="text-gray-500 text-sm mb-5">Impossible Code</p>

          <ul className="space-y-2.5">
            {[
              "Designed and implemented database schema updates integrating with existing clinical data models.",
              "Implemented concurrency control for multi-user clinical workflows.",
              "Developed a disease ontology for structured cancer sample classification.",
              "Built frontend and backend components for clinical software used by medical teams.",
              "Architected integration with external AI-based software for protein-level cancer analysis.",
            ].map((point, i) => (
              <li key={i} className="flex gap-3 text-gray-500 text-sm leading-relaxed">
                <span className="text-gray-300 select-none shrink-0">–</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

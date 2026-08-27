"use client"

import { useEffect, useState } from "react"

const EMAIL = "torodriguezt@unal.edu.co"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      // Clipboard blocked (insecure context, permissions): fall back to mail.
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section className="rise-3 mx-auto max-w-[900px] px-6 pt-16 sm:px-8">
      <div className="flex flex-col items-center border-t border-rule pt-20 text-center">
        <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-ink sm:text-[40px]">
          Let&rsquo;s talk.
        </h2>

        <p className="mt-4 max-w-[46ch] text-pretty text-[16.5px] leading-[1.65] text-ink2">
          Have an idea, want to collaborate, or just feel like saying hi?
        </p>

        <button
          onClick={copyEmail}
          aria-label={`Copy my email address, ${EMAIL}`}
          title={EMAIL}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-paper transition-opacity hover:opacity-[0.86]"
        >
          {copied ? "Email copied" : "Get in touch"}
          <span className="font-mono">{copied ? "✓" : "→"}</span>
        </button>

        {/* Reserved so the layout doesn't shift when the confirmation appears. */}
        <p
          aria-live="polite"
          className={`mt-4 h-5 font-mono text-[12.5px] transition-opacity duration-200 ${
            copied ? "text-brand opacity-100" : "opacity-0"
          }`}
        >
          {copied ? `${EMAIL} copied to your clipboard` : ""}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[14px]">
          <a
            href="https://github.com/torodriguezt"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent pb-0.5 text-ink2 transition-colors hover:border-brand hover:text-ink"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/tomasrodriguezt"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent pb-0.5 text-ink2 transition-colors hover:border-brand hover:text-ink"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

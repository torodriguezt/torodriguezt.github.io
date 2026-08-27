"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/awards", label: "Awards" },
  { href: "/blog", label: "Blog" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, mounted, toggleTheme } = useTheme()
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--bg) 85%, transparent)" }}
    >
      <div className="mx-auto flex max-w-[900px] items-baseline justify-between gap-6 px-6 py-[22px] sm:px-8">
        <Link
          href="/"
          className="text-[14.5px] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-brand"
        >
          Tom{"á"}s Rodr{"í"}guez Taborda
        </Link>

        <nav className="flex items-baseline gap-[22px]">
          <div className="hidden items-baseline gap-[22px] md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b pb-0.5 text-[13.5px] transition-colors ${
                  isActive(link.href)
                    ? "border-brand text-ink"
                    : "border-transparent text-ink2 hover:border-brand hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="pb-0.5 text-sm leading-none text-dim transition-colors hover:text-brand"
          >
            {mounted ? (theme === "dark" ? "☀" : "☽") : " "}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-dim transition-colors hover:text-brand md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-rule bg-paper md:hidden"
          >
            <div className="mx-auto max-w-[900px] px-6 py-4 sm:px-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm transition-colors ${
                    isActive(link.href) ? "text-brand" : "text-ink2 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

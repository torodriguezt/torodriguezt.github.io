"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  /** false until the client has read the stored theme, so the toggle can stay neutral. */
  mounted: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  mounted: false,
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Must match the attribute app/layout.tsx renders and the fallback in its
  // blocking script: all three are the same default in three places.
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  // The blocking script in app/layout.tsx has already written data-theme, so we
  // read it back instead of re-deciding and repainting.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme")
    if (attr === "light" || attr === "dark") setTheme(attr)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    try {
      localStorage.setItem("tr-theme", next)
    } catch {
      /* private mode: the choice just doesn't persist */
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

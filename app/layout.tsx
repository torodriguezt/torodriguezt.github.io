import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "katex/dist/katex.min.css"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/contexts/theme-context"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Tomás Rodríguez Taborda | Computational Statistics",
  description:
    "Tomás Rodríguez Taborda — computational statistics and Bayesian computation: approximate inference, spatio-temporal models, quantile regression, and the software around them.",
}

// Runs before first paint so the stored theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('tr-theme');document.documentElement.setAttribute('data-theme',t==='light'||t==='dark'?t:'light')}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning: the script below rewrites data-theme before
    // React hydrates, so with a stored light theme the attribute legitimately
    // differs from the one rendered here. Suppressing it covers this element's
    // own attributes only — mismatches anywhere else still surface.
    <html lang="en" data-theme="light" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${jakarta.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

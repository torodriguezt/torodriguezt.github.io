import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Design tokens (see app/globals.css). Deliberately named apart from
        // the shadcn scale below so both can coexist.
        paper: "var(--bg)",
        panel: "var(--panel)",
        ink: "var(--fg)",
        ink2: "var(--fg2)",
        dim: "var(--dim)",
        rule: "var(--line)",
        brand: "var(--brand)",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      typography: {
        // Drives `prose-tr` off the design tokens in globals.css, so the
        // article body follows the theme without a prose-invert variant.
        tr: {
          css: {
            "--tw-prose-body": "var(--fg2)",
            "--tw-prose-headings": "var(--fg)",
            "--tw-prose-lead": "var(--fg2)",
            "--tw-prose-links": "var(--brand)",
            "--tw-prose-bold": "var(--fg)",
            "--tw-prose-counters": "var(--dim)",
            "--tw-prose-bullets": "var(--line)",
            "--tw-prose-hr": "var(--line)",
            "--tw-prose-quotes": "var(--fg)",
            "--tw-prose-quote-borders": "var(--brand)",
            "--tw-prose-captions": "var(--dim)",
            "--tw-prose-code": "var(--fg)",
            // Tailwind's default assumes a dark code surface; ours follows the
            // theme, so anything Shiki does not tokenise stays readable.
            "--tw-prose-pre-code": "var(--fg)",
            "--tw-prose-pre-bg": "transparent",
            "--tw-prose-th-borders": "var(--line)",
            "--tw-prose-td-borders": "var(--line)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config

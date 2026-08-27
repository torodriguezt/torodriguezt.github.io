export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-8 font-mono text-[12.5px] text-dim sm:px-8">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="text-ink2">
            Tom{"á"}s Rodr{"í"}guez Taborda
          </span>
          <span className="text-rule">·</span>
          <span>Medellín, Colombia</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a
            href="https://github.com/torodriguezt"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-brand"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/tomasrodriguezt"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-brand"
          >
            LinkedIn
          </a>
          <span className="text-rule">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

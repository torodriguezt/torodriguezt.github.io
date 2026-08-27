import GpBanner from "@/components/gp-banner"

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[320px] flex-col justify-center overflow-hidden">
      <GpBanner curveCount={12} />
      <div className="rise relative mx-auto w-full max-w-[900px] px-6 py-16 sm:px-8">
        <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[38px]">
          {title}
        </h1>
        <div className="mt-[22px] h-px w-9 bg-brand" />
        {subtitle && (
          <p className="mt-[18px] max-w-[56ch] text-[15.5px] leading-[1.65] text-ink2">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

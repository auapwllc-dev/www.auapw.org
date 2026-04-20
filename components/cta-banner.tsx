import { Phone, ArrowRight } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-sans font-black text-balance text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
            Need a part today? We&apos;ve probably got it.
          </h2>
          <p className="mt-2 text-primary-foreground/90 text-sm md:text-base max-w-2xl">
            Quote in under 30 seconds. Most orders ship same-day with free delivery nationwide.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <a
            href="tel:+18888185001"
            className="inline-flex items-center gap-2 bg-zinc-950 text-white font-black uppercase tracking-widest text-xs md:text-sm px-5 h-12 hover:bg-zinc-900 transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            1 (888) 818-5001
          </a>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-background text-foreground font-black uppercase tracking-widest text-xs md:text-sm px-5 h-12 hover:bg-background/90 transition-colors"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

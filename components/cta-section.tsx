import { Phone, Mail } from "lucide-react"

export function CtaSection() {
  return (
    <section id="contact" className="border-b border-border bg-primary text-primary-foreground" aria-labelledby="cta-heading">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 text-center md:px-6 md:py-24 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80">
            Ready When You Are
          </span>
          <h2 id="cta-heading" className="mt-3 text-balance text-3xl font-black uppercase tracking-tight md:text-5xl">
            Need a Part? Get a Free Quote in Minutes.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-primary-foreground/90 md:text-lg">
            Our parts specialists are standing by 24/7 to help you find exactly what you need at the best price.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
          <a
            href="tel:+18885551234"
            className="flex items-center justify-center gap-3 border-2 border-primary-foreground bg-primary-foreground px-6 py-4 text-base font-bold uppercase tracking-wide text-primary transition-colors hover:bg-transparent hover:text-primary-foreground"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            1-888-555-1234
          </a>
          <a
            href="mailto:info@auapw.org"
            className="flex items-center justify-center gap-3 border-2 border-primary-foreground bg-transparent px-6 py-4 text-base font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            info@auapw.org
          </a>
        </div>
      </div>
    </section>
  )
}

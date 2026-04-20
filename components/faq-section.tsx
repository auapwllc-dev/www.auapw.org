import { FAQ } from "@/lib/data"
import { SectionHeading } from "./parts-grid"

export function FaqSection() {
  return (
    <section id="faq" className="bg-card/40 border-y border-border py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Frequently Asked"
          title="Questions, answered."
          lede="Still not sure? Call us at 1 (888) 818-5001 — our team is happy to walk you through any part, fitment, or shipping question."
        />

        <div className="mt-12 max-w-3xl mx-auto divide-y divide-border border-t border-b border-border">
          {FAQ.map((item, i) => (
            <details
              key={item.q}
              className="group py-5 md:py-6"
              open={i === 0}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-black text-base md:text-lg text-foreground leading-tight">
                <span>{item.q}</span>
                <span
                  className="relative h-6 w-6 flex-shrink-0 text-primary"
                  aria-hidden="true"
                >
                  <span className="absolute inset-x-0 top-1/2 h-0.5 bg-current -translate-y-1/2" />
                  <span className="absolute inset-y-0 left-1/2 w-0.5 bg-current -translate-x-1/2 transition-transform group-open:rotate-90 group-open:scale-0" />
                </span>
              </summary>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Star, Quote } from "lucide-react"
import { REVIEWS } from "@/lib/data"
import { SectionHeading } from "./parts-grid"

export function Reviews() {
  return (
    <section id="reviews" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="What Clients Say"
          title="Trusted by mechanics, fleets, and DIYers."
          lede="Real reviews from real customers. See why AUAPW is the first call for thousands of repair shops and drivers nationwide."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="relative bg-card border border-border p-6 md:p-8 flex flex-col gap-4"
            >
              <Quote
                className="absolute top-5 right-5 h-10 w-10 text-primary/15"
                aria-hidden="true"
              />
              <div className="flex items-center gap-1" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-base md:text-lg text-foreground leading-relaxed text-pretty">
                &ldquo;{r.body}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-border">
                <div className="font-black text-foreground">{r.name}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

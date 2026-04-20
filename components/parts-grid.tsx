import Link from "next/link"
import {
  Cog,
  Settings,
  Car,
  Wind,
  Battery,
  Zap,
  Thermometer,
  CircleDot,
  ArrowRight,
} from "lucide-react"
import { POPULAR_PARTS } from "@/lib/data"

const ICONS = [Cog, Settings, Car, Wind, Battery, Zap, Thermometer, CircleDot]

export function PartsGrid() {
  return (
    <section id="parts" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Popular Parts In Stock"
          title="Every part, every make, every model."
          lede="From powertrain rebuilds to small electrical components — sourced directly from verified salvage yards across the country."
        />

        <ul className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {POPULAR_PARTS.map((p, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <li key={p.slug}>
                <Link
                  href="#quote"
                  className="group relative flex flex-col justify-between h-full bg-card border border-border p-5 md:p-6 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-11 w-11 md:h-12 md:w-12 bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-8">
                    <h3 className="font-black text-base md:text-lg text-foreground leading-tight">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {p.blurb}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
}: {
  eyebrow: string
  title: string
  lede?: string
  align?: "center" | "left"
}) {
  return (
    <div
      className={
        align === "center"
          ? "max-w-3xl mx-auto text-center"
          : "max-w-3xl"
      }
    >
      <div
        className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 text-[11px] md:text-xs font-black uppercase tracking-widest ${
          align === "center" ? "" : ""
        }`}
      >
        <span className="h-1 w-1 bg-primary" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-sans font-black text-balance text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-foreground">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          {lede}
        </p>
      ) : null}
    </div>
  )
}

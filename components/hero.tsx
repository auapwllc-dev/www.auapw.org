import Image from "next/image"
import { Search, Phone, CheckCircle2 } from "lucide-react"

const trustPoints = [
  "Free nationwide shipping",
  "12-month warranty included",
  "2,000+ verified salvage yards",
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        className="-z-10 object-cover opacity-20"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center md:px-6 md:py-24 lg:py-32">
        <span className="mb-4 inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          <span className="inline-block h-2 w-2 bg-primary" aria-hidden="true" />
          Premium Quality Used Auto Parts
        </span>

        <h1 className="max-w-4xl text-balance font-sans text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Used Auto Parts <span className="text-primary">Warehouse</span> You Can Trust
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Find genuine OEM used engines, transmissions, and car parts from 2,000+ verified salvage yards nationwide.
          Save up to 70% off dealer prices with free shipping and a 12-month warranty.
        </p>

        {/* Search */}
        <form
          className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 border border-border bg-card p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
          role="search"
          aria-label="Part finder"
        >
          <label className="sr-only" htmlFor="part-year">
            Year
          </label>
          <select
            id="part-year"
            name="year"
            className="h-12 border border-border bg-background px-3 text-sm font-semibold text-foreground focus:border-primary focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select Year
            </option>
            {Array.from({ length: 30 }, (_, i) => 2025 - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="part-make">
            Make
          </label>
          <input
            id="part-make"
            name="make"
            placeholder="Make (e.g. Ford)"
            className="h-12 border border-border bg-background px-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />

          <label className="sr-only" htmlFor="part-name">
            Part
          </label>
          <input
            id="part-name"
            name="part"
            placeholder="Part (e.g. Engine)"
            className="h-12 border border-border bg-background px-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />

          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Find Part
          </button>
        </form>

        {/* CTA + trust */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <a
            href="tel:+18885551234"
            className="flex items-center gap-3 border-2 border-primary bg-transparent px-6 py-3 text-base font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Speak to an Expert: 1-888-555-1234
          </a>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Guarantees">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

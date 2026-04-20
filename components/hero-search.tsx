import Image from "next/image"
import { Search, Star, ShieldCheck, Truck } from "lucide-react"
import { YEARS, MAKES, POPULAR_PARTS } from "@/lib/data"

export function HeroSearch() {
  return (
    <section id="quote" className="relative isolate overflow-hidden bg-zinc-950 text-white">
      <Image
        src="/images/hero-warehouse.jpg"
        alt="AUAPW warehouse interior filled with used auto parts"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary-foreground px-3 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-widest mb-6">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            Nationwide Inventory · Updated Hourly
          </div>
          <h1 className="font-sans font-black text-balance text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Premium Quality <span className="text-primary">Used Auto Parts</span>, Delivered Fast.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Shop engines, transmissions, body, and mechanical parts from 2,000+ verified salvage yards.
            Free shipping, 6-month warranty, prices up to 70% less than OEM new.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span className="font-bold text-white">4.9/5</span> from 12,400+ reviews
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
              6-month warranty
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-secondary" aria-hidden="true" />
              Free shipping
            </span>
          </div>
        </div>

        {/* Search form */}
        <form
          action="#"
          className="relative mt-10 md:mt-14 bg-background text-foreground shadow-2xl border border-border"
          aria-label="Find your used auto part"
        >
          <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center gap-2">
            <Search className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-black uppercase tracking-widest text-sm">Find Your Part</h2>
            <span className="ml-auto text-[11px] font-semibold opacity-90 hidden sm:inline">
              Free quote · No obligation · 30 seconds
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 md:p-5">
            <Field label="Year" name="year">
              <select
                id="year"
                name="year"
                defaultValue=""
                required
                className="w-full h-11 bg-background border border-border px-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>Select year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </Field>

            <Field label="Make" name="make">
              <select
                id="make"
                name="make"
                defaultValue=""
                required
                className="w-full h-11 bg-background border border-border px-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>Select make</option>
                {MAKES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </Field>

            <Field label="Model" name="model">
              <input
                id="model"
                name="model"
                type="text"
                placeholder="e.g. F-150"
                required
                className="w-full h-11 bg-background border border-border px-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </Field>

            <Field label="Part" name="part">
              <select
                id="part"
                name="part"
                defaultValue=""
                required
                className="w-full h-11 bg-background border border-border px-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>Select part</option>
                {POPULAR_PARTS.map((p) => (
                  <option key={p.slug} value={p.name}>{p.name}</option>
                ))}
                <option value="Other">Other / Not listed</option>
              </select>
            </Field>

            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                &nbsp;
              </span>
              <button
                type="submit"
                className="h-11 bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Get Quote
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  children,
}: {
  label: string
  name: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

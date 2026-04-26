import Link from "next/link"
import { CAR_MAKES } from "@/lib/data"

export function MakesPillsSection() {
  return (
    <section className="py-8 sm:py-20 bg-gradient-to-br from-background via-card to-background border-b border-border/30">
      <div className="mx-auto max-w-[1280px] px-3 sm:px-6">
        <div className="flex items-end justify-between gap-3 sm:gap-6 mb-6 sm:mb-12 flex-wrap">
          <div>
            <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-5">
              <div className="w-4 sm:w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-[0.5rem] sm:text-[0.65rem] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary">All Makes & Models</span>
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-[clamp(1.75rem,4vw,3rem)] font-bold text-foreground text-balance mb-0.5 sm:mb-1">Shop by Brand</h2>
              <p className="text-muted-foreground text-[10px] sm:text-sm font-semibold tracking-tight">Quality used parts for every make — {CAR_MAKES.length} brands</p>
            </div>
          </div>
          <Link href="/makes" className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 text-[0.55rem] sm:text-[0.68rem] font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase border border-border/60 text-muted-foreground rounded-sm hover:border-foreground/50 hover:text-foreground transition-all shrink-0">
            View All Makes &rarr;
          </Link>
        </div>
        <div className="flex flex-wrap gap-[2px] sm:gap-1 md:gap-1.5">
          {CAR_MAKES.map((make) => (
            <Link
              key={make}
              href={`/makes/${encodeURIComponent(make.toLowerCase().replace(/\s+/g, "-"))}`}
              className="chrome-brand-pill text-[8px] sm:text-[10px] px-1.5 sm:px-2.5 py-0.5 sm:py-1"
              title={`${make} Parts`}
            >
              {make}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

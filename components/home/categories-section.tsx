import Link from "next/link"
import Image from "next/image"
import { PART_CATEGORIES } from "@/lib/data"
import { CircleDot, Link2, Zap, Snowflake, Activity, Square } from "lucide-react"

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  transmissions: CircleDot,
  drivetrain: Link2,
  electrical: Zap,
  cooling: Snowflake,
  suspension: Activity,
  body: Square,
}

export function CategoriesSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary">What We Source</span>
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-bold intelligent-premium-text text-3d-section text-balance">Parts Categories</h2>
          </div>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PART_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id]
            return (
              <Link
                key={cat.id}
                href={`/parts/${cat.id}`}
                className="group glass-card rounded-sm p-4 sm:p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              >
                {cat.id === 'engines' ? (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 mb-3 object-cover">
                    <img src="/images/icon-gear.png" alt={cat.label} className="w-full h-full" />
                  </div>
                ) : Icon ? (
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
                ) : null}
                <h3 className="text-xs sm:text-sm font-bold tracking-wide text-foreground mb-1 sm:mb-2">{cat.label}</h3>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground mb-3">{cat.parts.length} parts</p>
                <div className="border-t border-border/30 pt-2 sm:pt-3 flex flex-wrap gap-1">
                  {cat.parts.slice(0, 2).map((p) => (
                    <span key={p} className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-secondary/50 border border-border/40 text-[8px] sm:text-[10px] text-muted-foreground rounded-sm truncate max-w-[80px] sm:max-w-none">{p}</span>
                  ))}
                  <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-secondary/50 border border-border/40 text-[8px] sm:text-[10px] text-muted-foreground rounded-sm">+{cat.parts.length - 2}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

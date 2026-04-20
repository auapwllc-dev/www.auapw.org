import {
  PiggyBank,
  Globe2,
  ShieldCheck,
  Truck,
  Leaf,
  Award,
} from "lucide-react"
import { BENEFITS } from "@/lib/data"
import { SectionHeading } from "./parts-grid"

const ICONS = [PiggyBank, Globe2, ShieldCheck, Truck, Leaf, Award]

export function WhyChoose() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Why Choose AUAPW"
          title="Your trusted partner for used auto parts."
          lede="Since 2009, AUAPW has connected drivers, mechanics, and fleet managers with high-quality recycled parts — fast, cheap, and guaranteed."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <article
                key={b.title}
                className="relative bg-card border border-border p-6 md:p-7 hover:border-primary transition-colors"
              >
                <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-black text-lg md:text-xl text-foreground leading-tight">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {b.body}
                </p>
              </article>
            )
          })}
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {[
            { k: "2,000+", v: "Salvage yards" },
            { k: "1M+", v: "Parts shipped" },
            { k: "50+", v: "Vehicle makes" },
            { k: "4.9/5", v: "Customer rating" },
          ].map((s) => (
            <div key={s.v} className="bg-background p-6 text-center">
              <div className="font-black text-3xl md:text-4xl text-primary leading-none">
                {s.k}
              </div>
              <div className="mt-2 text-[11px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

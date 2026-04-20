"use client"

import { useParams } from "next/navigation"
import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  CAR_MAKES, CAR_MODELS, BRAND_COLORS, PART_CATEGORIES,
  getBrandLogoUrl, PHONE_SALES, PHONE_DISPLAY,
} from "@/lib/data"
import { ALL_PARTS, type PartInfo } from "@/lib/parts-content"
import {
  ChevronRight, ChevronDown, Shield, Truck, Clock,
  CheckCircle, Package, Phone, ArrowLeft, Star,
} from "lucide-react"

const PHONE_CLEAN = PHONE_SALES.replace(/\D/g, "")

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function resolveBrand(slug: string): string {
  const lower = slug.toLowerCase().replace(/-/g, " ")
  return (
    CAR_MAKES.find(m => m.toLowerCase() === lower) ||
    CAR_MAKES.find(m => slugify(m) === slug) ||
    slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  )
}

function resolvePart(slug: string): PartInfo | undefined {
  // Exact slug match first
  const exact = ALL_PARTS.find(p => p.slug === slug)
  if (exact) return exact
  // Fuzzy: slugify the name
  return ALL_PARTS.find(p => slugify(p.name) === slug)
}

function BrandLogo({ brand }: { brand: string }) {
  const [failed, setFailed] = useState(false)
  const url = getBrandLogoUrl(brand)
  const initials = brand.split(/[\s-]+/).map(w => w[0]).join("").slice(0, 3).toUpperCase()
  return (
    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center shadow-lg">
      {url && !failed
        ? <Image src={url} alt={brand} width={48} height={48} className="w-full h-full object-cover" onError={() => setFailed(true)} />
        : <span className="text-sm font-black text-white tracking-wide">{initials}</span>
      }
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-card/80 transition-colors"
      >
        <span className="font-semibold text-sm text-foreground">{q}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30">
          {a}
        </div>
      )}
    </div>
  )
}

// Part type → image mapping using existing public assets
const PART_IMAGE_MAP: Record<string, string> = {
  engine:       "/images/parts/engine-used.jpg",
  transmission: "/images/parts/transmission-used.jpg",
  "wheel-rim":  "/images/parts/wheel-rim-used.jpg",
  headlight:    "/images/parts/headlight-used.jpg",
  "ac-control": "/images/parts/ac-control-used.jpg",
  abs:          "/images/parts/abs-module-used.jpg",
  radiator:     "/images/parts/radiator-used.jpg",
  starter:      "/images/parts/starter-used.jpg",
  seat:         "/images/parts/seat-front-used.jpg",
  speedometer:  "/images/parts/speedometer-used.jpg",
  airbag:       "/images/parts/airbag-used.jpg",
  "wiper-motor":"/images/parts/wiper-motor-used.jpg",
}

function getPartImage(slug: string): string {
  for (const [key, img] of Object.entries(PART_IMAGE_MAP)) {
    if (slug.includes(key)) return img
  }
  return "/images/parts/engine-used.jpg"
}

// Dynamic pricing based on part category
function getEstimatedPrice(part: PartInfo): { low: number; high: number } {
  const cat = part.category
  const priceMap: Record<string, [number, number]> = {
    engines:       [800, 3500],
    transmissions: [600, 2800],
    drivetrain:    [250, 1200],
    electrical:    [75, 900],
    cooling:       [120, 850],
    brakes:        [80, 600],
    suspension:    [100, 750],
    body:          [150, 1400],
    exhaust:       [80, 600],
  }
  return { low: priceMap[cat]?.[0] ?? 100, high: priceMap[cat]?.[1] ?? 800 }
}

export default function PartDetailPage() {
  const params = useParams()
  const brand = resolveBrand(params.brand as string)
  const partSlug = params.part as string
  const part = resolvePart(partSlug)
  const color = BRAND_COLORS[brand] || "#1a1a2e"
  const models = CAR_MODELS[brand] || []
  const price = part ? getEstimatedPrice(part) : { low: 150, high: 900 }
  const catLabel = PART_CATEGORIES.find(c => c.id === part?.category)?.label || "Auto Parts"

  // Related parts from the same category
  const relatedParts = useMemo(() => {
    if (!part) return []
    return ALL_PARTS
      .filter(p => p.category === part.category && p.slug !== part.slug)
      .slice(0, 6)
  }, [part])

  if (!part) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center">
          <div className="text-center px-6">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-3">Part Not Found</h1>
            <p className="text-muted-foreground mb-8">We couldn&apos;t find that part in our catalog.</p>
            <Link href={`/makes/${slugify(brand)}/parts`} className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to {brand} Parts
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Generate brand-specific FAQs by injecting brand into the part's generic FAQs
  const faqs = useMemo(() => {
    const base = part.faqs.map(f => ({
      q: f.q.replace(/\b(this part|the part|a used part)\b/gi, `a used ${brand} ${part.name}`),
      a: f.a,
    }))
    // Add brand-specific shipping / warranty FAQ
    base.push({
      q: `Do you ship used ${brand} ${part.name} parts nationwide?`,
      a: `Yes. We ship used ${brand} ${part.name} parts to all 50 states. Most orders qualify for free shipping and ship within 1–3 business days. Large components are freight-shipped with full insurance. Call ${PHONE_DISPLAY} to confirm availability for your specific model and year.`,
    })
    return base
  }, [part, brand])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-[58px]">

        {/* ── Hero strip ───────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden border-b border-border/30"
          style={{ background: `linear-gradient(135deg, ${color}e0 0%, ${color}90 50%, #0a0a0f 100%)` }}
        >
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Crect x='0' y='0' width='1' height='40'/%3E%3Crect x='0' y='0' width='40' height='1'/%3E%3C/g%3E%3C/svg%3E")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />

          <div className="relative mx-auto max-w-[1280px] px-6 py-12 md:py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-8 flex-wrap">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/makes" className="hover:text-white/80 transition-colors">Brands</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/makes/${slugify(brand)}`} className="hover:text-white/80 transition-colors">{brand}</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/makes/${slugify(brand)}/parts`} className="hover:text-white/80 transition-colors">Parts</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">{part.name}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <BrandLogo brand={brand} />
              <div>
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest">{catLabel}</span>
                <h1 className="text-3xl md:text-4xl font-black text-white text-balance leading-tight">
                  Used {brand} {part.name}
                </h1>
              </div>
            </div>

            {/* Price range badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mt-2">
              <span className="text-white/60 text-xs font-semibold">Estimated Price Range</span>
              <span className="text-white font-black text-lg">${price.low.toLocaleString()} – ${price.high.toLocaleString()}</span>
              <span className="text-green-400 text-xs font-bold bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">Save 40–70%</span>
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1280px] px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Left: Details column ─── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Part image + description */}
              <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
                <div className="relative h-56 md:h-72 bg-gradient-to-br from-muted/60 to-muted/30 overflow-hidden">
                  <Image
                    src={getPartImage(partSlug)}
                    alt={`Used ${brand} ${part.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 66vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white text-xs font-bold backdrop-blur-sm">USED OEM</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-400 text-xs font-bold backdrop-blur-sm">IN STOCK</span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-bold mb-3">About This Part</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{part.longDescription}</p>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
                    {part.benefits.map(b => (
                      <div key={b} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compatible models */}
              {models.length > 0 && (
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h2 className="text-lg font-bold mb-4">Compatible {brand} Models</h2>
                  <div className="flex flex-wrap gap-2">
                    {models.map(model => (
                      <Link
                        key={model}
                        href={`/search?make=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&part=${encodeURIComponent(part.name)}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-border/50 bg-secondary/40 text-muted-foreground hover:bg-primary/10 hover:border-primary/40 hover:text-foreground transition-all"
                      >
                        {model}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <h2 className="text-lg font-bold mb-5">
                  Frequently Asked Questions — {brand} {part.name}
                </h2>
                <div className="space-y-3">
                  {faqs.map((f, i) => (
                    <FAQItem key={i} q={f.q} a={f.a} />
                  ))}
                </div>
              </div>

              {/* Related parts */}
              {relatedParts.length > 0 && (
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h2 className="text-lg font-bold mb-5">Related {catLabel} Parts</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {relatedParts.map(rp => (
                      <Link
                        key={rp.slug}
                        href={`/makes/${slugify(brand)}/parts/${rp.slug}`}
                        className="group flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-background hover:bg-card hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                      >
                        <Package className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                          {rp.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Sticky sidebar ─── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">

                {/* Quote / Call CTA card */}
                <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/50" style={{ background: `linear-gradient(135deg, ${color}30, transparent)` }}>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Price Range</p>
                    <p className="text-2xl font-black text-foreground">${price.low.toLocaleString()} – ${price.high.toLocaleString()}</p>
                    <p className="text-xs text-green-500 font-semibold mt-0.5">Save 40–70% vs new OEM</p>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1.5 px-5 py-3 border-b border-border/30">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                    <span className="text-xs text-muted-foreground ml-1">4.8 · 2,400+ orders</span>
                  </div>

                  <div className="p-5 space-y-3">
                    <Link
                      href={`/quote?make=${encodeURIComponent(brand)}&part=${encodeURIComponent(part.name)}`}
                      className="category-quote-btn w-full justify-center text-sm py-3"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 flex-shrink-0">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      GET FREE QUOTE
                    </Link>
                    <a
                      href={`tel:${PHONE_CLEAN}`}
                      className="category-call-btn w-full justify-center text-sm py-3"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                      </svg>
                      CALL {PHONE_DISPLAY}
                    </a>
                    <Link
                      href={`/search?make=${encodeURIComponent(brand)}&part=${encodeURIComponent(part.name)}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border/50 hover:text-foreground hover:border-border transition-all"
                    >
                      Search Live Inventory
                    </Link>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-4">
                  {[
                    { icon: Shield, title: "6-Month Warranty", desc: "All parts backed by warranty" },
                    { icon: Truck, title: "Free Shipping", desc: "To any US address" },
                    { icon: Clock, title: "24-Hour Response", desc: "Quote within one business day" },
                    { icon: CheckCircle, title: "OEM Quality", desc: "Genuine manufacturer parts" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{title}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Back link */}
                <Link
                  href={`/makes/${slugify(brand)}/parts`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> All {brand} Parts
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Bottom CTA strip ─────────────────────────────────────── */}
        <div className="border-t border-border/30 bg-card/50">
          <div className="mx-auto max-w-[1280px] px-6 py-12 text-center">
            <h2 className="text-2xl font-black mb-2 text-balance">Don&apos;t see the right part?</h2>
            <p className="text-sm text-muted-foreground mb-7 max-w-lg mx-auto">
              Our team can source from additional yards not listed here. Call or request a quote for immediate assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/quote?make=${encodeURIComponent(brand)}&part=${encodeURIComponent(part.name)}`} className="category-quote-btn">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 flex-shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                GET FREE QUOTE
              </Link>
              <a href={`tel:${PHONE_CLEAN}`} className="category-call-btn">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                </svg>
                CALL {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

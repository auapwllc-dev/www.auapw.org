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
import { ALL_PARTS } from "@/lib/parts-content"
import { Search, Phone, ArrowLeft, Shield, Truck, Clock, Package, ChevronRight } from "lucide-react"

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

function BrandLogoTile({ brand, color }: { brand: string; color: string }) {
  const [failed, setFailed] = useState(false)
  const url = getBrandLogoUrl(brand)
  const initials = brand.split(/[\s-]+/).map(w => w[0]).join("").slice(0, 3).toUpperCase()
  return (
    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
      {url && !failed ? (
        <Image src={url} alt={brand} width={64} height={64} className="w-full h-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <span className="text-xl font-black text-white tracking-wide">{initials}</span>
      )}
    </div>
  )
}

export default function BrandPartsPage() {
  const params = useParams()
  const brand = resolveBrand(params.brand as string)
  const color = BRAND_COLORS[brand] || "#1a1a2e"
  const models = CAR_MODELS[brand] || []

  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  // Flatten all parts from ALL_PARTS + PART_CATEGORIES sub-parts into one list
  const allPartsList = useMemo(() => {
    const seen = new Set<string>()
    const parts: { slug: string; name: string; category: string }[] = []

    // First from structured ALL_PARTS (has slugs + descriptions)
    for (const p of ALL_PARTS) {
      if (!seen.has(p.slug)) {
        seen.add(p.slug)
        parts.push({ slug: p.slug, name: p.name, category: p.category })
      }
    }
    // Then fill in any extra from PART_CATEGORIES that aren't covered
    for (const cat of PART_CATEGORIES) {
      for (const partName of cat.parts) {
        const slug = slugify(partName)
        if (!seen.has(slug)) {
          seen.add(slug)
          parts.push({ slug, name: partName, category: cat.id })
        }
      }
    }
    return parts
  }, [])

  const filteredParts = useMemo(() => {
    return allPartsList.filter(p => {
      const matchesCat = activeCategory === "all" || p.category === activeCategory
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [allPartsList, activeCategory, search])

  const brandExists = CAR_MAKES.some(m => m.toLowerCase() === brand.toLowerCase())

  if (!brandExists) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl font-bold mb-4">Brand Not Found</h1>
            <p className="text-muted-foreground mb-8">We could not find &quot;{brand}&quot; in our catalog.</p>
            <Link href="/makes" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Browse All Brands
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-[58px]">

        {/* ── Hero Banner ─────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${color}f0 0%, ${color}b0 60%, #0a0a0f 100%)` }}
        >
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Crect x='0' y='0' width='1' height='40'/%3E%3Crect x='0' y='0' width='40' height='1'/%3E%3C/g%3E%3C/svg%3E")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />

          <div className="relative mx-auto max-w-[1280px] px-6 py-14 md:py-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-8">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/makes" className="hover:text-white/80 transition-colors">All Brands</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/makes/${slugify(brand)}`} className="hover:text-white/80 transition-colors">{brand}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">Parts</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
              <BrandLogoTile brand={brand} color={color} />
              <div>
                <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-1">Used OEM Parts</p>
                <h1 className="text-4xl md:text-5xl font-black text-white text-balance leading-tight">
                  {brand} Parts
                </h1>
                <p className="text-white/70 mt-2 text-base">
                  {filteredParts.length} part types available &mdash; sourced from 2,000+ verified recyclers
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: Shield, text: "6-Month Warranty" },
                { icon: Truck, text: "Free Shipping" },
                { icon: Clock, text: "24-HR Response" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm backdrop-blur-sm">
                  <Icon className="w-4 h-4" /><span>{text}</span>
                </div>
              ))}
            </div>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder={`Search ${brand} parts...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 backdrop-blur-sm transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-lg leading-none">&times;</button>
              )}
            </div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1280px] px-6 py-10">

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              All Parts
            </button>
            {PART_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* ── Left sidebar: Models ─── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border/50 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border/50 bg-card/80">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">{brand} Models</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{models.length} models available</p>
                </div>
                <div className="divide-y divide-border/30 max-h-[520px] overflow-y-auto">
                  {models.map(model => (
                    <Link
                      key={model}
                      href={`/search?make=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`}
                      className="flex items-center justify-between px-5 py-3 hover:bg-primary/5 hover:text-primary transition-colors group"
                    >
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">{model}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>

                {/* CTA block inside sidebar */}
                <div className="p-5 border-t border-border/50 bg-gradient-to-b from-card to-card/60 space-y-3">
                  <p className="text-xs text-muted-foreground text-center">Need help finding a part?</p>
                  <Link
                    href={`/quote?make=${encodeURIComponent(brand)}`}
                    className="category-quote-btn w-full justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 flex-shrink-0">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    GET FREE QUOTE
                  </Link>
                  <a
                    href={`tel:${PHONE_CLEAN}`}
                    className="category-call-btn w-full justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                    </svg>
                    CALL {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </aside>

            {/* ── Right: Parts grid ─── */}
            <section className="lg:col-span-3">
              {/* Results count */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredParts.length}</span> part types
                  {search && <> matching &ldquo;<span className="font-semibold text-foreground">{search}</span>&rdquo;</>}
                </p>
                {(search || activeCategory !== "all") && (
                  <button
                    onClick={() => { setSearch(""); setActiveCategory("all") }}
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {filteredParts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/50 rounded-2xl">
                  <Package className="w-10 h-10 text-muted-foreground/40 mb-4" />
                  <p className="text-foreground font-semibold mb-1">No parts found</p>
                  <p className="text-sm text-muted-foreground">Try a different search or category filter</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filteredParts.map(part => {
                    const catLabel = PART_CATEGORIES.find(c => c.id === part.category)?.label || part.category
                    return (
                      <Link
                        key={part.slug}
                        href={`/makes/${slugify(brand)}/parts/${part.slug}`}
                        className="group flex flex-col gap-3 p-4 rounded-xl border border-border/50 bg-card hover:bg-card/80 hover:border-primary/40 hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
                      >
                        {/* Category tag */}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 px-2 py-0.5 rounded bg-primary/8 self-start border border-primary/15">
                          {catLabel}
                        </span>

                        {/* Part name */}
                        <div className="flex items-start gap-2">
                          <Package className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                            Used {brand} {part.name}
                          </h3>
                        </div>

                        {/* Footer row */}
                        <div className="flex items-center justify-between mt-auto pt-1 border-t border-border/30">
                          <span className="text-xs text-muted-foreground">OEM Quality</span>
                          <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-1.5 transition-all">
                            View Details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {/* Bottom CTA */}
              <div className="mt-10 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-card via-card/80 to-background text-center">
                <h3 className="text-xl font-bold mb-2 text-balance">Don&apos;t see your {brand} part?</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                  Our team can source from additional yards not listed here. Call or request a free quote for immediate assistance.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href={`/quote?make=${encodeURIComponent(brand)}`}
                    className="category-quote-btn"
                  >
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
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

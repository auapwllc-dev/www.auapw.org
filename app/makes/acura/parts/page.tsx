"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PHONE_DISPLAY, PHONE_SALES, getBrandLogoUrl } from "@/lib/data"
import { 
  ACURA_CATEGORY_PARTS, 
  getAllAcuraCategories, 
  getAcuraCategoryPartsByCategory,
  getDisplayPrice 
} from "@/lib/acura-category-parts"
import { useState, useMemo } from "react"
import { 
  Shield, 
  Truck, 
  Clock, 
  Search, 
  Phone, 
  MessageSquare,
  Package,
  Filter,
  X
} from "lucide-react"

export default function AcuraPartsListingPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)

  const categories = getAllAcuraCategories()

  const filteredParts = useMemo(() => {
    return ACURA_CATEGORY_PARTS.filter((part) => {
      const matchesSearch = search === "" || 
        part.name.toLowerCase().includes(search.toLowerCase()) ||
        part.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === "" || part.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const clearFilters = () => {
    setSearch("")
    setSelectedCategory("")
  }

  const hasFilters = search || selectedCategory
  const logoUrl = getBrandLogoUrl("Acura")

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-[58px]">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0a0a0f] border-b border-border/30">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
          </div>
          <div className="metal-line" />
          <div className="relative mx-auto max-w-[1280px] px-6 py-16 md:py-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/makes" className="hover:text-foreground transition-colors">All Brands</Link>
              <span>/</span>
              <Link href="/makes/acura" className="hover:text-foreground transition-colors">Acura</Link>
              <span>/</span>
              <span className="text-foreground">Parts</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              {/* Brand Logo */}
              {logoUrl && (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0">
                  <Image 
                    src={logoUrl} 
                    alt="Acura logo" 
                    width={128} 
                    height={128} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-500/50" />
                  <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-red-400">
                    OEM QUALITY PARTS
                  </span>
                </div>
                <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold text-foreground mb-3">
                  <span className="text-red-400">Acura</span> Used Auto Parts
                </h1>
                <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
                  Quality recycled OEM parts for all Acura models. MDX, RDX, TLX, ILX, NSX and more. 
                  All parts professionally inspected with up to 6-month warranty. Save 40-70% vs new.
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
                <Shield className="w-4 h-4" />
                <span>6-Month Warranty</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
                <Truck className="w-4 h-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
                <Clock className="w-4 h-4" />
                <span>24-HR Response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search Acura parts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              />
            </div>
            
            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground"
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasFilters && <span className="w-2 h-2 rounded-full bg-red-500" />}
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="md:hidden mb-6 p-4 rounded-lg bg-card border border-border/50 space-y-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredParts.length}</span> Acura part categories
            </p>
          </div>

          {/* Parts Grid */}
          {filteredParts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No parts found matching your criteria</p>
              <button onClick={clearFilters} className="text-red-400 hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredParts.map((part) => (
                <Link
                  key={part.slug}
                  href={`/makes/acura/parts/${part.slug}`}
                  className="group relative flex flex-col rounded-xl border border-border/50 bg-card overflow-hidden hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                >
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded bg-primary/80 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                    {part.category}
                  </div>
                  
                  {/* OEM badge */}
                  <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded bg-red-600/90 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
                    OEM
                  </div>
                  
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800">
                    <Image
                      src={part.imageUrl}
                      alt={`Used Acura ${part.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* USED watermark overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="rotate-[-15deg] opacity-15">
                        <span className="text-2xl font-black uppercase tracking-widest text-white whitespace-nowrap">USED</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="font-semibold text-base leading-tight mb-2 group-hover:text-red-400 transition-colors">
                      Used Acura {part.name}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{part.description}</p>
                    
                    {/* Compatible models preview */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {part.compatibleModels.slice(0, 4).map((model) => (
                        <span key={model} className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">
                          {model}
                        </span>
                      ))}
                      {part.compatibleModels.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">
                          +{part.compatibleModels.length - 4}
                        </span>
                      )}
                    </div>
                    
                    {/* Price */}
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-foreground">From ${getDisplayPrice(part.price)}</span>
                        <span className="text-xs text-green-400 font-semibold">Save 40-70%</span>
                      </div>
                      
                      {/* View Details */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground group-hover:text-red-400 transition-colors">
                          View Details
                        </span>
                        <Package className="w-4 h-4 text-muted-foreground group-hover:text-red-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-red-500/10 via-card to-red-500/5 border border-red-500/20">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-3">Need a Specific Acura Part?</h2>
              <p className="text-muted-foreground mb-6">
                Our network of 2,000+ verified yards can source any Acura part. Get a free quote today - no obligation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/quote?make=Acura" className="auapw-btn auapw-btn-amber">
                  <MessageSquare className="w-4 h-4" />
                  <span>GET FREE QUOTE</span>
                </Link>
                <a href={`tel:${PHONE_SALES.replace(/-/g, "")}`} className="auapw-btn auapw-btn-green">
                  <Phone className="w-4 h-4" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Browse by Category */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categories.map((category) => {
                const categoryParts = getAcuraCategoryPartsByCategory(category)
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-card border-border/50 hover:border-primary/30"
                    }`}
                  >
                    {category}
                    <span className="ml-2 text-xs text-muted-foreground">({categoryParts.length})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

import { BrandLogosSection } from '@/components/brand-logos'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, BarChart3 } from 'lucide-react'
import { mockParts, conditions, warranties, locations } from '@/lib/mock-data'
import { useFilterStore } from '@/lib/stores/filter-store'
import { useCartStore } from '@/lib/stores/cart-store'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { useComparisonStore } from '@/lib/stores/comparison-store'

export default function PartsPage() {
  const [priceRange, setPriceRange] = useFilterStore((state) => [state.priceRange, state.setPriceRange])
  const [selectedCondition, setSelectedCondition] = useFilterStore((state) => [state.condition, state.setCondition])
  const [selectedWarranty, setSelectedWarranty] = useFilterStore((state) => [state.warranty, state.setWarranty])
  const [selectedLocation, setSelectedLocation] = useFilterStore((state) => [state.location, state.setLocation])
  const [sortBy, setSortBy] = useFilterStore((state) => [state.sortBy, state.setSortBy])
  const resetFilters = useFilterStore((state) => state.resetFilters)

  const addToCart = useCartStore((state) => state.addItem)
  const addToWishlist = useWishlistStore((state) => state.addItem)
  const addToComparison = useComparisonStore((state) => state.addItem)

  // Filter parts
  const filteredParts = useMemo(() => {
    let filtered = mockParts.filter((part) => {
      const priceOk = part.price >= priceRange[0] && part.price <= priceRange[1]
      const conditionOk = selectedCondition.length === 0 || selectedCondition.includes(part.condition)
      const warrantyOk = selectedWarranty.length === 0 || selectedWarranty.includes(part.warranty)
      const locationOk = !selectedLocation || part.location === selectedLocation
      return priceOk && conditionOk && warrantyOk && locationOk
    })

    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else {
      // newest (default order)
      filtered.sort((a, b) => mockParts.indexOf(b) - mockParts.indexOf(a))
    }

    return filtered
  }, [priceRange, selectedCondition, selectedWarranty, selectedLocation, sortBy])

  const handleAddToCart = (part: typeof mockParts[0]) => {
    addToCart({
      id: part.id,
      name: part.name,
      price: part.price,
      quantity: 1,
      image: part.image,
      make: part.make,
      partType: part.partType,
    })
  }

  const handleAddToWishlist = (part: typeof mockParts[0]) => {
    addToWishlist({
      id: part.id,
      name: part.name,
      price: part.price,
      image: part.image,
      make: part.make,
      partType: part.partType,
      addedAt: Date.now(),
    })
  }

  const handleAddToComparison = (part: typeof mockParts[0]) => {
    addToComparison({
      id: part.id,
      name: part.name,
      price: part.price,
      image: part.image,
      make: part.make,
      partType: part.partType,
      condition: part.condition,
      warranty: part.warranty,
      location: part.location,
      rating: part.rating,
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[58px]">
        {/* Header */}
        <div className="bg-gradient-to-br from-background via-card to-background border-b border-border/30">
          <div className="metal-line" />
          <div className="mx-auto max-w-[1280px] px-6 py-14">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary">Full Inventory</span>
            </div>
            <h1 className="font-serif text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-foreground">Used Auto Parts</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-[520px]">
              Browse our extensive inventory with advanced filtering. Quality parts from 2,000+ verified yards nationwide.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Filters sidebar - collapsible on mobile */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-32 space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Reset
                  </button>
                </div>

                {/* Price range */}
                <div className="space-y-3 p-4 border border-white/10 rounded-lg bg-white/5">
                  <label className="text-sm font-medium">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value: number[]) => setPriceRange([value[0], value[1]])}
                    min={0}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Condition */}
                <div className="space-y-3 p-4 border border-white/10 rounded-lg bg-white/5">
                  <label className="text-sm font-medium block">Condition</label>
                  {conditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={selectedCondition.includes(condition)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCondition([...selectedCondition, condition])
                          } else {
                            setSelectedCondition(selectedCondition.filter((c) => c !== condition))
                          }
                        }}
                      />
                      <label htmlFor={condition} className="text-sm capitalize cursor-pointer">
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Warranty */}
                <div className="space-y-3 p-4 border border-white/10 rounded-lg bg-white/5">
                  <label className="text-sm font-medium block">Warranty</label>
                  {warranties.map((warranty) => (
                    <div key={warranty} className="flex items-center space-x-2">
                      <Checkbox
                        id={warranty}
                        checked={selectedWarranty.includes(warranty)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedWarranty([...selectedWarranty, warranty])
                          } else {
                            setSelectedWarranty(selectedWarranty.filter((w) => w !== warranty))
                          }
                        }}
                      />
                      <label htmlFor={warranty} className="text-sm cursor-pointer">
                        {warranty}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Location */}
                <div className="space-y-3 p-4 border border-white/10 rounded-lg bg-white/5">
                  <label className="text-sm font-medium block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All locations</SelectItem>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Comparison link */}
                <Link href="/comparison" className="block w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Comparison
                  </Button>
                </Link>
              </div>
            </div>

            {/* Products grid */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-1 lg:order-2">
              {/* Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-xs sm:text-sm text-foreground/60">{filteredParts.length} parts found</p>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-full sm:w-40 bg-white/5 border-white/10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products */}
              {filteredParts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-foreground/60">No parts found matching your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {filteredParts.map((part) => (
                    <div key={part.id} className="p-3 sm:p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {part.image && (
                          <div className="w-full sm:w-24 h-32 sm:h-24 rounded-md bg-white/10 flex-shrink-0 overflow-hidden">
                            <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg truncate">{part.name}</h3>
                          <p className="text-xs sm:text-sm text-foreground/60">{part.make}</p>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                            <span className="text-[10px] sm:text-xs bg-yellow-500/20 text-yellow-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                              {part.rating} ★
                            </span>
                            <span className="text-[10px] sm:text-xs bg-blue-500/20 text-blue-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                              {part.condition}
                            </span>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-blue-400 mt-2">${part.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-2 justify-start mt-2 sm:mt-0">
                          <button
                            onClick={() => handleAddToCart(part)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors flex items-center justify-center w-10 h-10 flex-shrink-0"
                            aria-label="Add to cart"
                            title="Add to cart"
                          >
                            <img src="/images/icon-add-to-cart.png" alt="Add to cart" className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => handleAddToWishlist(part)}
                            className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded transition-colors"
                            aria-label="Add to wishlist"
                            title="Add to wishlist"
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleAddToComparison(part)}
                            className="p-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 rounded text-xs transition-colors"
                            aria-label="Add to comparison"
                            title="Add to comparison"
                          >
                            <BarChart3 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BrandLogosSection />
      <Footer />
    </main>
  )
}


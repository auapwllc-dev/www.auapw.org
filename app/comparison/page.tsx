'use client'

import { useComparisonStore } from '@/lib/stores/comparison-store'
import { useCartStore } from '@/lib/stores/cart-store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Scale, ShoppingCart, Zap, Star, Shield, Truck, Clock, CheckCircle, X, Plus } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BrandLogosSection } from '@/components/brand-logos'
import { mockParts } from '@/lib/mock-data'
import { useState } from 'react'

export default function ComparisonPage() {
  const router = useRouter()
  const items = useComparisonStore((state) => state.items)
  const removeItem = useComparisonStore((state) => state.removeItem)
  const clearComparison = useComparisonStore((state) => state.clearComparison)
  const canAddMore = useComparisonStore((state) => state.canAddMore)
  const addToCart = useCartStore((state) => state.addItem)
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      make: item.make,
      partType: item.partType,
    })
    setAddedToCart(item.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  const handleBuyNow = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      make: item.make,
      partType: item.partType,
    })
    router.push('/checkout')
  }

  const handleAddPartToComparison = (partId: string) => {
    const part = mockParts.find((p) => p.id === partId)
    if (part) {
      useComparisonStore.getState().addItem({
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
  }

  // Specification rows for comparison
  const specs: { label: string; key: keyof typeof items[0]; icon?: React.ElementType; format?: (val: unknown) => string }[] = [
    { label: 'Brand', key: 'make' },
    { label: 'Part Type', key: 'partType' },
    { label: 'Condition', key: 'condition', icon: CheckCircle },
    { label: 'Warranty', key: 'warranty', icon: Shield },
    { label: 'Location', key: 'location', icon: Truck },
    { 
      label: 'Rating', 
      key: 'rating', 
      icon: Star,
      format: (val) => val ? `${val}/5` : 'N/A'
    },
  ]

  // Find the best value (lowest price)
  const lowestPrice = items.length > 0 ? Math.min(...items.map(i => i.price)) : 0

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-[58px]">
        <div className="py-12 pb-20">
          <div className="mx-auto max-w-7xl px-4">
            {/* Page header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-balance">Parts Comparison</h1>
                  <p className="text-muted-foreground text-sm">Compare up to 5 parts side-by-side to find the best match</p>
                </div>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 border border-border/50 rounded-2xl bg-card">
                <Scale className="w-16 h-16 mb-4 text-muted-foreground/40" />
                <h2 className="text-2xl font-semibold mb-2">No parts to compare</h2>
                <p className="text-muted-foreground mb-6">Add parts from our catalog to start comparing specifications and prices</p>
                <Link href="/makes" className="auapw-btn auapw-btn-blue auapw-btn-lg">
                  Browse All Parts
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* Parts cards row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {items.map((item) => {
                    const isBestPrice = item.price === lowestPrice && items.length > 1
                    return (
                      <div 
                        key={item.id} 
                        className={`relative rounded-2xl border bg-card overflow-hidden ${
                          isBestPrice ? 'border-green-500/50 ring-2 ring-green-500/20' : 'border-border/50'
                        }`}
                      >
                        {/* Best price badge */}
                        {isBestPrice && (
                          <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                            Best Price
                          </div>
                        )}
                        
                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-500/80 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        {/* Part image */}
                        <div className="relative h-32 bg-gradient-to-br from-muted/60 to-muted/30">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-muted-foreground/30">
                                {item.name.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Part info */}
                        <div className="p-4">
                          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">{item.make}</p>
                          <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2">{item.name}</h3>
                          
                          {/* Rating */}
                          {item.rating && (
                            <div className="flex items-center gap-1 mb-3">
                              {[1,2,3,4,5].map(s => (
                                <Star 
                                  key={s} 
                                  className={`w-3 h-3 ${s <= Math.round(item.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} 
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">{item.rating}</span>
                            </div>
                          )}
                          
                          {/* Price */}
                          <p className={`text-xl font-black mb-4 ${isBestPrice ? 'text-green-500' : 'text-foreground'}`}>
                            ${item.price.toLocaleString()}
                          </p>
                          
                          {/* Action buttons */}
                          <div className="space-y-2">
                            <button
                              onClick={() => handleBuyNow(item)}
                              className="auapw-btn auapw-btn-green auapw-btn-sm w-full justify-center"
                            >
                              <Zap className="w-3.5 h-3.5" />
                              Buy Now
                            </button>
                            <button
                              onClick={() => handleAddToCart(item)}
                              disabled={addedToCart === item.id}
                              className="auapw-btn auapw-btn-amber auapw-btn-sm w-full justify-center disabled:opacity-70"
                            >
                              {addedToCart === item.id ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Added!
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-3.5 h-3.5" />
                                  Add to Cart
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  
                  {/* Add more slot */}
                  {canAddMore() && (
                    <Link
                      href="/makes"
                      className="flex flex-col items-center justify-center min-h-[320px] rounded-2xl border-2 border-dashed border-border/50 bg-card/50 hover:bg-card hover:border-primary/40 transition-all"
                    >
                      <Plus className="w-10 h-10 text-muted-foreground/40 mb-3" />
                      <p className="text-sm font-semibold text-muted-foreground">Add Part</p>
                      <p className="text-xs text-muted-foreground/60">{5 - items.length} slots remaining</p>
                    </Link>
                  )}
                </div>

                {/* Specifications comparison table */}
                <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/50 bg-card/80">
                    <h2 className="text-lg font-bold">Specifications Comparison</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="p-4 text-left text-sm font-semibold text-muted-foreground sticky left-0 bg-card min-w-[160px]">
                            Specification
                          </th>
                          {items.map((item) => (
                            <th key={item.id} className="p-4 text-center text-sm font-semibold min-w-[180px] border-l border-border/30">
                              {item.name.split(' ').slice(0, 2).join(' ')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Price row */}
                        <tr className="border-b border-border/30 bg-primary/5">
                          <td className="p-4 font-semibold sticky left-0 bg-primary/5">Price</td>
                          {items.map((item) => {
                            const isBestPrice = item.price === lowestPrice && items.length > 1
                            return (
                              <td key={item.id} className="p-4 text-center border-l border-border/30">
                                <p className={`text-xl font-black ${isBestPrice ? 'text-green-500' : 'text-foreground'}`}>
                                  ${item.price.toLocaleString()}
                                </p>
                                {isBestPrice && (
                                  <span className="text-xs text-green-500 font-semibold">Best Value</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>

                        {/* Specs rows */}
                        {specs.map((spec) => (
                          <tr key={spec.key} className="border-b border-border/30">
                            <td className="p-4 sticky left-0 bg-card">
                              <div className="flex items-center gap-2">
                                {spec.icon && <spec.icon className="w-4 h-4 text-muted-foreground" />}
                                <span className="text-sm text-muted-foreground">{spec.label}</span>
                              </div>
                            </td>
                            {items.map((item) => {
                              const value = item[spec.key]
                              const displayValue = spec.format ? spec.format(value) : (value || 'N/A')
                              return (
                                <td key={item.id} className="p-4 text-center border-l border-border/30">
                                  <p className="text-sm font-medium">{String(displayValue)}</p>
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick add suggestions */}
                {canAddMore() && mockParts.filter((p) => !items.find((i) => i.id === p.id)).length > 0 && (
                  <div className="rounded-2xl border border-border/50 bg-card p-6">
                    <h3 className="font-bold mb-4">Add More Parts to Compare</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {mockParts
                        .filter((p) => !items.find((i) => i.id === p.id))
                        .slice(0, 6)
                        .map((part) => (
                          <button
                            key={part.id}
                            onClick={() => handleAddPartToComparison(part.id)}
                            className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background hover:bg-card hover:border-primary/40 transition-all text-left"
                          >
                            <div>
                              <p className="font-medium text-sm truncate">{part.name}</p>
                              <p className="text-xs text-muted-foreground">{part.make} · ${part.price.toLocaleString()}</p>
                            </div>
                            <Plus className="w-4 h-4 text-primary flex-shrink-0 ml-2" />
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Bottom actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
                  <button
                    onClick={clearComparison}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All Comparisons
                  </button>
                  <div className="flex gap-3">
                    <Link href="/makes" className="auapw-btn auapw-btn-silver auapw-btn-sm">
                      Browse More Parts
                    </Link>
                    <Link href="/cart" className="auapw-btn auapw-btn-blue auapw-btn-sm">
                      <ShoppingCart className="w-4 h-4" />
                      View Cart
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <BrandLogosSection />
      </main>
      <Footer />
    </>
  )
}

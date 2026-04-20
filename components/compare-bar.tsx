"use client"

import { useComparisonStore } from "@/lib/stores/comparison-store"
import Link from "next/link"
import Image from "next/image"
import { X, GitCompareArrows, Trash2 } from "lucide-react"

export function CompareBar() {
  const { items, removeItem, clearComparison, getCount } = useComparisonStore()
  const count = getCount()

  if (count === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0a0f] via-[#12121a] to-[#0a0a0f] border-t border-white/10 shadow-2xl">
      {/* Chrome highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Compare icon and count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30">
              <GitCompareArrows className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Compare Parts</p>
              <p className="text-xs text-muted-foreground">{count} of 5 selected</p>
            </div>
          </div>

          {/* Center: Part thumbnails */}
          <div className="hidden sm:flex items-center gap-2 flex-1 justify-center max-w-xl overflow-x-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative group flex-shrink-0 w-14 h-14 rounded-lg bg-card border border-border/50 overflow-hidden"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-xs text-muted-foreground">{item.name.slice(0, 2)}</span>
                  </div>
                )}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove ${item.name} from comparison`}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            {/* Empty slots */}
            {Array.from({ length: 5 - count }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex-shrink-0 w-14 h-14 rounded-lg border-2 border-dashed border-border/30 flex items-center justify-center"
              >
                <span className="text-xs text-muted-foreground">+</span>
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={clearComparison}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-white transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <Link
              href="/comparison"
              className="auapw-btn auapw-btn-blue auapw-btn-sm"
            >
              <GitCompareArrows className="w-4 h-4" />
              <span>Compare Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

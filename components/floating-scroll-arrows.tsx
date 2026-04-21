'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export function FloatingScrollArrows() {
  const [showUp, setShowUp] = useState(false)
  const [showDown, setShowDown] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      setShowUp(scrollTop > 300)
      setShowDown(scrollTop + winHeight < docHeight - 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="fixed right-4 sm:right-6 bottom-24 sm:bottom-32 z-40 flex flex-col gap-3 pointer-events-none">
      {/* Scroll Up Button - Modern Glass Effect */}
      {showUp && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="pointer-events-auto group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl 
            bg-gradient-to-br from-white/20 to-white/10 
            hover:from-white/30 hover:to-white/20
            shadow-xl hover:shadow-2xl
            border border-white/40 hover:border-white/60
            backdrop-blur-xl
            transition-all duration-300 ease-out
            flex items-center justify-center
            hover:scale-110 hover:-translate-y-1
            animate-in fade-in slide-in-from-bottom-3 duration-500"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md group-hover:scale-125 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-t from-white/10 to-transparent transition-opacity duration-300" />
        </button>
      )}

      {/* Scroll Down Button - Modern Glass Effect */}
      {showDown && (
        <button
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          className="pointer-events-auto group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl 
            bg-gradient-to-br from-white/20 to-white/10 
            hover:from-white/30 hover:to-white/20
            shadow-xl hover:shadow-2xl
            border border-white/40 hover:border-white/60
            backdrop-blur-xl
            transition-all duration-300 ease-out
            flex items-center justify-center
            hover:scale-110 hover:translate-y-1
            animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md group-hover:scale-125 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/10 to-transparent transition-opacity duration-300" />
        </button>
      )}
    </div>
  )
}

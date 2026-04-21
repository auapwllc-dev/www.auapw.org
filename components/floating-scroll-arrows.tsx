'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export function FloatingScrollArrows() {
  const [isVisible, setIsVisible] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(true)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      setCanScrollDown(scrollTop < docHeight - winHeight - 100)
    }

    window.addEventListener('scroll', toggleVisibility)
    toggleVisibility()
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="fixed right-4 sm:right-6 bottom-20 sm:bottom-24 z-40 flex flex-col gap-3">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
        title="Scroll to top"
        style={{
          background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.9) 0%, rgba(50, 150, 255, 0.95) 100%)',
          boxShadow: '0 8px 32px rgba(100, 200, 255, 0.4), 0 0 20px rgba(100, 200, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(200, 230, 255, 0.3)',
        }}
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" strokeWidth={2.5} />
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />
      </button>

      {/* Scroll to bottom button */}
      <button
        onClick={scrollToBottom}
        className={`group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full transition-all duration-300 ${
          canScrollDown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
        style={{
          background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.9) 0%, rgba(50, 150, 255, 0.95) 100%)',
          boxShadow: '0 8px 32px rgba(100, 200, 255, 0.4), 0 0 20px rgba(100, 200, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(200, 230, 255, 0.3)',
        }}
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" strokeWidth={2.5} />
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />
      </button>
    </div>
  )
}

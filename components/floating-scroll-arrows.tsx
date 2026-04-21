'use client'

import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

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
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="fixed right-4 sm:right-6 bottom-6 sm:bottom-10 z-40 flex flex-col gap-3 sm:gap-4">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 group ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.9) 0%, rgba(37,99,235,0.9) 100%)',
          boxShadow: '0 10px 30px rgba(59,130,246,0.3), inset 0 1px 1px rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
        }}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 rounded-xl group-hover:bg-white/10 transition-all" />
      </button>

      {/* Scroll to bottom button */}
      <button
        onClick={scrollToBottom}
        className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 group ${
          canScrollDown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.9) 0%, rgba(37,99,235,0.9) 100%)',
          boxShadow: '0 10px 30px rgba(59,130,246,0.3), inset 0 1px 1px rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
        }}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
      >
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 rounded-xl group-hover:bg-white/10 transition-all" />
      </button>
    </div>
  )
}

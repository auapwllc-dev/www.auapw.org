'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export function FloatingScrollArrows() {
  const [isVisible, setIsVisible] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(true)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show arrows if page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Check if we can scroll down
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
    <div className="fixed right-6 bottom-8 sm:right-8 sm:bottom-12 z-40 flex flex-col gap-2">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/90 hover:bg-primary text-white shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Scroll to bottom button */}
      <button
        onClick={scrollToBottom}
        className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/90 hover:bg-primary text-white shadow-lg backdrop-blur-sm transition-all duration-300 ${
          canScrollDown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
      >
        <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </div>
  )
}

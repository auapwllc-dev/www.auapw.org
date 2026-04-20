'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/theme-provider'

export function MobileThemeFab() {
  const { resolvedTheme, setTheme } = useTheme()
  const [side, setSide] = useState<'left' | 'right'>('right')
  const [dragging, setDragging] = useState(false)
  const [mounted, setMounted] = useState(false)
  const startX = useRef(0)
  const hasDragged = useRef(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('auapw-fab-side')
      if (saved === 'left' || saved === 'right') setSide(saved as 'left' | 'right')
    } catch { /* noop */ }
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  function handleToggle() {
    if (hasDragged.current) return
    setTheme(isDark ? 'light' : 'dark')
  }

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX
    hasDragged.current = false
    setDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 20) {
      hasDragged.current = true
      const newSide = e.clientX < window.innerWidth / 2 ? 'left' : 'right'
      setSide(newSide)
      try { localStorage.setItem('auapw-fab-side', newSide) } catch { /* noop */ }
    }
  }

  function onPointerUp() {
    setDragging(false)
  }

  return (
    <div
      className={`
        fixed bottom-5 z-[9990] sm:hidden
        flex flex-col items-center gap-2
        ${side === 'right' ? 'right-3' : 'left-3'}
        transition-[left,right] duration-300
      `}
      style={{ touchAction: 'none' }}
    >

      {/* ── GET QUOTE floating button ── */}
      <Link
        href="/quote"
        className="get-quote-fab"
        title="Get Free Quote"
        aria-label="Get a free quote"
      >
        {/* Envelope icon */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
          <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <span className="text-[0.6rem] font-black uppercase tracking-wide leading-none">Quote</span>
      </Link>

      {/* ── CALL floating button ── */}
      <a
        href="tel:8888185001"
        className="call-fab"
        title="Call (888) 818-5001"
        aria-label="Call us at 888-818-5001"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
        </svg>
        <span className="text-[0.6rem] font-black uppercase tracking-wide leading-none">Call</span>
      </a>

      {/* ── DARK / LIGHT MODE toggle (draggable) ── */}
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={handleToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
        className={`
          relative flex items-center
          w-14 h-7 rounded-full
          cursor-pointer select-none
          transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
          ${dragging ? 'scale-110' : 'scale-100'}
        `}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : 'linear-gradient(135deg, #ffd700 0%, #ff9500 50%, #ff6b35 100%)',
          boxShadow: isDark
            ? '0 0 0 1.5px rgba(100,120,200,0.45), 0 4px 16px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.08)'
            : '0 0 0 1.5px rgba(255,180,50,0.6), 0 4px 16px rgba(255,150,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
        }}
      >
        {/* Background dots */}
        <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          {[{ t: '15%', l: '18%' }, { t: '55%', l: '28%' }, { t: '30%', l: '45%' }, { t: '20%', l: '62%' }].map((s, i) => (
            <span key={i} className="absolute w-0.5 h-0.5 rounded-full bg-white/60"
              style={{ top: s.t, left: s.l }} />
          ))}
        </span>

        {/* Thumb */}
        <span
          className={`
            absolute top-0.5 w-6 h-6 rounded-full
            flex items-center justify-center
            transition-all duration-300 shadow-lg
            ${isDark ? 'left-0.5' : 'left-[1.875rem]'}
          `}
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #c8d8f0 0%, #e8eef8 40%, #b0c4de 100%)'
              : 'linear-gradient(135deg, #fff8e1 0%, #fffde7 40%, #fff176 100%)',
            boxShadow: isDark
              ? 'inset -1.5px -1px 0 2px rgba(180,200,240,0.5), 0 2px 8px rgba(0,0,0,0.4)'
              : '0 0 10px rgba(255,200,0,0.7), 0 2px 8px rgba(255,140,0,0.4)',
          }}
        >
          {isDark ? (
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="rgba(60,80,140,0.9)" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <circle cx="12" cy="12" r="5" fill="rgba(255,160,0,0.95)" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <line key={i}
                  x1={12 + 7.5 * Math.cos(deg * Math.PI / 180)}
                  y1={12 + 7.5 * Math.sin(deg * Math.PI / 180)}
                  x2={12 + 9.5 * Math.cos(deg * Math.PI / 180)}
                  y2={12 + 9.5 * Math.sin(deg * Math.PI / 180)}
                  stroke="rgba(255,140,0,0.9)" strokeWidth="1.5" strokeLinecap="round"
                />
              ))}
            </svg>
          )}
        </span>
      </button>

      {/* Side indicator */}
      <div className="flex justify-center gap-1">
        <span className={`w-1 h-1 rounded-full transition-all duration-300 ${side === 'left' ? 'bg-primary scale-125' : 'bg-white/20'}`} />
        <span className={`w-1 h-1 rounded-full transition-all duration-300 ${side === 'right' ? 'bg-primary scale-125' : 'bg-white/20'}`} />
      </div>
    </div>
  )
}

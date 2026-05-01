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
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 18) {
      hasDragged.current = true
      const newSide = e.clientX < window.innerWidth / 2 ? 'left' : 'right'
      if (newSide !== side) {
        setSide(newSide)
        try { localStorage.setItem('auapw-fab-side', newSide) } catch { /* noop */ }
      }
    }
  }

  function onPointerUp() {
    setDragging(false)
  }

  return (
    <div
      className={`
        fixed bottom-6 z-[9990] sm:hidden
        flex flex-col items-end gap-2.5
        ${side === 'right' ? 'right-3' : 'left-3'}
      `}
      style={{
        transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1), right 0.35s cubic-bezier(0.4,0,0.2,1)',
        touchAction: 'none',
      }}
    >

      {/* ── GET QUOTE button ── */}
      <Link
        href="/quote"
        title="Get Free Quote"
        aria-label="Get a free quote"
        className="fab-btn-wide"
        style={{
          background: 'linear-gradient(160deg, #c8a84b 0%, #e8c96a 18%, #8b6914 38%, #5a4208 55%, #7a560f 72%, #c09a42 88%, #dab85a 100%)',
          boxShadow: '0 0 0 1.5px rgba(200,170,70,0.55), inset 0 2px 5px rgba(255,230,120,0.25), inset 0 -2px 5px rgba(0,0,0,0.5), 0 6px 20px rgba(0,0,0,0.55), 0 2px 6px rgba(180,140,30,0.35)',
        }}
      >
        <span className="fab-icon-ring" style={{ background: 'rgba(0,0,0,0.35)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(255,210,80,0.2)' }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ color: '#ffe580' }}>
            <rect x="2" y="4" width="20" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="fab-wide-label" style={{ color: '#ffe8a0', textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>
          GET A QUOTE
        </span>
        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 ml-1 flex-shrink-0" style={{ color: 'rgba(255,232,160,0.7)' }}>
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="fab-shimmer" />
      </Link>

      {/* ── CALL button ── */}
      <a
        href="tel:8888185001"
        title="Call (888) 818-5001"
        aria-label="Call us at 888-818-5001"
        className="fab-btn-wide"
        style={{
          background: 'linear-gradient(160deg, #1a8a3a 0%, #28c050 18%, #0d5a20 38%, #073814 55%, #0f4a1c 72%, #168030 88%, #22b048 100%)',
          boxShadow: '0 0 0 2px rgba(40,192,80,0.7), inset 0 2px 5px rgba(140,255,160,0.25), inset 0 -2px 5px rgba(0,0,0,0.5), 0 6px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(30,160,60,0.5)',
        }}
      >
        <span className="fab-icon-ring" style={{ background: 'rgba(0,0,0,0.3)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4), 0 1px 3px rgba(80,255,120,0.25)' }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ color: '#78ffaa' }}>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
          </svg>
        </span>
        <span className="fab-wide-label" style={{ color: '#ccffe0', textShadow: '0 1px 4px rgba(0,0,0,0.8)', fontWeight: 900 }}>
          (888) 818-5001
        </span>
        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 ml-1 flex-shrink-0" style={{ color: 'rgba(180,255,210,0.7)' }}>
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="fab-shimmer" />
      </a>

      {/* ── VISIT WEBSITE button ── */}
      <a
        href="https://www.allautopartstore.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="Visit Our Website"
        aria-label="Visit our website allautopartstore.com"
        className="fab-btn-wide"
        style={{
          background: 'linear-gradient(160deg, #1a4a7a 0%, #2a6aaa 18%, #0d2e50 38%, #071c32 55%, #0f2a48 72%, #1a4070 88%, #2060a0 100%)',
          boxShadow: '0 0 0 1.5px rgba(60,130,220,0.6), inset 0 2px 5px rgba(100,180,255,0.2), inset 0 -2px 5px rgba(0,0,0,0.5), 0 6px 20px rgba(0,0,0,0.55), 0 2px 6px rgba(40,100,200,0.4)',
        }}
      >
        <span className="fab-icon-ring" style={{ background: 'rgba(0,0,0,0.32)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(100,180,255,0.2)' }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ color: '#80c8ff' }}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="fab-wide-label" style={{ color: '#b8e0ff', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
          VISIT WEBSITE
        </span>
        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 ml-1 flex-shrink-0" style={{ color: 'rgba(160,210,255,0.7)' }}>
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="fab-shimmer" />
      </a>

      {/* ── DARK / LIGHT toggle ── */}
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={handleToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
        className="fab-btn-wide"
        style={{
          background: isDark
            ? 'linear-gradient(160deg, #3a3f6a 0%, #4a52a0 18%, #1a1e40 38%, #0d1028 55%, #161b38 72%, #353a68 88%, #484e96 100%)'
            : 'linear-gradient(160deg, #e8a030 0%, #f8c860 18%, #a06010 38%, #7a4008 55%, #924e0e 72%, #d08828 88%, #f0b840 100%)',
          boxShadow: isDark
            ? '0 0 0 1.5px rgba(100,110,200,0.5), inset 0 2px 5px rgba(160,170,255,0.18), inset 0 -2px 5px rgba(0,0,0,0.5), 0 6px 20px rgba(0,0,0,0.6), 0 2px 6px rgba(80,90,180,0.35)'
            : '0 0 0 1.5px rgba(220,160,40,0.6), inset 0 2px 5px rgba(255,220,100,0.28), inset 0 -2px 5px rgba(0,0,0,0.45), 0 6px 20px rgba(0,0,0,0.4), 0 2px 6px rgba(200,130,20,0.4)',
          cursor: dragging ? 'grabbing' : 'pointer',
          transform: dragging ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.15s ease',
        }}
      >
        <span className="fab-icon-ring" style={{
          background: 'rgba(0,0,0,0.32)',
          boxShadow: isDark
            ? 'inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(160,170,255,0.18)'
            : 'inset 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(255,200,60,0.25)',
        }}>
          {isDark ? (
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ color: '#c8d4ff' }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="currentColor" opacity="0.9"/>
              <circle cx="16" cy="6" r="1" fill="rgba(255,255,255,0.6)"/>
              <circle cx="18.5" cy="9.5" r="0.6" fill="rgba(255,255,255,0.4)"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ color: '#ffe040' }}>
              <circle cx="12" cy="12" r="4.5" fill="currentColor"/>
              {[0,45,90,135,180,225,270,315].map((deg, i) => (
                <line key={i}
                  x1={12 + 7 * Math.cos(deg * Math.PI / 180)}
                  y1={12 + 7 * Math.sin(deg * Math.PI / 180)}
                  x2={12 + 9.5 * Math.cos(deg * Math.PI / 180)}
                  y2={12 + 9.5 * Math.sin(deg * Math.PI / 180)}
                  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                />
              ))}
            </svg>
          )}
        </span>
        <span className="fab-wide-label" style={{
          color: isDark ? '#c0cafe' : '#fff0b0',
          textShadow: '0 1px 3px rgba(0,0,0,0.7)',
        }}>
          {isDark ? 'LIGHT MODE' : 'DARK MODE'}
        </span>
        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 ml-1 flex-shrink-0" style={{ color: isDark ? 'rgba(192,202,254,0.6)' : 'rgba(255,240,176,0.6)' }}>
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="fab-shimmer" />
      </button>

      {/* Drag indicator dots */}
      <div className="flex justify-end gap-1.5 mt-0.5 pr-1">
        <span className={`rounded-full transition-all duration-300 ${side === 'left' ? 'w-3 h-1.5 bg-primary/80' : 'w-1.5 h-1.5 bg-white/20'}`} />
        <span className={`rounded-full transition-all duration-300 ${side === 'right' ? 'w-3 h-1.5 bg-primary/80' : 'w-1.5 h-1.5 bg-white/20'}`} />
      </div>
    </div>
  )
}

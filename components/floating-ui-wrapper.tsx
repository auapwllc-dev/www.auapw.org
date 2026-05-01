"use client"

import dynamic from 'next/dynamic'

// Dynamic imports with ssr: false to prevent hydration mismatch
const MobileThemeFab = dynamic(
  () => import('@/components/mobile-theme-fab').then((mod) => mod.MobileThemeFab),
  { ssr: false }
)
const FloatingScrollArrows = dynamic(
  () => import('@/components/floating-scroll-arrows').then((mod) => mod.FloatingScrollArrows),
  { ssr: false }
)

export function FloatingUIWrapper() {
  return (
    <>
      <MobileThemeFab />
      <FloatingScrollArrows />
    </>
  )
}

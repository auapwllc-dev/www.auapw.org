import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Oxanium as V0_Font_Oxanium, Source_Code_Pro as V0_Font_Source_Code_Pro, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _oxanium = V0_Font_Oxanium({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800"] })
const _sourceCodePro = V0_Font_Source_Code_Pro({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://auapw.org'),
  title: {
    default: 'AUAPW — Quality Used Auto Parts | Engines, Transmissions & More',
    template: '%s | AUAPW.ORG',
  },
  description:
    'AUAPW.ORG — Premium quality used auto parts. Shop engines, transmissions, body parts and more from 2,000+ verified salvage yards nationwide. Free shipping, 6-month warranty.',
  keywords: [
    'used auto parts',
    'used engines',
    'used transmissions',
    'salvage yard',
    'auto parts warehouse',
    'OEM replacement parts',
  ],
  alternates: { canonical: 'https://auapw.org' },
  openGraph: {
    type: 'website',
    url: 'https://auapw.org',
    siteName: 'AUAPW.ORG',
    title: 'AUAPW — Quality Used Auto Parts',
    description:
      'Premium quality used auto parts from 2,000+ verified salvage yards. Free shipping, 6-month warranty.',
    images: [{ url: '/images/hero-warehouse.jpg', width: 1200, height: 630, alt: 'AUAPW warehouse' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AUAPW — Quality Used Auto Parts',
    description:
      'Premium quality used auto parts from 2,000+ verified salvage yards. Free shipping, 6-month warranty.',
    images: ['/images/hero-warehouse.jpg'],
  },
  robots: { index: true, follow: true },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

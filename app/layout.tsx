import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'
import { MobileThemeFab } from '@/components/mobile-theme-fab'
import './globals.css'

// Enable ISR with 60 second revalidation for all pages
export const revalidate = 60

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.auapw.org'),
  title: 'AUAPW.ORG - Quality Used Auto Parts | Engines, Transmissions & More',
  description: 'AUAPW.ORG - Your trusted source for quality used auto parts. Shop engines, transmissions, body parts and more from 2,000+ verified salvage yards nationwide. Free shipping, 6-month warranty.',
  generator: 'v0.dev',
  applicationName: 'AUAPW.ORG',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://www.auapw.org',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.auapw.org',
    siteName: 'AUAPW.ORG',
    title: 'AUAPW.ORG - Quality Used Auto Parts | Engines, Transmissions & More',
    description: 'Your trusted source for quality used auto parts. Shop engines, transmissions, body parts and more from 2,000+ verified salvage yards nationwide.',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AUAPW.ORG - Quality Used Auto Parts',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@auapworg',
    title: 'AUAPW.ORG - Quality Used Auto Parts',
    description: 'Your trusted source for quality used auto parts. Engines, transmissions, body parts and more from 2,000+ verified salvage yards.',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'AUAPW.ORG',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1117' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Script to prevent flash of wrong theme
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('auapw-theme');
        var resolved = theme;
        if (!theme || theme === 'system') {
          resolved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        document.documentElement.classList.add(resolved);
      } catch (e) {
        document.documentElement.classList.add('dark');
      }
    })();
  `

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https: http: *; font-src 'self' data: https:; connect-src 'self' https: wss: http:; frame-src 'self' https:; frame-ancestors *; base-uri 'self'; form-action 'self' https: mailto:; media-src 'self' https:;" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${roboto.variable} font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <MobileThemeFab />
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import {
  Oxanium as V0_Font_Oxanium,
  Source_Code_Pro as V0_Font_Source_Code_Pro,
  Source_Serif_4 as V0_Font_Source_Serif_4,
} from "next/font/google"
import "./globals.css"

const oxanium = V0_Font_Oxanium({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-oxanium",
  display: "swap",
})

const sourceCodePro = V0_Font_Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-source-code-pro",
  display: "swap",
})

const sourceSerif4 = V0_Font_Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-source-serif-4",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://auapw.org"),
  title: {
    default: "AUAPW - All Used Auto Parts Warehouse | Premium Quality Used Auto Parts",
    template: "%s | AUAPW",
  },
  description:
    "Find genuine OEM used engines, transmissions, and auto parts from 2,000+ verified salvage yards nationwide. Save up to 70% with free shipping and a 12-month warranty.",
  keywords: [
    "used auto parts",
    "used engines",
    "used transmissions",
    "auto parts warehouse",
    "salvage yards",
    "OEM parts",
    "AUAPW",
  ],
  openGraph: {
    title: "AUAPW - All Used Auto Parts Warehouse",
    description:
      "Premium quality used auto parts from 2,000+ verified salvage yards. Free shipping. 12-month warranty.",
    url: "https://auapw.org",
    siteName: "AUAPW",
    images: [{ url: "/images/auapw-logo.jpeg", width: 512, height: 512, alt: "AUAPW Logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUAPW - All Used Auto Parts Warehouse",
    description: "Premium quality used auto parts from 2,000+ verified salvage yards.",
    images: ["/images/auapw-logo.jpeg"],
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d53c3c" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${oxanium.variable} ${sourceCodePro.variable} ${sourceSerif4.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

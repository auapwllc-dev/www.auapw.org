import Link from "next/link"
import { CAR_MAKES, PART_CATEGORIES, PHONE_DISPLAY, CONTACT_EMAIL } from "@/lib/data"
import { Phone, Mail, MapPin } from "lucide-react"
import { BrandWordmark } from "@/components/brand-wordmark"
import { Logo } from "@/components/logo"

export function Footer() {
  const popularPartLinks = [
    { label: "Complete Engine", href: "/parts/engines" },
    { label: "Long Block Engine", href: "/parts/engines" },
    { label: "Automatic Transmission", href: "/parts/transmissions" },
    { label: "Manual Transmission", href: "/parts/transmissions" },
    { label: "Axle Assembly Front", href: "/parts/drivetrain" },
    { label: "Axle Assembly Rear", href: "/parts/drivetrain" },
  ]
  const popularMakes = CAR_MAKES.slice(0, 8)

  return (
    <footer
      className="backdrop-blur-xl border-t relative overflow-hidden w-full automotive-pattern footer-dark-permanent"
      style={{
        /* Force dark mode CSS variables regardless of light/dark theme */
        '--background':        '#080808',
        '--foreground':        '#e8eaf0',
        '--card':              '#111216',
        '--card-foreground':   '#e8eaf0',
        '--primary':           '#d0d4e0',
        '--primary-foreground':'#0a0a0c',
        '--secondary':         '#1c1e26',
        '--secondary-foreground':'#c8ccd8',
        '--muted':             '#181a22',
        '--muted-foreground':  '#7a7f90',
        '--border':            '#22252f',
        '--accent':            '#4a5568',
        '--accent-foreground': '#ffffff',
        backgroundColor:       '#0d0f14',
        borderColor:           '#22252f',
        color:                 '#e8eaf0',
      } as React.CSSProperties}
    >
      {/* Popular Brands Section */}
      <div className="w-full border-b border-border/20 px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <h3 className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-foreground mb-4 sm:mb-6 text-3d-section">
            Popular Brands
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CAR_MAKES.slice(0, 12).map((make) => (
              <Link
                key={make}
                href={`/makes/${encodeURIComponent(make.toLowerCase().replace(/\s+/g, "-"))}`}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border border-border/40 hover:border-primary/60 bg-background/40 hover:bg-background/60 text-xs font-black tracking-tight text-foreground/80 hover:text-foreground transition-all duration-200"
              >
                {make}
              </Link>
            ))}
            <Link
              href="/makes"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border border-border/40 hover:border-primary/60 bg-background/40 hover:bg-background/60 text-xs font-black tracking-tight text-foreground/80 hover:text-foreground transition-all duration-200"
            >
              +MORE
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-8 lg:gap-10 py-6 sm:py-10 lg:py-14">
          {/* Brand Section */}
          <div className="lg:col-span-1 pb-3 sm:pb-0">
            <div className="flex flex-col items-start gap-3 sm:gap-4">
              {/* Logo icon only */}
              <div 
                className="flex items-center justify-center flex-shrink-0"
                style={{ 
                  width: 'clamp(2.5rem, 8vw, 4rem)', 
                  height: 'clamp(2.5rem, 8vw, 4rem)' 
                }}
              >
                <Logo size="sm" priority variant="default" />
              </div>
              
              {/* Tagline - fluid text size */}
              <p 
                className="leading-relaxed footer-steel-text"
                style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)' }}
              >
                Premium quality used auto parts from 2,000+ verified yards nationwide. 30-180 day warranty on every part.
              </p>
              
              {/* Contact Buttons - compact and responsive */}
              <div className="flex flex-col gap-1.5 w-full" style={{ maxWidth: 'clamp(12rem, 50vw, 16rem)' }}>
                <a 
                  href="tel:8888185001" 
                  className="auapw-btn auapw-btn-green auapw-btn-sm flex items-center gap-1.5"
                  style={{ padding: 'clamp(0.35rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)', fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)' }}
                >
                  <Phone className="flex-shrink-0" style={{ width: 'clamp(0.65rem, 1.5vw, 0.875rem)', height: 'clamp(0.65rem, 1.5vw, 0.875rem)' }} />
                  <span className="truncate font-bold">(888) 818-5001</span>
                </a>
                <a 
                  href="mailto:support@auapw.org" 
                  className="auapw-btn auapw-btn-teal auapw-btn-sm flex items-center gap-1.5"
                  style={{ padding: 'clamp(0.35rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)', fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)' }}
                >
                  <Mail className="flex-shrink-0" style={{ width: 'clamp(0.65rem, 1.5vw, 0.875rem)', height: 'clamp(0.65rem, 1.5vw, 0.875rem)' }} />
                  <span className="truncate font-bold">support@auapw.org</span>
                </a>
                <a 
                  href="mailto:info@auapw.org" 
                  className="auapw-btn auapw-btn-silver auapw-btn-sm flex items-center gap-1.5"
                  style={{ padding: 'clamp(0.35rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)', fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)' }}
                >
                  <Mail className="flex-shrink-0" style={{ width: 'clamp(0.65rem, 1.5vw, 0.875rem)', height: 'clamp(0.65rem, 1.5vw, 0.875rem)' }} />
                  <span className="truncate font-bold">info@auapw.org</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=107+Myrtle+Ave+Woodbine+NJ+08270" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="auapw-btn auapw-btn-outline auapw-btn-sm flex items-center gap-1.5"
                  style={{ padding: 'clamp(0.35rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)', fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)' }}
                >
                  <MapPin className="flex-shrink-0" style={{ width: 'clamp(0.65rem, 1.5vw, 0.875rem)', height: 'clamp(0.65rem, 1.5vw, 0.875rem)' }} />
                  <span className="truncate font-bold">Woodbine, NJ</span>
                </a>
              </div>
            </div>
          </div>

          {/* Popular Parts */}
          <div className="embossed-col p-3">
            <h3 className="text-xs sm:text-sm font-black mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-primary/30 inline-block">
              Popular Parts
            </h3>
            <ul className="space-y-2">
              {popularPartLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-xs font-black block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Makes */}
          <div className="embossed-col p-3">
            <h3 className="text-xs sm:text-sm font-black mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-primary/30 inline-block">
              Popular Makes
            </h3>
            <ul className="space-y-2">
              {popularMakes.map((make) => (
                <li key={make}>
                  <Link 
                    href={`/makes/${encodeURIComponent(make.toLowerCase().replace(/\s+/g, "-"))}`} 
                    className="text-xs font-black block"
                  >
                    {make}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="embossed-col p-3">
            <h3 className="text-xs sm:text-sm font-black mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-primary/30 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Used Engines", href: "/used-engines" },
                { label: "Used Transmissions", href: "/used-transmissions" },
                { label: "Inventory", href: "/inventory" },
                { label: "All Parts", href: "/parts" },
                { label: "Blog", href: "/blog" },
                { label: "About Us", href: "/about" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-xs font-black block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Legal */}
          <div className="embossed-col p-3">
            <h3 className="text-xs sm:text-sm font-black mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-primary/30 inline-block">
              Policies & Legal
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Return Policy", href: "/return-policy" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Acceptable Use", href: "/acceptable-use" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-xs font-black block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Secure Payments Bar */}
      <div className="border-t border-border/20 bg-background/40">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6">
          <span className="text-xs font-black tracking-widest uppercase footer-copyright">Secure Payments</span>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            {/* Visa */}
            <div className="h-8 px-2 rounded bg-white flex items-center justify-center" title="Visa">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 500" className="h-5 w-auto">
                <path fill="#1434CB" d="M290.8 378.8h-62.4l39-241.6h62.4zM524.4 144.8c-12.4-4.8-31.6-10-55.6-10-61.2 0-104.4 32.4-104.8 78.8-.4 34.4 30.8 53.6 54.4 65.2 24 11.8 32 19.4 32 30-.2 16.2-19.2 23.6-36.8 23.6-24.8 0-38-3.6-58.4-12.4l-8-3.8-8.8 54c14.6 6.6 41.4 12.4 69.2 12.8 65.2 0 107.6-32 108-81.2.2-27.2-16.2-47.8-51.6-64.8-21.6-11-34.8-18.4-34.6-29.6 0-9.8 11.2-20.4 35.2-20.4 20-.4 34.6 4.2 45.8 9l5.6 2.6 8.4-51.8zM671.2 137.2H622c-15.2 0-26.6 4.4-33.2 20.4L499.2 378.8h65.2s10.6-29.4 13-35.8c7 0 69.4.2 78.4.2 1.8 8.4 7.4 35.6 7.4 35.6h57.6L671.2 137.2zm-76.4 160c5-13.6 24.4-66.2 24.4-66.2-.4.6 5-13.6 8.2-22.4l4.2 20.2s11.6 56.2 14.2 68.4h-51zm-399.6-160L133.6 307l-6.4-33c-11.2-38-46-79.2-85-99.8l55.6 204.4 65.6-.2 97.6-241.2h-65.8z"/>
                <path fill="#EB001B" d="M167.2 137.2H65.6l-.8 4.8c78.8 20.2 130.8 68.8 152.4 127.4l-22-111.8c-3.6-15.6-15-20-28-20.4z"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="h-8 px-2 rounded bg-white flex items-center justify-center" title="Mastercard">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.4 108" className="h-5 w-auto">
                <rect width="152.4" height="108" rx="8" fill="white"/>
                <circle cx="58.8" cy="54" r="32.4" fill="#EB001B"/>
                <circle cx="93.6" cy="54" r="32.4" fill="#F79E1B"/>
                <path d="M76.2 28.8a32.4 32.4 0 0 1 0 50.4 32.4 32.4 0 0 1 0-50.4z" fill="#FF5F00"/>
              </svg>
            </div>
            {/* PayPal */}
            <div className="h-8 px-2 rounded bg-white flex items-center justify-center" title="PayPal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 33" className="h-5 w-auto">
                <path fill="#253B80" d="M46.2 6.8h-9.8c-.7 0-1.3.5-1.4 1.2l-4 25.2c-.1.5.3 1 .8 1h4.7c.7 0 1.3-.5 1.4-1.2l1.1-6.9c.1-.7.7-1.2 1.4-1.2h3.1c6.4 0 10.1-3.1 11.1-9.2.4-2.7 0-4.7-1.2-6.2-1.3-1.6-3.7-2.7-7.2-2.7z"/>
                <path fill="#179BD7" d="M78 6.8h-9.8c-.7 0-1.3.5-1.4 1.2l-4 25.2c-.1.5.3 1 .8 1h5c.5 0 .9-.4 1-.8l1.1-7.2c.1-.7.7-1.2 1.4-1.2h3.1c6.4 0 10.1-3.1 11.1-9.2.4-2.7 0-4.7-1.2-6.2-1.4-1.6-3.8-2.7-7.1-2.8z"/>
                <path fill="#253B80" d="M30 17.8c-.4 2.3-2.2 2.3-4 2.3h-1l.7-4.6c0-.3.3-.5.6-.5h.5c1.2 0 2.4 0 3 .7.3.4.5 1.1.2 2.1zM28.7 8.8h-7c-.5 0-1 .4-1 .9l-2.8 18c-.1.4.2.8.6.8h3.3c.5 0 1-.4 1-.9l.8-4.9c.1-.5.5-.9 1-.9h2.2c4.5 0 7.1-2.2 7.8-6.5.3-1.9 0-3.4-.9-4.4-1-1.2-2.7-2.1-5-2.1z"/>
              </svg>
            </div>
            {/* Discover */}
            <div className="h-8 px-2 rounded bg-white flex items-center justify-center" title="Discover">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 500" className="h-5 w-auto">
                <path fill="#231F20" d="M0 0h780v500H0z"/>
                <path fill="#F76F21" d="M605.5 250c0 89.4-72.6 161.9-162.1 161.9S281.3 339.4 281.3 250s72.6-161.9 162.1-161.9S605.5 160.6 605.5 250z"/>
                <path fill="white" d="M67 180.3h34c38.3 0 64.8 25 64.8 69.4 0 45.1-26.5 70.1-64.8 70.1H67V180.3zm31.5 112.4c26.1 0 42.8-17.3 42.8-43.2 0-25.9-16.7-42.2-42.8-42.2H91.4v85.4h7.1z"/>
                <path fill="white" d="M186.7 319.8h-24.3V180.3h24.3v139.5zM249 252.4c-14.7-5.4-19-10-19-18.4 0-9.2 9-16.1 21.5-16.1 8.5 0 15.6 3.5 22.8 11.5l12.7-16.6c-10.4-9.2-23.3-14.1-36.9-14.1-24 0-42 15.4-42 36.9 0 17.8 8.6 27 33.5 36.1 10.4 3.7 15.6 6.3 18.6 9 3.4 3.1 5.2 7.4 5.2 12.2 0 11.3-9 19.3-21.6 19.3-13.2 0-22.9-6-31.1-19.3l-14.9 15.6c11.2 16.4 25.5 23.7 47.4 23.7 27.4 0 46.6-17.6 46.6-43.1 0-20.7-9.6-31.2-42.8-42.7zM322.3 319.8H298V180.3h24.3v139.5z"/>
              </svg>
            </div>
            {/* American Express */}
            <div className="h-8 px-2 rounded bg-[#2E77BC] flex items-center justify-center" title="American Express">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 471" className="h-5 w-auto">
                <path fill="#2E77BC" d="M0 0h750v471H0z"/>
                <path fill="white" d="M151.5 181.8l-30.2 68.6h19l5.6-13.5h31.7l5.6 13.5h19.5l-30.2-68.6h-21zm9.9 17.6l10.3 24.3h-20.5l10.2-24.3zM230.2 250.4V181.8h28.1l16.9 46.2 16.6-46.2h27.9v68.6h-17.5V200l-19 50.4h-16.7l-19.1-50.4v50.4h-17.2zM344.4 250.4V181.8h56.8v15.2h-39.5v12h38.6v14.5h-38.6v12h39.5v14.9h-56.8zM422.5 250.4V181.8h31.8c16.5 0 28.7 4.5 28.7 20.5 0 8.3-4.3 15.2-12.4 17.9l15.1 30.2h-19.9l-12.6-27h-13.2v27h-17.5zm17.5-41.1h12.3c6.7 0 11.3-2.1 11.3-8.5 0-5.8-4-8-10.8-8h-12.8v16.5zM506.3 250.4V181.8h17.5v68.6h-17.5zM554.2 181.8v68.6h-17.5v-68.6h17.5zM588.2 250.4l-28.8-68.6h19.9l19 47.8 18.7-47.8h19.5l-28.9 68.6h-19.4zM649.5 250.4V181.8h56.8v15.2h-39.5v12h38.6v14.5h-38.6v12h39.5v14.9h-56.8z"/>
              </svg>
            </div>
            {/* Stripe */}
            <div className="h-8 px-2 rounded bg-[#635BFF] flex items-center justify-center" title="Stripe">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25" className="h-4 w-auto">
                <path fill="white" d="M59.6 13c0-4.2-2-7.4-5.9-7.4-3.9 0-6.3 3.2-6.3 7.4 0 4.9 2.8 7.4 6.8 7.4 1.9 0 3.4-.4 4.5-1.1v-3c-1.1.6-2.4 1-4 1-1.6 0-3-.6-3.1-2.5h7.9c0-.2.1-.9.1-1.8zm-8-1.5c0-1.9 1.1-2.6 2.1-2.6 1 0 2.1.7 2.1 2.6h-4.2zM41.4 5.6c-1.6 0-2.7.8-3.3 1.3l-.2-1H34v18.9l3.9-.8v-4.6c.6.4 1.5 1 3 1 3 0 5.7-2.4 5.7-7.6 0-4.8-2.8-7.2-5.2-7.2zm-.9 11.1c-1 0-1.6-.4-2-1v-5.3c.4-.5 1.1-.9 2-.9 1.5 0 2.6 1.7 2.6 3.6 0 2-.9 3.6-2.6 3.6zM27.7 4.8l3.9-.8V0l-3.9.8v4zM27.7 5.9h3.9V20H27.7zM23.6 7l-.2-1.1h-3.7V20h3.9v-9.5c.9-1.2 2.5-1 3-.8V5.9c-.6-.2-2.6-.5-3 1.1zM15.7 2.8l-3.8.8-.1 13.5c0 2.5 1.9 4.3 4.4 4.3 1.4 0 2.4-.3 2.9-.6V18c-.5.2-3.3 1-3.3-1.5V9.2h3.3V5.9h-3.3V2.8zM4.8 9.6C4.8 9 5.3 8.7 6.2 8.7c1.3 0 2.9.4 4.2 1.1V6.2C9.2 5.7 7.7 5.6 6.2 5.6 2.5 5.6 0 7.5 0 9.8c0 3.7 5.1 3.1 5.1 4.7 0 .7-.6 1-1.6 1-1.4 0-3.2-.6-4.6-1.4v3.6c1.6.7 3.1 1 4.6 1C7 18.7 9.5 16.9 9.5 14.4c0-4-5.1-3.2-4.7-4.8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6">
          <span className="text-xs sm:text-sm footer-copyright text-center sm:text-left">
            &copy; {new Date().getFullYear()} AUAPW.ORG — All Rights Reserved
          </span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { label: "Terms", href: "/terms" },
              { label: "Privacy", href: "/privacy-policy" },
              { label: "Shipping", href: "/shipping-policy" },
              { label: "Returns", href: "/return-policy" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-xs sm:text-sm footer-copyright transition-all duration-200">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

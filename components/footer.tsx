import Link from "next/link"
import { CAR_MAKES } from "@/lib/data"
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
    <footer className="bg-card/95 backdrop-blur-xl border-t border-border/30 relative overflow-hidden w-full automotive-pattern">
      {/* Popular Brands Section */}
      <div className="w-full border-b border-border/20 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <h3 className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-foreground mb-6 text-3d-section">
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
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-14 py-10 sm:py-14 lg:py-20">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
                  <Logo size="md" priority variant="default" />
                </div>
                <BrandWordmark size="footer" />
              </div>
              
              <p className="text-xs sm:text-sm leading-6 sm:leading-7 footer-steel-text">
                Premium quality used auto parts from 2,000+ verified yards nationwide. 30-180 day warranty on every part.
              </p>
              
              {/* Contact Buttons */}
              <div className="flex flex-col gap-2 w-full">
                <a href="tel:8888185001" className="auapw-btn auapw-btn-green auapw-btn-sm w-full">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">(888) 818-5001</span>
                </a>
                <a href="mailto:support@auapw.org" className="auapw-btn auapw-btn-teal auapw-btn-sm w-full">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">support@auapw.org</span>
                </a>
                <a href="mailto:info@auapw.org" className="auapw-btn auapw-btn-silver auapw-btn-sm w-full">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">info@auapw.org</span>
                </a>
                <a href="https://maps.google.com/?q=107+Myrtle+Ave+Woodbine+NJ+08270" target="_blank" rel="noopener noreferrer" className="auapw-btn auapw-btn-outline auapw-btn-sm w-full">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Woodbine, NJ</span>
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

      {/* Bottom bar */}
      <div className="border-t border-border/30 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
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

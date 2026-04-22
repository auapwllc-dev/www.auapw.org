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
    { label: "Alternator", href: "/parts/electrical" },
    { label: "Starter Motor", href: "/parts/electrical" },
    { label: "Radiator", href: "/parts/cooling" },
    { label: "AC Compressor", href: "/parts/cooling" },
  ]
  const popularMakes = CAR_MAKES.slice(0, 8)

  return (
    <footer className="bg-card/95 backdrop-blur-xl border-t border-border/30 relative overflow-hidden w-full automotive-pattern">
      {/* Top brand strip with logos */}
      <div className="border-b border-border/20 overflow-x-auto" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="text-[8px] sm:text-[9px] font-black tracking-[0.15em] uppercase text-3d-subtle whitespace-nowrap">Popular Brands</span>
            <div className="flex-1 h-px bg-border/30" />
          </div>
          <div className="flex flex-wrap gap-[3px] sm:gap-1 md:gap-1.5">
            {CAR_MAKES.slice(0, 12).map((brand) => (
              <Link
                key={brand}
                href={`/makes/${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, "-"))}`}
                className="chrome-brand-pill"
                title={`${brand} Parts`}
              >
                {brand}
              </Link>
            ))}
            <Link
              href="/makes"
              className="chrome-brand-pill"
              style={{ background: 'linear-gradient(165deg, rgba(120,160,200,0.4) 0%, rgba(40,80,120,0.3) 15%, rgba(15,25,40,0.95) 35%, rgba(8,15,25,1) 55%, rgba(12,20,35,0.97) 75%, rgba(40,80,120,0.3) 90%, rgba(120,160,200,0.4) 100%)', borderColor: 'rgba(100,150,200,0.4)', color: 'rgba(150,190,230,0.95)' }}
            >
              +More
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:gap-14 py-12 sm:py-16 lg:py-20">
          {/* Brand Section - Centered */}
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center gap-4">
                <Logo size="4xl" variant="default" />
                <BrandWordmark size="footer" />
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-semibold tracking-tight max-w-2xl px-4">
                Premium quality used auto parts from 2,000+ verified yards nationwide. 30-180 day warranty on every part.
              </p>
            </div>
            
            {/* Contact Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
              <a href="tel:8888185001" className="auapw-btn auapw-btn-green w-full">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">(888) 818-5001</span>
              </a>
              <a href="mailto:support@auapw.org" className="auapw-btn auapw-btn-teal w-full">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">support@auapw.org</span>
              </a>
              <a href="https://maps.google.com/?q=107+Myrtle+Ave+Woodbine+NJ+08270" target="_blank" rel="noopener noreferrer" className="auapw-btn auapw-btn-silver w-full">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Woodbine, NJ</span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

          {/* Link Sections - Single Column Stacked */}
          <div className="flex flex-col gap-10 sm:gap-12 w-full">
            {/* Popular Parts Section */}
            <div>
              <h3 className="text-sm font-black tracking-[0.2em] uppercase text-foreground mb-6 pb-3 border-b border-primary/30 inline-block">
                Popular Parts
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {popularPartLinks.slice(0, 6).map(({ label, href }) => (
                  <Link 
                    key={label} 
                    href={href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Makes Section */}
            <div>
              <h3 className="text-sm font-black tracking-[0.2em] uppercase text-foreground mb-6 pb-3 border-b border-primary/30 inline-block">
                Popular Makes
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                {popularMakes.map((make) => (
                  <Link 
                    key={make} 
                    href={`/makes/${encodeURIComponent(make.toLowerCase().replace(/\s+/g, "-"))}`} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {make}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-sm font-black tracking-[0.2em] uppercase text-foreground mb-6 pb-3 border-b border-primary/30 inline-block">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Used Engines", href: "/used-engines" },
                  { label: "Used Transmissions", href: "/used-transmissions" },
                  { label: "Inventory", href: "/inventory" },
                  { label: "All Parts", href: "/parts" },
                  { label: "Blog", href: "/blog" },
                  { label: "About Us", href: "/about" },
                ].map(({ label, href }) => (
                  <Link 
                    key={label} 
                    href={href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Policies Section */}
            <div>
              <h3 className="text-sm font-black tracking-[0.2em] uppercase text-foreground mb-6 pb-3 border-b border-primary/30 inline-block">
                Policies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms", href: "/terms" },
                  { label: "Shipping", href: "/shipping-policy" },
                  { label: "Returns", href: "/return-policy" },
                  { label: "Contact", href: "/contact" },
                ].map(({ label, href }) => (
                  <Link 
                    key={label} 
                    href={href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-semibold tracking-tight max-w-md px-4">
                Premium quality used auto parts from 2,000+ verified yards nationwide. 30-180 day warranty on every part.
              </p>
            </div>
            
            {/* Contact Buttons */}
            <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-xs">
              <a href="tel:8888185001" className="auapw-btn auapw-btn-green auapw-btn-sm w-full">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">(888) 818-5001</span>
              </a>
              <a href="mailto:support@auapw.org" className="auapw-btn auapw-btn-teal auapw-btn-sm w-full">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">support@auapw.org</span>
              </a>
              <a href="https://maps.google.com/?q=107+Myrtle+Ave+Woodbine+NJ+08270" target="_blank" rel="noopener noreferrer" className="auapw-btn auapw-btn-silver auapw-btn-sm w-full">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Woodbine, NJ</span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

          {/* Link Sections - Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full">
            {/* Popular Parts */}
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-black tracking-[0.15em] uppercase text-foreground mb-4 pb-2 border-b border-primary/30">
                Popular Parts
              </h3>
              <ul className="space-y-2">
                {popularPartLinks.slice(0, 5).map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Makes */}
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-black tracking-[0.15em] uppercase text-foreground mb-4 pb-2 border-b border-primary/30">
                Popular Makes
              </h3>
              <ul className="space-y-2">
                {popularMakes.map((make) => (
                  <li key={make}>
                    <Link 
                      href={`/makes/${encodeURIComponent(make.toLowerCase().replace(/\s+/g, "-"))}`} 
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {make}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-black tracking-[0.15em] uppercase text-foreground mb-4 pb-2 border-b border-primary/30">
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
                    <Link href={href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-black tracking-[0.15em] uppercase text-foreground mb-4 pb-2 border-b border-primary/30">
                Policies
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms", href: "/terms" },
                  { label: "Shipping", href: "/shipping-policy" },
                  { label: "Returns", href: "/return-policy" },
                  { label: "Contact", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          <span className="text-xs sm:text-sm text-muted-foreground font-semibold tracking-tight text-center sm:text-left text-3d-subtle">
            &copy; {new Date().getFullYear()} <strong className="font-black text-foreground text-3d-bold">AUAPW.ORG</strong>
          </span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { label: "Terms", href: "/terms" },
              { label: "Privacy", href: "/privacy-policy" },
              { label: "Shipping", href: "/shipping-policy" },
              { label: "Returns", href: "/return-policy" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-all duration-200 font-semibold tracking-tight text-3d-subtle">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

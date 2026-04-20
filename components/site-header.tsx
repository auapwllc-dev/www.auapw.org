import Image from "next/image"
import Link from "next/link"
import { Phone, Zap, ShieldCheck, Truck, Headphones } from "lucide-react"

const bannerItems = [
  { icon: Zap, label: "2,000+ Verified Yards" },
  { icon: Truck, label: "Free Shipping Nationwide" },
  { icon: Headphones, label: "24/7 Customer Support" },
  { icon: ShieldCheck, label: "12-Month Warranty" },
]

const navLinks = [
  { href: "#parts", label: "Popular Parts" },
  { href: "#brands", label: "Brands" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Announcement banner */}
      <div className="bg-primary text-primary-foreground overflow-hidden border-b border-primary/60">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap py-2">
          {[...bannerItems, ...bannerItems, ...bannerItems].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex items-center gap-2 px-6 text-xs font-semibold uppercase tracking-wider">
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="AUAPW Home">
            <Image
              src="/images/auapw-logo.jpeg"
              alt="AUAPW - All Used Auto Parts Warehouse"
              width={56}
              height={56}
              className="h-12 w-12 border border-border object-cover md:h-14 md:w-14"
              priority
            />
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-lg font-black tracking-tight text-foreground md:text-xl">AUAPW</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:text-xs">
                All Used Auto Parts Warehouse
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href="tel:+18885551234"
            className="flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 md:px-5 md:py-3"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">1-888-555-1234</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </div>
    </header>
  )
}

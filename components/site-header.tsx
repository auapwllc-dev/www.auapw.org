import Link from "next/link"
import { Phone, Truck, ShieldCheck, Clock } from "lucide-react"

export function SiteHeader() {
  return (
    <>
      {/* Announcement bar */}
      <div className="w-full bg-zinc-950 text-zinc-200 text-[11px] md:text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
              Free shipping on most orders
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
              6-month warranty
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
              2,000+ salvage yards nationwide
            </span>
          </div>
          <a
            href="tel:+18888185001"
            className="flex items-center gap-1.5 font-bold text-white hover:text-secondary transition-colors"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            1 (888) 818-5001
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="AUAPW home">
            <div className="h-11 w-11 md:h-12 md:w-12 bg-primary text-primary-foreground flex items-center justify-center font-black text-sm md:text-base tracking-tighter">
              AUAPW
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-black text-foreground text-base md:text-lg tracking-tight">
                AUAPW.ORG
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
                All Used Auto Parts Warehouse
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-foreground">
            <Link href="#parts" className="hover:text-primary transition-colors">
              Parts
            </Link>
            <Link href="#makes" className="hover:text-primary transition-colors">
              Makes
            </Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#reviews" className="hover:text-primary transition-colors">
              Reviews
            </Link>
            <Link href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>

          <Link
            href="#quote"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm md:text-base px-4 md:px-5 h-10 md:h-11 shadow-md hover:bg-primary/90 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </header>
    </>
  )
}

import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { POPULAR_PARTS, MAKES } from "@/lib/data"

export function SiteFooter() {
  const topMakes = MAKES.slice(0, 16)
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 bg-primary text-primary-foreground flex items-center justify-center font-black text-sm tracking-tighter">
              AUAPW
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-white text-base tracking-tight">AUAPW.ORG</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                All Used Auto Parts Warehouse
              </span>
            </div>
          </div>
          <p className="mt-5 text-sm text-zinc-400 leading-relaxed">
            Your trusted source for premium quality used auto parts since 2009. 2,000+ verified
            salvage yards, 6-month warranty, free shipping nationwide.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
              <a href="tel:+18888185001" className="hover:text-white transition-colors">
                1 (888) 818-5001
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
              <a href="mailto:support@auapw.org" className="hover:text-white transition-colors">
                support@auapw.org
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>Mon–Sat · 8:00am – 9:00pm EST</span>
            </li>
          </ul>
        </div>

        <FooterList title="Popular Parts">
          {POPULAR_PARTS.map((p) => (
            <li key={p.slug}>
              <Link href="#quote" className="hover:text-white transition-colors">
                {p.name}
              </Link>
            </li>
          ))}
        </FooterList>

        <FooterList title="Top Makes">
          {topMakes.map((m) => (
            <li key={m}>
              <Link href="#quote" className="hover:text-white transition-colors">
                {m}
              </Link>
            </li>
          ))}
        </FooterList>

        <FooterList title="Company">
          {[
            ["About Us", "#"],
            ["Contact", "#"],
            ["Shipping Policy", "#"],
            ["Return Policy", "#"],
            ["Warranty", "#"],
            ["Privacy Policy", "#"],
            ["Terms of Service", "#"],
            ["Sitemap", "#"],
          ].map(([label, href]) => (
            <li key={label}>
              <Link href={href} className="hover:text-white transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </FooterList>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} AUAPW.ORG — All Used Auto Parts Warehouse. All rights
            reserved.
          </p>
          <p>Made in the USA.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterList({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="font-black uppercase tracking-widest text-xs text-white mb-4">{title}</h3>
      <ul className="space-y-2.5 text-sm text-zinc-400">{children}</ul>
    </div>
  )
}

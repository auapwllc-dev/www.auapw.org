import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Car, Cog, ShieldCheck, Truck } from "lucide-react"

const linkColumns = [
  {
    title: "Parts",
    links: [
      { label: "Used Engines", href: "#parts" },
      { label: "Used Transmissions", href: "#parts" },
      { label: "Truck Parts", href: "#parts" },
      { label: "Wheels & Tires", href: "#parts" },
      { label: "Bumpers & Body", href: "#parts" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About AUAPW", href: "#" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Warranty Info", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Returns", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#contact" },
      { label: "FAQ", href: "#" },
      { label: "Track Order", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
]

const trustIcons = [
  { icon: Car, label: "Cars" },
  { icon: Truck, label: "SUVs & Trucks" },
  { icon: Cog, label: "Engine Parts" },
  { icon: ShieldCheck, label: "Warranty" },
]

export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Trust row */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-6 px-4 py-8 md:px-6">
          {trustIcons.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-3">
                <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                <span className="text-sm font-bold uppercase tracking-wide text-foreground">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3" aria-label="AUAPW Home">
              <Image
                src="/images/auapw-logo.jpeg"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 border border-border object-cover"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-black tracking-tight text-foreground">AUAPW</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  All Used Auto Parts Warehouse
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Premium quality used auto parts from 2,000+ verified salvage yards nationwide. Save up to 70% with free
              shipping and a 12-month warranty.
            </p>

            <ul className="mt-6 space-y-3 text-sm" aria-label="Contact">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href="tel:+18885551234" className="font-semibold text-foreground hover:text-primary">
                  1-888-555-1234
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href="mailto:info@auapw.org" className="font-semibold text-foreground hover:text-primary">
                  info@auapw.org
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>Serving all 50 US states, 24/7</span>
              </li>
            </ul>
          </div>

          {linkColumns.map((col) => (
            <nav key={col.title} aria-labelledby={`footer-${col.title}`}>
              <h3
                id={`footer-${col.title}`}
                className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground"
              >
                {col.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>&copy; {new Date().getFullYear()} AUAPW - All Used Auto Parts Warehouse. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">Made in the USA</p>
        </div>
      </div>
    </footer>
  )
}

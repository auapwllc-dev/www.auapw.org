import Link from "next/link"
import { Search, Phone, MessageSquare } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 text-center relative bg-gradient-to-br from-card via-secondary to-card">
      <div className="metal-line absolute top-0 left-0 right-0" />
      <div className="metal-line absolute bottom-0 left-0 right-0" />
      <div className="mx-auto max-w-[900px] px-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary">Your Trusted Partner</span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        <p className="text-sm font-bold tracking-[0.15em] text-muted-foreground uppercase mb-5">
          For All Vehicles &middot; Automotive Services & Solutions
        </p>
        <p className="text-muted-foreground text-sm max-w-[440px] mx-auto mb-10 leading-relaxed">
          Search our nationwide inventory network or speak directly with our team. Every request receives a response within 24 hours.
        </p>
        <div className="flex flex-wrap gap-6 justify-center items-center">
          <a 
            href="tel:8888185001" 
            className="brand-chrome-call-btn"
            style={{ width: 'auto', borderRadius: '9999px', padding: '0.75rem 1.75rem', gap: '0.625rem' }}
            title="Call us"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em' }}>CALL (888) 818-5001</span>
          </a>
          <Link 
            href="/quote" 
            className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-amber-500/70 bg-card hover:bg-card/80 transition-all group"
            style={{ minWidth: '240px' }}
          >
            <div className="flex flex-col items-center gap-1">
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-sm">REQUEST</span>
              <span className="text-white font-bold text-base leading-none">FREE QUOTE</span>
            </div>
            <div className="absolute bottom-1 right-2 bg-amber-500/80 text-white text-[0.65rem] font-bold px-2 py-1 rounded-full whitespace-nowrap">
              PREMIER INDUSTRY
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

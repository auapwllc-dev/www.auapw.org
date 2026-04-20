"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PHONE_DISPLAY, PHONE_SALES } from "@/lib/data"
import { 
  ACURA_CATEGORY_PARTS, 
  getAcuraCategoryPartBySlug, 
  getAcuraCategoryPartsByCategory,
  getDisplayPrice 
} from "@/lib/acura-category-parts"
import { useState } from "react"
import { 
  Shield, 
  Truck, 
  Clock, 
  ChevronDown, 
  Wrench, 
  Package, 
  Phone, 
  MessageSquare,
  CheckCircle,
  ArrowLeft
} from "lucide-react"

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-card/80 transition-colors"
      >
        <span className="font-semibold text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{answer}</div>}
    </div>
  )
}

export default function AcuraPartPage() {
  const params = useParams()
  const partSlug = params.part as string
  
  // Find the part in our data
  const part = getAcuraCategoryPartBySlug(partSlug)

  if (!part) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-32 pb-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Part Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The Acura part you&apos;re looking for was not found.
            </p>
            <Link href="/makes/acura" className="text-primary hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Acura Parts
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Calculate price with 15% increase
  const displayPrice = getDisplayPrice(part.price)

  // Get related parts from same category
  const relatedParts = getAcuraCategoryPartsByCategory(part.category)
    .filter(p => p.slug !== part.slug)
    .slice(0, 4)

  const faqs = [
    {
      q: `How much does a used Acura ${part.name} cost?`,
      a: `Used Acura ${part.name} parts typically cost 40-70% less than new OEM parts. The current starting price for this part is $${displayPrice}. Contact us at ${PHONE_DISPLAY} for bulk pricing or to discuss your specific needs.`
    },
    {
      q: `Do used Acura ${part.name} parts come with a warranty?`,
      a: `Yes! Every used Acura ${part.name} we sell comes with a minimum 30-day warranty, with most parts covered by our standard 6-month warranty. All parts are inspected and tested before shipping.`
    },
    {
      q: `Which Acura models is this ${part.name} compatible with?`,
      a: `We stock ${part.name} parts for all Acura models including ${part.compatibleModels.join(", ")}, and more. Call us at ${PHONE_DISPLAY} to confirm fitment for your specific year and model.`
    },
    {
      q: `How quickly can I get my used Acura ${part.name}?`,
      a: `After placing your request, you'll receive a quote within 24 hours. Once ordered, most parts ship within 1-3 business days. Standard delivery takes 5-7 business days, with expedited options available.`
    },
    {
      q: `Is it safe to buy a used Acura ${part.name}?`,
      a: `Absolutely. Every ${part.name} is sourced from verified salvage yards, inspected for quality, and tested for functionality. We stand behind our parts with warranty coverage and a hassle-free return policy.`
    }
  ]

  return (
    <>
      <Navbar />
      <main className="pt-[58px]">
        {/* Header */}
        <div className="bg-gradient-to-br from-background via-card to-background border-b border-border/30">
          <div className="metal-line" />
          <div className="mx-auto max-w-[1280px] px-6 py-14">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/makes" className="hover:text-foreground transition-colors">All Brands</Link>
              <span>/</span>
              <Link href="/makes/acura" className="hover:text-foreground transition-colors">Acura</Link>
              <span>/</span>
              <Link href="/makes/acura/parts" className="hover:text-foreground transition-colors">Parts</Link>
              <span>/</span>
              <span className="text-foreground">{part.name}</span>
            </div>
            
            {/* Title Section */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary">
                ACURA PARTS
              </span>
            </div>
            <h1 className="font-serif text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-foreground mb-3">
              Used Acura {part.name}
            </h1>
            <p className="text-sm text-muted-foreground max-w-[520px] leading-relaxed">
              {part.description}
            </p>
            
            {/* Price Badge */}
            <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm text-muted-foreground">Starting at</span>
              <span className="text-3xl font-black text-primary">${displayPrice}</span>
              <span className="text-xs text-muted-foreground">USD</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { 
                icon: Shield, 
                title: "Up to 6-Month Warranty", 
                desc: `Every ${part.name.toLowerCase()} covered with full return & replacement` 
              },
              { 
                icon: Truck, 
                title: "Free Shipping USA", 
                desc: "Ships to all 50 states, 1-3 business day processing" 
              },
              { 
                icon: Clock, 
                title: "24-Hour Response", 
                desc: "Get quotes within one business day" 
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="embossed-col rounded-lg p-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-foreground mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Image */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="embossed-col rounded-lg p-8 flex justify-center">
            <div className="relative w-full max-w-2xl aspect-video">
              <Image 
                src={part.imageUrl} 
                alt={`Used Acura ${part.name}`}
                fill
                className="object-contain rounded-lg"
                priority
              />
              {/* USED PARTS watermark overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="rotate-[-15deg] opacity-10">
                  <span className="text-4xl md:text-6xl font-black uppercase tracking-widest text-foreground whitespace-nowrap">USED OEM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part Description */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="embossed-col rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">About Used Acura {part.name}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {part.longDescription}
            </p>

            {/* Benefits */}
            <h3 className="text-sm font-bold text-foreground mb-4">Key Benefits:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {part.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link 
                href={`/quote?make=Acura&part=${encodeURIComponent(part.name)}`}
                className="auapw-btn auapw-btn-amber"
              >
                <MessageSquare className="w-4 h-4" />
                <span>GET FREE QUOTE</span>
              </Link>
              <a 
                href={`tel:${PHONE_SALES.replace(/-/g, "")}`}
                className="auapw-btn auapw-btn-green"
              >
                <Phone className="w-4 h-4" />
                <span>CALL {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="embossed-col rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Product Specifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-sm text-muted-foreground">Part Name:</span>
                <span className="text-sm font-medium">{part.name}</span>
              </div>
              <div className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-sm text-muted-foreground">Condition:</span>
                <span className="text-sm font-medium">Used - OEM Quality</span>
              </div>
              <div className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-sm text-muted-foreground">Warranty:</span>
                <span className="text-sm font-medium">Up to 6 Months</span>
              </div>
              <div className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-sm text-muted-foreground">Shipping:</span>
                <span className="text-sm font-medium">Free USA</span>
              </div>
              <div className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium">{part.category}</span>
              </div>
              <div className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-sm text-muted-foreground">Starting Price:</span>
                <span className="text-sm font-medium text-primary">${displayPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compatible Models */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="embossed-col rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Compatible Acura Models</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This {part.name} is compatible with various Acura models. Call us to confirm fitment for your specific vehicle.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {part.compatibleModels.map((model) => (
                <Link 
                  key={model}
                  href={`/search?make=Acura&model=${encodeURIComponent(model)}&part=${encodeURIComponent(part.name)}`}
                  className="px-4 py-3 rounded-lg border border-border/50 bg-card/50 text-center text-sm font-medium hover:border-primary/30 hover:bg-card transition-colors"
                >
                  {model}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Used Acura {part.name} FAQ</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-xl">
            Everything you need to know about buying a used Acura {part.name} from our nationwide network.
          </p>
          <div className="grid gap-3 max-w-3xl">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>

        {/* Related Parts */}
        {relatedParts.length > 0 && (
          <div className="mx-auto max-w-[1280px] px-6 pb-16">
            <h2 className="text-2xl font-bold mb-6">Related Acura Parts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedParts.map((relatedPart) => (
                <Link
                  key={relatedPart.slug}
                  href={`/makes/acura/parts/${relatedPart.slug}`}
                  className="embossed-col rounded-lg p-5 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                      {relatedPart.name}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {relatedPart.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">
                      ${getDisplayPrice(relatedPart.price)}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      View Details
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="mx-auto max-w-[1280px] px-6 pb-16">
          <div className="embossed-col rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Order Your Acura {part.name}?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free quote within 24 hours. Our parts specialists are standing by to help you find the perfect part for your Acura.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/quote?make=Acura&part=${encodeURIComponent(part.name)}`}
                className="auapw-btn auapw-btn-amber"
              >
                <MessageSquare className="w-4 h-4" />
                <span>REQUEST FREE QUOTE</span>
              </Link>
              <a
                href={`tel:${PHONE_SALES.replace(/-/g, "")}`}
                className="auapw-btn auapw-btn-green"
              >
                <Phone className="w-4 h-4" />
                <span>CALL {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

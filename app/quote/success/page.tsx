import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Phone, Mail, ArrowRight, Clock, Shield, Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "Quote Request Submitted | AUAPW.ORG",
  description: "Thank you for your quote request. We'll get back to you within 24-48 hours.",
}

interface SuccessPageProps {
  searchParams: Promise<{
    name?: string
    email?: string
    part?: string
    make?: string
    model?: string
    year?: string
  }>
}

export default async function QuoteSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const { name, email, part, make, model, year } = params

  const vehicleInfo = [year, make, model].filter(Boolean).join(" ")

  return (
    <main className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
            Quote Request Submitted!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you{name ? `, ${name}` : ""}! We&apos;ve received your request.
          </p>

          {/* Request Summary */}
          {(part || vehicleInfo) && (
            <div className="bg-card/50 border border-border/30 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-sm font-black tracking-widest uppercase text-muted-foreground mb-4">
                Your Request
              </h2>
              <div className="space-y-2">
                {part && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Part:</span>
                    <span className="font-semibold text-foreground">{part}</span>
                  </div>
                )}
                {vehicleInfo && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-semibold text-foreground">{vehicleInfo}</span>
                  </div>
                )}
                {email && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confirmation sent to:</span>
                    <span className="font-semibold text-foreground">{email}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What Happens Next */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-sm font-black tracking-widest uppercase text-primary mb-4">
              What Happens Next?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">24-48 Hour Response</p>
                  <p className="text-sm text-muted-foreground">Our team will search 2,000+ yards to find your part</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Check Your Email</p>
                  <p className="text-sm text-muted-foreground">We&apos;ve sent a confirmation to {email || "your email"}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Quality Guaranteed</p>
                  <p className="text-sm text-muted-foreground">Every part comes with our 30-180 day warranty</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Truck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fast Shipping</p>
                  <p className="text-sm text-muted-foreground">Free shipping on qualifying orders</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a href="tel:8888185001" className="auapw-btn auapw-btn-green">
              <Phone className="w-5 h-5" />
              Call (888) 818-5001
            </a>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/parts" className="auapw-btn auapw-btn-silver">
              Browse More Parts
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/" className="auapw-btn auapw-btn-outline">
              Return Home
            </Link>
          </div>
        </div>


      </div>
    </main>
  )
}

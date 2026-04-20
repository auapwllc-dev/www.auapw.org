import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { WhyChoose } from "@/components/why-choose"
import { PopularParts } from "@/components/popular-parts"
import { BrandGrid } from "@/components/brand-grid"
import { HowItWorks } from "@/components/how-it-works"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <WhyChoose />
        <PopularParts />
        <BrandGrid />
        <HowItWorks />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}

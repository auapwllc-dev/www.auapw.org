import { SiteHeader } from "@/components/site-header"
import { HeroSearch } from "@/components/hero-search"
import { PartsGrid } from "@/components/parts-grid"
import { MakesGrid } from "@/components/makes-grid"
import { WhyChoose } from "@/components/why-choose"
import { HowItWorks } from "@/components/how-it-works"
import { Reviews } from "@/components/reviews"
import { FaqSection } from "@/components/faq-section"
import { CtaBanner } from "@/components/cta-banner"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <HeroSearch />
        <PartsGrid />
        <MakesGrid />
        <WhyChoose />
        <HowItWorks />
        <Reviews />
        <FaqSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  )
}

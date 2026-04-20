import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandLogosSection } from "@/components/brand-logos"
import { HeroSection } from "@/components/home/hero-section"
import { ContentSection } from "@/components/home/content-section"
import { BrandValuesSection } from "@/components/home/brand-values-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { ProcessSection } from "@/components/home/process-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ContentSection />
        <BrandValuesSection />
        <CategoriesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
        <BrandLogosSection />
      </main>
      <Footer />
    </>
  )
}

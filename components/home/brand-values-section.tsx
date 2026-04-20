"use client"

import { CheckCircle2, Handshake, Award, Wrench } from "lucide-react"

const values = [
  {
    title: "Trusted Partner",
    description: "Our repeated commitment to being your trusted partner reinforces reliability and aims to build lasting relationships with our customers.",
    Icon: Handshake
  },
  {
    title: "Premium Quality",
    description: "Premium Quality Used Auto Parts ensures we don't offer low-grade or damaged items. We guarantee excellence in every part.",
    Icon: Award
  },
  {
    title: "Comprehensive Solutions",
    description: "For All Vehicles & Automotive Services & Solutions indicate we cater to a wide range of needs and vehicle types.",
    Icon: Wrench
  }
]

export function BrandValuesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-sans text-[clamp(1.5rem,4vw,2.75rem)] font-black mercury-heading text-3d-section mb-4" style={{ fontFamily: 'system-ui', fontSize: '62px' }}>
            Why Choose AUAPW
          </h2>
          <p className="text-muted-foreground text-[0.9rem] sm:text-[1rem] leading-relaxed max-w-2xl mx-auto">
            We position ourselves as a dependable choice for car owners seeking quality and comprehensive support
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
          {values.map((value, idx) => (
            <div key={idx} className="group glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <value.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground text-3d-subtle mb-2 sm:mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-[0.85rem] sm:text-[0.95rem] leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Main Value Proposition */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm border border-primary/10 mb-10 sm:mb-16">
          <h3 className="text-lg sm:text-xl font-bold text-foreground text-3d-subtle mb-4 sm:mb-6">Our Complete Approach</h3>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex gap-3 sm:gap-4">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5 sm:mt-1" />
              <p className="text-muted-foreground text-[0.85rem] sm:text-[0.95rem] leading-relaxed">
                <strong className="text-foreground">Routine Maintenance to Complex Repairs:</strong> Our holistic approach caters to a wide spectrum of automotive needs, ensuring customers can find everything they require under one roof.
              </p>
            </div>
            
            <div className="flex gap-3 sm:gap-4">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5 sm:mt-1" />
              <p className="text-muted-foreground text-[0.85rem] sm:text-[0.95rem] leading-relaxed">
                <strong className="text-foreground">Go-To Resource for All Things Automotive:</strong> We position ourselves not just as a parts supplier but as your comprehensive resource, fostering a sense of trust and dependency among customers.
              </p>
            </div>
            
            <div className="flex gap-3 sm:gap-4">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5 sm:mt-1" />
              <p className="text-muted-foreground text-[0.85rem] sm:text-[0.95rem] leading-relaxed">
                <strong className="text-foreground">Customer Satisfaction First:</strong> We value customer satisfaction and aim to be your go-to resource for automotive needs, positioning ourselves as a dependable choice for quality and comprehensive support.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Statement */}
        <div className="text-center px-2">
          <div className="inline-block glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-primary/10 max-w-2xl">
            <p className="text-foreground text-base sm:text-lg leading-relaxed">
              Whether you&apos;re looking for specific parts or require expert service, we position ourselves as a dependable choice for car owners seeking <span className="text-primary font-bold">quality and comprehensive support</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

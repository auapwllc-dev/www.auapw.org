import Link from "next/link"
import { Search, Truck, Shield, RotateCcw, Clock, ThumbsUp, DollarSign, Grid3X3 } from "lucide-react"

export function ContentSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-background ghost-scan-section">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
        {/* Main intro */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <h2 className="font-sans text-lg sm:text-xl lg:text-2xl font-black mercury-heading text-3d-section mb-4 sm:mb-6 uppercase leading-tight">
            AUAPW.ORG<br />
            <span className="text-sm sm:text-base lg:text-lg">All Used Auto Parts Warehouse</span><br />
            <span className="text-xs sm:text-sm text-muted-foreground font-semibold">Trusted Partner for Automotive Services</span>
          </h2>
          <div className="text-muted-foreground text-sm sm:text-[0.95rem] leading-relaxed flex flex-col gap-3 sm:gap-4">
            <p className="font-medium text-foreground/90">
              AUAPW.ORG is a US-based online platform for finding all kinds of used auto parts. We cooperate with the best junkyards and salvage yards around the country, to provide our customers with only top-notch services.
            </p>
            <p className="font-medium text-foreground/85">
              On our website, you can find a simple search tool that helps you find a wide variety of used car parts from different dealers. We help you connect with the best suppliers without extra efforts, serving as a bridge between you and the dealers.
            </p>
            <p className="font-medium text-foreground/85">
              After choosing your desired <strong className="text-foreground font-bold text-3d-accent">used engines</strong> and <strong className="text-foreground font-bold text-3d-accent">used transmissions</strong> and contacting a dealer, you will receive a response in less than 24 hours. All you need is internet access -- no need to roam around different junkyards to find a car part -- we do it all for you.
            </p>
            <p className="font-medium text-foreground/85">
              Taking care of your vehicle can sometimes be a pain and very expensive but with used auto parts you can save a fortune. On AUAPW.ORG, we take all the struggle of finding the best auto parts on us. We guarantee that you will get only high-quality products at the most affordable prices.
            </p>
            <p className="font-medium text-foreground/85">
              Our network spans all 50 states with partnerships across <strong className="text-foreground font-bold text-3d-accent">2,000+ verified salvage yards</strong> and recyclers. Whether you need a complete engine, transmission, body panels, electrical components, or any other part -- we have access to millions of quality-tested components ready for immediate shipping.
            </p>
            <p className="font-medium text-foreground/85">
              Every part listed on AUAPW.ORG goes through a rigorous quality inspection process. Our partnered dealers test and verify each component before listing, ensuring you receive parts that meet or exceed OEM specifications. We stand behind every sale with our comprehensive <strong className="text-foreground font-bold text-3d-accent">30 to 180-day warranty</strong> program.
            </p>
            <p className="font-medium text-foreground/85">
              Why pay dealership prices when you can get the same quality at a fraction of the cost? Used auto parts from AUAPW.ORG typically save our customers <strong className="text-foreground font-bold text-3d-accent">40-70% compared to new OEM parts</strong>. Our transparent pricing means no hidden fees -- what you see is what you pay, with free shipping on most orders.
            </p>
          </div>
        </div>

        {/* Trust & Quality Section */}
        <div className="glass-card rounded-sm p-4 sm:p-6 lg:p-8 mb-10 sm:mb-14 lg:mb-16">
          <h3 className="font-serif text-xl font-bold text-foreground text-3d-subtle mb-4">Why Customers Trust AUAPW.ORG</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-bold text-foreground text-3d-subtle mb-2">Quality Guaranteed</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Every part is inspected, tested, and verified before shipping. We only work with reputable salvage yards that meet our strict quality standards.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground text-3d-subtle mb-2">Nationwide Coverage</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                With partners in all 50 states, we can source and ship parts to any location in the USA. Fast delivery with real-time tracking on every order.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground text-3d-subtle mb-2">Expert Support</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Our team of automotive experts is available to help you find the exact part you need. We verify fitment and compatibility before every sale.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground text-3d-subtle mb-2">Eco-Friendly Choice</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Choosing recycled auto parts helps reduce landfill waste and minimizes the environmental impact of manufacturing new components.
              </p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="glass-card rounded-sm p-4 sm:p-6 lg:p-8 mb-10 sm:mb-14 lg:mb-16">
          <h3 className="font-serif text-xl font-bold text-foreground text-3d-subtle mb-4">How Does AUAPW.ORG Work?</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Simple. Browsing through our website is just a breeze - within a few minutes you can find everything you have been looking for. Just fill the required fields, such as the brand, car model, year, etc. and find the most affordable and top-quality parts.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-14 lg:mb-16">
          {[
            { icon: Search, title: "Parts Near You", desc: "Search by state, city and zip code." },
            { icon: Truck, title: "Free Shipping", desc: "Delivered to your door nationwide." },
            { icon: Shield, title: "Warranty", desc: "30-180 days warranty included." },
            { icon: RotateCcw, title: "Easy Returns", desc: "Simple return process." },
            { icon: Clock, title: "24-Hour Response", desc: "Fast dealer response time." },
            { icon: DollarSign, title: "Best Prices", desc: "Save 40-70% vs new parts." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-sm p-3 sm:p-5 lg:p-6">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2 sm:mb-3" />
              <h4 className="text-xs sm:text-sm font-bold text-foreground text-3d-subtle mb-1 sm:mb-2">{title}</h4>
              <p className="text-[11px] sm:text-[13px] text-muted-foreground leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>

        {/* Our Services / Why Best */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <h3 className="font-serif text-xl font-bold text-foreground text-3d-subtle mb-4">Our Services</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
            AUAPW.ORG offers top-of-the-line used car auto parts for all types of vehicles -- Honda, Acura, Dodge, Ford, BMW, you name it. On our online platform, you get the chance to browse through all the best junkyards in the country within minutes.
          </p>
          <h3 className="font-serif text-xl font-bold text-foreground text-3d-subtle mb-4">What Makes Us The Best?</h3>
          <div className="flex flex-col gap-3">
            {[
              { icon: ThumbsUp, text: "Most user-friendly interface that makes the searching process 10x easier." },
              { icon: Grid3X3, text: "We provide the largest catalog with all the best deals." },
              { icon: Clock, text: "We help you find your desired auto parts in less than 24 hours." },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 bg-secondary/30 border border-border/30 rounded-lg p-4">
                <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center glass-card rounded-sm p-5 sm:p-8 lg:p-10">
          <h3 className="font-serif text-xl font-bold text-foreground text-3d-bold mb-3">
            Need Highly Durable Yet Affordable Used Car Parts?
          </h3>
          <p className="text-muted-foreground text-sm max-w-[500px] mx-auto mb-8 leading-relaxed font-medium">
            {`You're in the right place. Find the best deals in the country. Save your time and money -- order all kinds of bespoke used auto parts now!`}
          </p>
          
          {/* Why AUAPW Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8 pt-8 border-t border-border/30">
            <div className="bg-secondary/20 p-6 rounded-lg flex flex-col items-center text-center">
              <div className="text-sm font-black text-3d-accent mb-2 uppercase tracking-wide">Premium Quality</div>
              <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: 'system-ui' }}>Every component is tested, inspected, and verified to meet OEM specifications before shipment.</p>
            </div>
            <div className="bg-secondary/20 p-6 rounded-lg flex flex-col items-center text-center">
              <div className="text-sm font-black text-3d-accent mb-2 uppercase tracking-wide">Unbeatable Savings</div>
              <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: 'system-ui' }}>Save 40-70% compared to new OEM parts. Same quality, fraction of the dealership cost.</p>
            </div>
            <div className="bg-secondary/20 p-6 rounded-lg flex flex-col items-center text-center">
              <div className="text-sm font-black text-3d-accent mb-2 uppercase tracking-wide">Complete Protection</div>
              <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: 'system-ui' }}>30 to 180-day warranty on all parts. Free returns within 30 days if not satisfied.</p>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

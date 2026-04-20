import { Award, MapPin, Headphones, Leaf } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Quality Guaranteed",
    description:
      "Every part is inspected and comes with a 12-month warranty. Only premium OEM parts from trusted salvage yards.",
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description:
      "Access to 2,000+ verified salvage yards across the country. Find exactly the part you need, wherever you are.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description:
      "24/7 customer support from automotive specialists. We help you find, order, and install the right part.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Choice",
    description:
      "Recycled parts reduce waste and your carbon footprint. Save money while helping the planet.",
  },
]

export function WhyChoose() {
  return (
    <section className="border-b border-border bg-card py-16 md:py-24" aria-labelledby="why-choose-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Why AUAPW</span>
          <h2
            id="why-choose-heading"
            className="mt-3 text-balance text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl"
          >
            Your Trusted Partner for Used Auto Parts
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            With decades of experience and a nationwide network, we make finding quality used parts simple, affordable,
            and reliable.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4" role="list">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <li key={feature.title} className="flex flex-col items-start gap-4 bg-card p-6 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-sans text-lg font-bold uppercase tracking-wide text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

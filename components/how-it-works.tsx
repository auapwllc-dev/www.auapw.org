import { Search, ShoppingCart, Truck } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Search Your Part",
    description:
      "Tell us the year, make, model, and part you need. Our system queries 2,000+ verified salvage yards instantly.",
  },
  {
    step: "02",
    icon: ShoppingCart,
    title: "Get a Quote",
    description:
      "Receive competitive quotes within minutes. Every part includes inspection details, mileage, and a 12-month warranty.",
  },
  {
    step: "03",
    icon: Truck,
    title: "Fast Free Shipping",
    description:
      "Confirm your order and we ship directly to your door or mechanic &mdash; typically within 2-5 business days.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-border py-16 md:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Simple Process</span>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-balance text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl"
          >
            How AUAPW Works
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            From search to delivery in three straightforward steps. No hidden fees. No surprises.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8" role="list">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <li key={step.step} className="relative border border-border bg-card p-6 md:p-8">
                <span
                  className="absolute right-4 top-4 font-mono text-5xl font-black leading-none text-primary/20 md:text-6xl"
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-sans text-xl font-bold uppercase tracking-wide text-foreground">
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

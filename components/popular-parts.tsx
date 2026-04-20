import { Cog, Wrench, Gauge, Disc3, Car, Snowflake, BatteryCharging, Wind } from "lucide-react"

const parts = [
  { icon: Cog, name: "Used Engines", description: "Low-mileage tested engines for every major make" },
  { icon: Wrench, name: "Transmissions", description: "Manual and automatic, fully inspected and warrantied" },
  { icon: Car, name: "Truck Parts", description: "Bed assemblies, tailgates, cabs, and more" },
  { icon: Disc3, name: "Wheels & Tires", description: "OEM alloy wheels and matched tire sets" },
  { icon: Gauge, name: "Dashboards", description: "Complete clusters and trim panels" },
  { icon: Snowflake, name: "AC Compressors", description: "Tested cooling and climate control components" },
  { icon: BatteryCharging, name: "Alternators", description: "Starters, alternators, and charging systems" },
  { icon: Wind, name: "Bumpers & Body", description: "Fenders, doors, hoods in all OEM colors" },
]

export function PopularParts() {
  return (
    <section id="parts" className="border-b border-border bg-card py-16 md:py-24" aria-labelledby="parts-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">In Stock Now</span>
          <h2
            id="parts-heading"
            className="mt-3 text-balance text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl"
          >
            Popular Parts In Stock
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Used engines, transmissions, truck parts, and more &mdash; ready to ship nationwide with a 12-month
            warranty.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4" role="list">
          {parts.map((part) => {
            const Icon = part.icon
            return (
              <li key={part.name}>
                <a
                  href="#contact"
                  className="group flex h-full flex-col gap-3 bg-background p-6 transition-colors hover:bg-card md:p-8"
                >
                  <Icon
                    className="h-10 w-10 text-primary transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <h3 className="font-sans text-lg font-bold uppercase tracking-wide text-foreground">{part.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{part.description}</p>
                  <span className="mt-auto text-xs font-bold uppercase tracking-widest text-primary">
                    Get Quote &rarr;
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

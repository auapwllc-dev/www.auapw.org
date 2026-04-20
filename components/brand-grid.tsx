const brands = [
  "Acura",
  "Alfa Romeo",
  "AMC",
  "Aston Martin",
  "Audi",
  "Austin",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Daewoo",
  "Dodge",
  "Eagle",
  "Fiat",
  "Ford",
  "Geo",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Mazda",
  "Mercedes-Benz",
  "Mercury",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Plymouth",
  "Pontiac",
  "Saab",
  "Saturn",
  "Scion",
  "Subaru",
  "Suzuki",
  "Toyota",
  "Volkswagen",
  "Volvo",
]

export function BrandGrid() {
  return (
    <section id="brands" className="border-b border-border py-16 md:py-24" aria-labelledby="brands-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">44 Makes Supported</span>
          <h2
            id="brands-heading"
            className="mt-3 text-balance text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl"
          >
            Parts for Every Major Make
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Browse used parts by manufacturer. From classic American muscle to modern imports, we have you covered.
          </p>
        </div>

        <ul
          className="mt-12 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          role="list"
        >
          {brands.map((brand) => (
            <li key={brand}>
              <a
                href={`#${brand.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex h-24 items-center justify-center bg-card px-3 text-center transition-colors hover:bg-primary"
              >
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-foreground transition-colors group-hover:text-primary-foreground md:text-base">
                  {brand}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

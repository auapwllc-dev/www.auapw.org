// lib/acura-category-parts.ts
// Category-based Acura parts data for /makes/acura/parts/[part] routes
// All prices include 15% markup from wholesale prices

export interface AcuraCategoryPart {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  price: number // Base price (before 15% increase)
  category: string
  imageUrl: string
  benefits: string[]
  compatibleModels: string[]
  partNumber?: string
  googleProductCategory: string
}

// Apply 15% markup to price
export function getDisplayPrice(basePrice: number): string {
  return (basePrice * 1.15).toFixed(2)
}

// All Acura part categories with SEO-optimized content
export const ACURA_CATEGORY_PARTS: AcuraCategoryPart[] = [
  // ═══════════════════════════════════════════════════════════════════
  // ENGINES
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-engine-001",
    slug: "engine",
    name: "Engine",
    description: "Quality used Acura engines from verified salvage yards. Compression tested, low mileage, with 6-month warranty.",
    longDescription: "Our used Acura engines are sourced from reliable vehicles with verified mileage and complete service records. Each engine is compression tested, leak tested, and run on a test stand to ensure proper operation. We stock both 4-cylinder and V6 engines for all Acura models including MDX, RDX, TLX, ILX, and NSX. Engines come complete with all accessories, manifolds, and wiring harnesses. Professional installation available. 6-month warranty with optional extended coverage.",
    price: 2173.91,
    category: "Drivetrain",
    imageUrl: "/images/parts/engine-used.jpg",
    benefits: [
      "Verified mileage & service history",
      "Compression & leak tested",
      "Complete with accessories",
      "6-month warranty standard",
      "Extended warranty available"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX", "TL", "TSX", "Integra"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // TRANSMISSIONS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-transmission-001",
    slug: "transmission",
    name: "Transmission",
    description: "Used Acura automatic and manual transmissions. Low mileage, tested, with warranty. All models available.",
    longDescription: "Premium used Acura transmissions sourced from vehicles with verified mileage and service history. Each transmission undergoes comprehensive testing including pressure tests, shift quality evaluation, and leak inspection. We offer both automatic and manual transmissions for all Acura models from 1990 to present. All transmissions come with torque converter (automatics), complete wiring harness, and installation hardware. Backed by our 6-month warranty.",
    price: 1304.35,
    category: "Drivetrain",
    imageUrl: "/images/parts/transmission-used.jpg",
    benefits: [
      "Low mileage, verified service history",
      "Comprehensive testing before shipping",
      "6-month warranty coverage",
      "Includes torque converter & wiring",
      "Free freight shipping"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX", "TL", "TSX", "Integra"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // ELECTRICAL
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-alternator-001",
    slug: "alternator",
    name: "Alternator",
    description: "Quality used Acura alternators from verified salvage yards. Tested for proper voltage output, 6-month warranty.",
    longDescription: "Our used Acura alternators are sourced from reliable vehicles and thoroughly tested to ensure optimal charging performance. Each alternator is inspected for physical damage, tested for proper voltage output (13.5-14.5V), and comes with a 6-month warranty. Perfect replacement for your failed alternator at 40-70% less than dealer prices. All alternators include the necessary mounting brackets and pulleys.",
    price: 217.39,
    category: "Electrical",
    imageUrl: "/images/parts/starter-used.jpg",
    benefits: [
      "Save 40-70% vs new OEM parts",
      "Tested for proper voltage output",
      "6-month warranty included",
      "Free shipping nationwide",
      "Mounting brackets included"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL", "Integra"],
    partNumber: "31100-R40-A01",
    googleProductCategory: "5613"
  },
  {
    id: "acura-starter-001",
    slug: "starter-motor",
    name: "Starter Motor",
    description: "Used Acura starter motors. Bench tested, strong cranking power, warranty included.",
    longDescription: "Quality used Acura starter motors tested for reliable starting performance. Each starter is bench tested under load to verify proper cranking speed and torque. Inspected for damaged teeth, worn brushes, and electrical connections. Complete with solenoid and mounting bolts. Perfect replacement for no-start conditions or slow cranking. 6-month warranty on all starter motors.",
    price: 104.35,
    category: "Electrical",
    imageUrl: "/images/parts/starter-used.jpg",
    benefits: [
      "Bench tested under load",
      "Strong cranking power verified",
      "Includes solenoid",
      "6-month warranty",
      "Free shipping"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX", "TL", "TSX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-ecu-001",
    slug: "ecu-computer",
    name: "ECU / Engine Computer",
    description: "Used Acura ECU modules. Programmed and tested, VIN-matched when needed. All models available.",
    longDescription: "Genuine Acura ECU (Engine Control Unit) modules sourced from verified vehicles. Each computer is tested for proper operation and all stored fault codes are cleared. We can program and VIN-match your ECU when required. Includes all necessary connectors and mounting brackets. Perfect replacement for no-start conditions, check engine lights, or failed ECUs. 90-day warranty on all ECU modules.",
    price: 260.87,
    category: "Electrical",
    imageUrl: "/images/parts/ac-control-used.jpg",
    benefits: [
      "Tested and fault codes cleared",
      "VIN-matching available",
      "Includes connectors",
      "90-day warranty",
      "Expert support available"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX", "TL", "TSX", "Integra"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // LIGHTING
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-headlight-001",
    slug: "headlight-assembly",
    name: "Headlight Assembly",
    description: "Used Acura headlight assemblies. OEM quality, tested bulbs, clear lenses. Left and right available.",
    longDescription: "Genuine OEM Acura headlight assemblies removed from low-mileage vehicles. Each assembly is inspected for cracks, scratches, and lens clarity. All bulbs are tested for proper operation. Includes mounting hardware and wiring connectors. Perfect for replacing damaged, yellowed, or broken headlights. Available for all Acura models. 90-day warranty on electrical components.",
    price: 173.91,
    category: "Lighting",
    imageUrl: "/images/parts/headlight-used.jpg",
    benefits: [
      "OEM quality, not aftermarket",
      "Clear lenses, no yellowing",
      "Tested bulbs included",
      "Mounting hardware included",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-taillight-001",
    slug: "taillight-assembly",
    name: "Taillight Assembly",
    description: "Used Acura taillight assemblies. OEM quality, complete with bulbs, no cracks.",
    longDescription: "Genuine OEM Acura taillight assemblies from verified low-mileage vehicles. Each assembly is inspected for cracks, scratches, and proper fitment. All bulbs tested for operation. Complete with gaskets and mounting hardware. Perfect for collision repair or replacing cracked/faded units. Available for all Acura models in left and right configurations. 90-day warranty included.",
    price: 130.43,
    category: "Lighting",
    imageUrl: "/images/parts/headlight-used.jpg",
    benefits: [
      "OEM quality, factory original",
      "No cracks or damage",
      "All bulbs tested",
      "Gaskets included",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // COOLING SYSTEM
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-radiator-001",
    slug: "radiator",
    name: "Radiator",
    description: "Used Acura radiators. Pressure tested, no leaks, with cooling fan. All models in stock.",
    longDescription: "Quality used Acura radiators sourced from verified low-mileage vehicles. Each radiator is thoroughly cleaned, pressure tested to 20 PSI, and inspected for leaks, fin damage, and core integrity. Complete with cooling fan assembly and temperature sensor. Perfect replacement for leaking or damaged radiators. All radiators come with mounting brackets and hose connections. 6-month warranty against leaks.",
    price: 130.43,
    category: "Cooling System",
    imageUrl: "/images/parts/radiator-used.jpg",
    benefits: [
      "Pressure tested to 20 PSI",
      "Includes cooling fan assembly",
      "No leaks or core damage",
      "Complete mounting hardware",
      "6-month leak warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-ac-compressor-001",
    slug: "ac-compressor",
    name: "A/C Compressor",
    description: "Used Acura A/C compressors. Tested for proper operation, includes clutch assembly.",
    longDescription: "Premium used Acura A/C compressors removed from functioning air conditioning systems. Each compressor is tested for proper clutch engagement, compressor operation, and pressure output. Includes electromagnetic clutch assembly and pulley. Perfect for restoring cold air to your Acura. All compressors are flushed and sealed to prevent contamination. 90-day warranty on compressor operation.",
    price: 217.39,
    category: "Climate Control",
    imageUrl: "/images/parts/ac-control-used.jpg",
    benefits: [
      "Tested for proper operation",
      "Includes clutch & pulley",
      "Flushed and sealed",
      "90-day warranty",
      "Free shipping"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TL", "TSX"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // SUSPENSION
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-control-arm-001",
    slug: "control-arm",
    name: "Control Arm",
    description: "Used Acura control arms. Inspected bushings, ball joints tested. Upper and lower available.",
    longDescription: "Quality used Acura control arms removed from low-mileage vehicles. Each control arm is inspected for cracks, bends, and bushing wear. Ball joints are tested for play and proper torque. Available in upper and lower, front and rear configurations. Perfect replacement for worn suspension components. Includes mounting hardware and ball joint hardware. 90-day warranty on all control arms.",
    price: 86.96,
    category: "Suspension",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [
      "Inspected for cracks & bends",
      "Ball joints tested",
      "Upper & lower available",
      "Mounting hardware included",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TL", "TSX"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-strut-001",
    slug: "strut-assembly",
    name: "Strut Assembly",
    description: "Used Acura strut assemblies. Complete with spring, mount, and bearing.",
    longDescription: "Complete used Acura strut assemblies including shock absorber, coil spring, strut mount, and bearing plate. Each assembly is inspected for leaks, bounce tested, and checked for proper rebound. Springs are verified for correct height and rate. Perfect for replacing worn suspension that causes bouncing, uneven tire wear, or handling issues. Front and rear available. 90-day warranty.",
    price: 173.91,
    category: "Suspension",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [
      "Complete assembly ready to install",
      "Includes spring, mount & bearing",
      "Bounce tested",
      "Front & rear available",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // BODY PARTS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-door-001",
    slug: "door-assembly",
    name: "Door Assembly",
    description: "Complete used Acura door assemblies. Includes glass, regulator, handle, and lock.",
    longDescription: "Complete OEM Acura door assemblies removed from collision-free vehicles. Each door includes window glass, power window regulator, interior and exterior handles, lock cylinder, and all mounting hardware. Doors are inspected for rust, dents, and proper alignment. Available in multiple colors - we can match your vehicle's paint code. Perfect for collision repair or rust replacement. 90-day warranty on mechanical components.",
    price: 347.83,
    category: "Body Parts",
    imageUrl: "/images/parts/seat-front-used.jpg",
    benefits: [
      "Complete assembly, ready to install",
      "Includes glass & regulator",
      "Multiple colors available",
      "No rust or major dents",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-fender-001",
    slug: "fender",
    name: "Fender",
    description: "Used Acura fenders. OEM quality, minimal damage, multiple colors available.",
    longDescription: "Genuine OEM Acura fenders removed from low-mileage donor vehicles. Each fender is inspected for rust, dents, and fitment accuracy. Minor cosmetic imperfections are noted in the listing. Available in factory colors or can be painted to match. Includes mounting hardware and inner liner clips where applicable. Perfect for collision repair. 90-day warranty on structural integrity.",
    price: 173.91,
    category: "Body Parts",
    imageUrl: "/images/parts/seat-front-used.jpg",
    benefits: [
      "OEM quality fit",
      "Multiple colors available",
      "Inner liner clips included",
      "Paint-ready or color-matched",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-hood-001",
    slug: "hood",
    name: "Hood",
    description: "Used Acura hoods. OEM quality, straight, no major dents or rust.",
    longDescription: "Genuine OEM Acura hoods sourced from verified vehicles. Each hood is inspected for straightness, dents, rust, and hinge alignment. Available in multiple factory colors or primer-ready for painting. Includes latch mechanism and insulation pad where applicable. Perfect replacement for collision damage or rust. 90-day warranty.",
    price: 260.87,
    category: "Body Parts",
    imageUrl: "/images/parts/seat-front-used.jpg",
    benefits: [
      "OEM quality, perfect fit",
      "Multiple colors available",
      "Includes latch mechanism",
      "Straight, no major dents",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // BRAKES
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-brake-caliper-001",
    slug: "brake-caliper",
    name: "Brake Caliper",
    description: "Used Acura brake calipers. Inspected, no leaks, with bracket.",
    longDescription: "Quality used Acura brake calipers from verified salvage yards. Each caliper is inspected for leaks, piston operation, and slide pin condition. Rebuilt units include new seals and boots. Complete with mounting bracket and hardware. Perfect for replacing seized, leaking, or worn calipers. Front and rear available. 90-day warranty.",
    price: 86.96,
    category: "Brakes",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [
      "Inspected for leaks",
      "Piston operation tested",
      "Includes mounting bracket",
      "Front & rear available",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-abs-module-001",
    slug: "abs-module",
    name: "ABS Module",
    description: "Used Acura ABS control modules. Tested, no fault codes, plug-and-play.",
    longDescription: "Genuine Acura ABS (Anti-lock Braking System) control modules from verified vehicles. Each module is tested for proper operation with no stored fault codes. Complete with hydraulic unit and wiring connector. Plug-and-play replacement for ABS warning light issues or failed modules. 90-day warranty on all ABS modules.",
    price: 217.39,
    category: "Brakes",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [
      "Tested, no fault codes",
      "Plug-and-play installation",
      "Includes hydraulic unit",
      "Complete wiring connector",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL", "NSX"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // INTERIOR
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-seat-001",
    slug: "seat",
    name: "Seat",
    description: "Used Acura seats. Front and rear, leather and cloth, with tracks and motors.",
    longDescription: "Quality used Acura seats from verified low-mileage vehicles. Each seat is inspected for wear, tears, and mechanical function. Power seats tested for motor operation. Includes seat tracks, brackets, and all wiring harnesses. Leather and cloth options available. Heated seat modules functional where equipped. Front driver, front passenger, and rear bench/bucket configurations available. 90-day warranty.",
    price: 217.39,
    category: "Interior",
    imageUrl: "/images/parts/seat-front-used.jpg",
    benefits: [
      "Low wear, inspected condition",
      "Power motors tested",
      "Includes tracks & brackets",
      "Leather & cloth available",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-dashboard-001",
    slug: "dashboard",
    name: "Dashboard",
    description: "Used Acura dashboards. No cracks, complete with vents and trim.",
    longDescription: "Complete used Acura dashboard assemblies from verified vehicles. Each dashboard is inspected for cracks, warping, and sun damage. Includes air vents, trim pieces, and defroster grilles. Perfect replacement for cracked or damaged dashboards. Color matching available. Complete with mounting hardware. 90-day warranty.",
    price: 260.87,
    category: "Interior",
    imageUrl: "/images/parts/speedometer-used.jpg",
    benefits: [
      "No cracks or warping",
      "Includes vents & trim",
      "Color matching available",
      "Complete mounting hardware",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-steering-wheel-001",
    slug: "steering-wheel",
    name: "Steering Wheel",
    description: "Used Acura steering wheels. Leather wrapped, with controls, airbag available.",
    longDescription: "Genuine Acura steering wheels from verified low-mileage vehicles. Each wheel is inspected for wear, leather condition, and control button operation. Audio, cruise, and phone controls tested. Airbag modules available separately. Includes horn contact and clockspring where applicable. Perfect replacement for worn or damaged steering wheels. 90-day warranty.",
    price: 130.43,
    category: "Interior",
    imageUrl: "/images/parts/speedometer-used.jpg",
    benefits: [
      "Leather in good condition",
      "Controls tested & working",
      "Airbag available separately",
      "Includes horn contact",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL", "NSX"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // EXHAUST
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-catalytic-converter-001",
    slug: "catalytic-converter",
    name: "Catalytic Converter",
    description: "Used Acura catalytic converters. Tested, meets emissions, with heat shields.",
    longDescription: "Quality used Acura catalytic converters from verified vehicles. Each converter is tested for proper catalyst function and emissions compliance. Includes heat shields and mounting hardware. EPA compliance varies by state - check local regulations. Perfect replacement for failed emissions tests or check engine lights. 90-day warranty on structural integrity.",
    price: 304.35,
    category: "Exhaust",
    imageUrl: "/images/parts/engine-used.jpg",
    benefits: [
      "Tested for emissions compliance",
      "Heat shields included",
      "Mounting hardware included",
      "Check state regulations",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-exhaust-manifold-001",
    slug: "exhaust-manifold",
    name: "Exhaust Manifold",
    description: "Used Acura exhaust manifolds. No cracks, includes gaskets and hardware.",
    longDescription: "Genuine OEM Acura exhaust manifolds from verified vehicles. Each manifold is inspected for cracks, warping, and stud condition. Pressure tested for leaks. Includes new gaskets and mounting hardware. Perfect replacement for cracked or leaking manifolds causing exhaust smells or check engine lights. 90-day warranty.",
    price: 173.91,
    category: "Exhaust",
    imageUrl: "/images/parts/engine-used.jpg",
    benefits: [
      "No cracks or warping",
      "Pressure tested",
      "New gaskets included",
      "Complete hardware",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // STEERING
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-power-steering-pump-001",
    slug: "power-steering-pump",
    name: "Power Steering Pump",
    description: "Used Acura power steering pumps. Tested, no leaks, with reservoir.",
    longDescription: "Quality used Acura power steering pumps from verified vehicles. Each pump is tested for proper pressure output and leak-free operation. Includes reservoir, pulley, and mounting bracket. Perfect replacement for whining pumps, hard steering, or fluid leaks. 90-day warranty on all power steering pumps.",
    price: 130.43,
    category: "Steering",
    imageUrl: "/images/parts/starter-used.jpg",
    benefits: [
      "Tested for proper pressure",
      "No leaks",
      "Includes reservoir & pulley",
      "Mounting bracket included",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-steering-rack-001",
    slug: "steering-rack",
    name: "Steering Rack",
    description: "Used Acura steering racks. Tested, no leaks, includes inner tie rods.",
    longDescription: "Quality used Acura steering rack and pinion assemblies from verified vehicles. Each rack is tested for smooth operation, proper centering, and leak-free function. Includes inner tie rods and mounting hardware. Power steering racks tested under pressure. Perfect replacement for leaking, loose, or damaged steering. 90-day warranty.",
    price: 260.87,
    category: "Steering",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [
      "Smooth operation verified",
      "No leaks under pressure",
      "Inner tie rods included",
      "Complete mounting hardware",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  // ═══════════════════════════════════════════════════════════════════
  // WHEELS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "acura-wheel-rim-001",
    slug: "wheel-rim",
    name: "Wheel / Rim",
    description: "Used Acura wheels and rims. OEM alloy and steel, multiple sizes available.",
    longDescription: "Genuine OEM Acura wheels and rims from verified vehicles. Each wheel is inspected for cracks, bends, curb rash, and center bore accuracy. Available in factory alloy and steel configurations. Multiple sizes from 17\" to 20\". Perfect replacement for damaged wheels or spare tire needs. Tire mounting and balancing available. 90-day warranty on structural integrity.",
    price: 217.39,
    category: "Wheels",
    imageUrl: "/images/parts/wheel-rim-used.jpg",
    benefits: [
      "OEM factory wheels",
      "Inspected for cracks & bends",
      "Multiple sizes available",
      "Alloy & steel options",
      "90-day warranty"
    ],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL", "NSX"],
    googleProductCategory: "5613"
  }
]

// Helper functions
export function getAcuraCategoryPartBySlug(slug: string): AcuraCategoryPart | undefined {
  return ACURA_CATEGORY_PARTS.find(p => p.slug === slug)
}

export function getAcuraCategoryPartsByCategory(category: string): AcuraCategoryPart[] {
  return ACURA_CATEGORY_PARTS.filter(p => p.category === category)
}

export function getAllAcuraCategories(): string[] {
  return Array.from(new Set(ACURA_CATEGORY_PARTS.map(p => p.category)))
}

export function getAllAcuraCategorySlugs(): string[] {
  return ACURA_CATEGORY_PARTS.map(p => p.slug)
}

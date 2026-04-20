// scripts/generate-acura-gmc-feed.ts
// Google Merchant Center Feed Generator for Acura Parts
// Run: npx ts-node scripts/generate-acura-gmc-feed.ts

import * as fs from 'fs'
import * as path from 'path'

// Part data interface
interface AcuraCategoryPart {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  price: number
  category: string
  imageUrl: string
  benefits: string[]
  compatibleModels: string[]
  partNumber?: string
  googleProductCategory: string
}

// GMC Product interface
interface GMCProduct {
  id: string
  title: string
  description: string
  link: string
  image_link: string
  price: string
  availability: string
  condition: string
  brand: string
  google_product_category: string
  product_type: string
  mpn?: string
  shipping_country: string
  shipping_service: string
  shipping_price: string
}

// Apply 15% markup
function getDisplayPrice(basePrice: number): string {
  return (basePrice * 1.15).toFixed(2)
}

// Import the parts data inline (since we can't use ES modules in ts-node easily)
const ACURA_CATEGORY_PARTS: AcuraCategoryPart[] = [
  {
    id: "acura-engine-001",
    slug: "engine",
    name: "Engine",
    description: "Quality used Acura engines from verified salvage yards. Compression tested, low mileage, with 6-month warranty.",
    longDescription: "Our used Acura engines are sourced from reliable vehicles with verified mileage and complete service records.",
    price: 2173.91,
    category: "Drivetrain",
    imageUrl: "/images/parts/engine-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX", "TL", "TSX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-transmission-001",
    slug: "transmission",
    name: "Transmission",
    description: "Used Acura automatic and manual transmissions. Low mileage, tested, with warranty. All models available.",
    longDescription: "Premium used Acura transmissions sourced from vehicles with verified mileage and service history.",
    price: 1304.35,
    category: "Drivetrain",
    imageUrl: "/images/parts/transmission-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX", "TL", "TSX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-alternator-001",
    slug: "alternator",
    name: "Alternator",
    description: "Quality used Acura alternators from verified salvage yards. Tested for proper voltage output, 6-month warranty.",
    longDescription: "Our used Acura alternators are sourced from reliable vehicles and thoroughly tested.",
    price: 217.39,
    category: "Electrical",
    imageUrl: "/images/parts/starter-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL", "Integra"],
    partNumber: "31100-R40-A01",
    googleProductCategory: "5613"
  },
  {
    id: "acura-starter-001",
    slug: "starter-motor",
    name: "Starter Motor",
    description: "Used Acura starter motors. Bench tested, strong cranking power, warranty included.",
    longDescription: "Quality used Acura starter motors tested for reliable starting performance.",
    price: 104.35,
    category: "Electrical",
    imageUrl: "/images/parts/starter-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX", "TL", "TSX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-ecu-001",
    slug: "ecu-computer",
    name: "ECU / Engine Computer",
    description: "Used Acura ECU modules. Programmed and tested, VIN-matched when needed. All models available.",
    longDescription: "Genuine Acura ECU modules sourced from verified vehicles.",
    price: 260.87,
    category: "Electrical",
    imageUrl: "/images/parts/ac-control-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX", "TL", "TSX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-headlight-001",
    slug: "headlight-assembly",
    name: "Headlight Assembly",
    description: "Used Acura headlight assemblies. OEM quality, tested bulbs, clear lenses. Left and right available.",
    longDescription: "Genuine OEM Acura headlight assemblies removed from low-mileage vehicles.",
    price: 173.91,
    category: "Lighting",
    imageUrl: "/images/parts/headlight-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-taillight-001",
    slug: "taillight-assembly",
    name: "Taillight Assembly",
    description: "Used Acura taillight assemblies. OEM quality, complete with bulbs, no cracks.",
    longDescription: "Genuine OEM Acura taillight assemblies from verified low-mileage vehicles.",
    price: 130.43,
    category: "Lighting",
    imageUrl: "/images/parts/headlight-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-radiator-001",
    slug: "radiator",
    name: "Radiator",
    description: "Used Acura radiators. Pressure tested, no leaks, with cooling fan. All models in stock.",
    longDescription: "Quality used Acura radiators sourced from verified low-mileage vehicles.",
    price: 130.43,
    category: "Cooling System",
    imageUrl: "/images/parts/radiator-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-ac-compressor-001",
    slug: "ac-compressor",
    name: "A/C Compressor",
    description: "Used Acura A/C compressors. Tested for proper operation, includes clutch assembly.",
    longDescription: "Premium used Acura A/C compressors removed from functioning air conditioning systems.",
    price: 217.39,
    category: "Climate Control",
    imageUrl: "/images/parts/ac-control-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TL", "TSX"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-control-arm-001",
    slug: "control-arm",
    name: "Control Arm",
    description: "Used Acura control arms. Inspected bushings, ball joints tested. Upper and lower available.",
    longDescription: "Quality used Acura control arms removed from low-mileage vehicles.",
    price: 86.96,
    category: "Suspension",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TL", "TSX"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-strut-001",
    slug: "strut-assembly",
    name: "Strut Assembly",
    description: "Used Acura strut assemblies. Complete with spring, mount, and bearing.",
    longDescription: "Complete used Acura strut assemblies including shock absorber, coil spring, strut mount.",
    price: 173.91,
    category: "Suspension",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-door-001",
    slug: "door-assembly",
    name: "Door Assembly",
    description: "Complete used Acura door assemblies. Includes glass, regulator, handle, and lock.",
    longDescription: "Complete OEM Acura door assemblies removed from collision-free vehicles.",
    price: 347.83,
    category: "Body Parts",
    imageUrl: "/images/parts/seat-front-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "Integra"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-fender-001",
    slug: "fender",
    name: "Fender",
    description: "Used Acura fenders. OEM quality, minimal damage, multiple colors available.",
    longDescription: "Genuine OEM Acura fenders removed from low-mileage donor vehicles.",
    price: 173.91,
    category: "Body Parts",
    imageUrl: "/images/parts/seat-front-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-hood-001",
    slug: "hood",
    name: "Hood",
    description: "Used Acura hoods. OEM quality, straight, no major dents or rust.",
    longDescription: "Genuine OEM Acura hoods sourced from verified vehicles.",
    price: 260.87,
    category: "Body Parts",
    imageUrl: "/images/parts/seat-front-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "NSX"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-brake-caliper-001",
    slug: "brake-caliper",
    name: "Brake Caliper",
    description: "Used Acura brake calipers. Inspected, no leaks, with bracket.",
    longDescription: "Quality used Acura brake calipers from verified salvage yards.",
    price: 86.96,
    category: "Brakes",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-abs-module-001",
    slug: "abs-module",
    name: "ABS Module",
    description: "Used Acura ABS control modules. Tested, no fault codes, plug-and-play.",
    longDescription: "Genuine Acura ABS control modules from verified vehicles.",
    price: 217.39,
    category: "Brakes",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL", "NSX"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-seat-001",
    slug: "seat",
    name: "Seat",
    description: "Used Acura seats. Front and rear, leather and cloth, with tracks and motors.",
    longDescription: "Quality used Acura seats from verified low-mileage vehicles.",
    price: 217.39,
    category: "Interior",
    imageUrl: "/images/parts/seat-front-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-dashboard-001",
    slug: "dashboard",
    name: "Dashboard",
    description: "Used Acura dashboards. No cracks, complete with vents and trim.",
    longDescription: "Complete used Acura dashboard assemblies from verified vehicles.",
    price: 260.87,
    category: "Interior",
    imageUrl: "/images/parts/speedometer-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-steering-wheel-001",
    slug: "steering-wheel",
    name: "Steering Wheel",
    description: "Used Acura steering wheels. Leather wrapped, with controls, airbag available.",
    longDescription: "Genuine Acura steering wheels from verified low-mileage vehicles.",
    price: 130.43,
    category: "Interior",
    imageUrl: "/images/parts/speedometer-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL", "NSX"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-catalytic-converter-001",
    slug: "catalytic-converter",
    name: "Catalytic Converter",
    description: "Used Acura catalytic converters. Tested, meets emissions, with heat shields.",
    longDescription: "Quality used Acura catalytic converters from verified vehicles.",
    price: 304.35,
    category: "Exhaust",
    imageUrl: "/images/parts/engine-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-exhaust-manifold-001",
    slug: "exhaust-manifold",
    name: "Exhaust Manifold",
    description: "Used Acura exhaust manifolds. No cracks, includes gaskets and hardware.",
    longDescription: "Genuine OEM Acura exhaust manifolds from verified vehicles.",
    price: 173.91,
    category: "Exhaust",
    imageUrl: "/images/parts/engine-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-power-steering-pump-001",
    slug: "power-steering-pump",
    name: "Power Steering Pump",
    description: "Used Acura power steering pumps. Tested, no leaks, with reservoir.",
    longDescription: "Quality used Acura power steering pumps from verified vehicles.",
    price: 130.43,
    category: "Steering",
    imageUrl: "/images/parts/starter-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-steering-rack-001",
    slug: "steering-rack",
    name: "Steering Rack",
    description: "Used Acura steering racks. Tested, no leaks, includes inner tie rods.",
    longDescription: "Quality used Acura steering rack and pinion assemblies from verified vehicles.",
    price: 260.87,
    category: "Steering",
    imageUrl: "/images/parts/abs-module-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL"],
    googleProductCategory: "5613"
  },
  {
    id: "acura-wheel-rim-001",
    slug: "wheel-rim",
    name: "Wheel / Rim",
    description: "Used Acura wheels and rims. OEM alloy and steel, multiple sizes available.",
    longDescription: "Genuine OEM Acura wheels and rims from verified vehicles.",
    price: 217.39,
    category: "Wheels",
    imageUrl: "/images/parts/wheel-rim-used.jpg",
    benefits: [],
    compatibleModels: ["MDX", "RDX", "TLX", "ILX", "TSX", "TL", "NSX"],
    googleProductCategory: "5613"
  }
]

function generateGMCFeed() {
  const baseUrl = 'https://www.auapw.org'
  const products: GMCProduct[] = []

  // Convert each Acura part to GMC product format
  ACURA_CATEGORY_PARTS.forEach(part => {
    const displayPrice = getDisplayPrice(part.price)
    
    products.push({
      id: part.id,
      title: `Used Acura ${part.name} - OEM Quality | AUAPW.ORG`,
      description: part.description,
      link: `${baseUrl}/makes/acura/parts/${part.slug}`,
      image_link: `${baseUrl}${part.imageUrl}`,
      price: `${displayPrice} USD`,
      availability: 'in stock',
      condition: 'used',
      brand: 'Acura',
      google_product_category: part.googleProductCategory,
      product_type: `Auto Parts > ${part.category} > ${part.name}`,
      mpn: part.partNumber,
      shipping_country: 'US',
      shipping_service: 'Standard',
      shipping_price: '0 USD'
    })
  })

  // Generate XML feed
  const xml = generateXML(products)
  
  // Save to public directory
  const outputPath = path.join(process.cwd(), 'public', 'feeds', 'acura-gmc-feed.xml')
  const outputDir = path.dirname(outputPath)
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  fs.writeFileSync(outputPath, xml)
  
  console.log(`GMC Feed generated successfully!`)
  console.log(`Location: ${outputPath}`)
  console.log(`URL: ${baseUrl}/feeds/acura-gmc-feed.xml`)
  console.log(`Products: ${products.length}`)
  
  // Also generate CSV version
  generateCSV(products, path.join(outputDir, 'acura-gmc-feed.csv'))
}

function generateXML(products: GMCProduct[]): string {
  const escapeXML = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>AUAPW.ORG - Acura Used Auto Parts</title>
    <link>https://www.auapw.org</link>
    <description>Quality used Acura auto parts with warranty. Save 40-70% vs new. Free shipping nationwide.</description>
`

  products.forEach(product => {
    xml += `    <item>
      <g:id>${escapeXML(product.id)}</g:id>
      <g:title>${escapeXML(product.title)}</g:title>
      <g:description>${escapeXML(product.description)}</g:description>
      <g:link>${escapeXML(product.link)}</g:link>
      <g:image_link>${escapeXML(product.image_link)}</g:image_link>
      <g:price>${product.price}</g:price>
      <g:availability>${product.availability}</g:availability>
      <g:condition>${product.condition}</g:condition>
      <g:brand>${product.brand}</g:brand>
      <g:google_product_category>${product.google_product_category}</g:google_product_category>
      <g:product_type>${escapeXML(product.product_type)}</g:product_type>`
    
    if (product.mpn) {
      xml += `
      <g:mpn>${escapeXML(product.mpn)}</g:mpn>`
    }
    
    xml += `
      <g:shipping>
        <g:country>${product.shipping_country}</g:country>
        <g:service>${product.shipping_service}</g:service>
        <g:price>${product.shipping_price}</g:price>
      </g:shipping>
    </item>
`
  })

  xml += `  </channel>
</rss>`

  return xml
}

function generateCSV(products: GMCProduct[], outputPath: string) {
  const headers = [
    'id',
    'title',
    'description',
    'link',
    'image_link',
    'price',
    'availability',
    'condition',
    'brand',
    'google_product_category',
    'product_type',
    'mpn',
    'shipping'
  ]

  let csv = headers.join(',') + '\n'

  products.forEach(product => {
    const row = [
      product.id,
      `"${product.title.replace(/"/g, '""')}"`,
      `"${product.description.replace(/"/g, '""')}"`,
      product.link,
      product.image_link,
      product.price,
      product.availability,
      product.condition,
      product.brand,
      product.google_product_category,
      `"${product.product_type.replace(/"/g, '""')}"`,
      product.mpn || '',
      `${product.shipping_country}:${product.shipping_service}:${product.shipping_price}`
    ]
    csv += row.join(',') + '\n'
  })

  fs.writeFileSync(outputPath, csv)
  console.log(`CSV version saved: ${outputPath}`)
}

// Run the generator
generateGMCFeed()

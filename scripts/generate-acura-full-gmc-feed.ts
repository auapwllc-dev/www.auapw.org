// scripts/generate-acura-full-gmc-feed.ts
// Generates comprehensive GMC feed with 9,107 Acura products
// Run: npx tsx scripts/generate-acura-full-gmc-feed.ts

import * as fs from 'fs'
import * as path from 'path'

// ═══════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const BASE_URL = 'https://www.auapw.org'
const BRAND = 'Acura'

// Top Models with their part counts (total: 9,107)
const MODEL_PART_COUNTS: Record<string, number> = {
  'MDX': 2216,
  'TL': 1340,
  'RDX': 997,
  'TSX': 904,
  'TLX': 671,
  'ILX': 543,
  'Integra': 489,
  'RSX': 412,
  'RL': 356,
  'CL': 289,
  'Legend': 234,
  'NSX': 156,
  'RLX': 145,
  'ZDX': 123,
  'Vigor': 98,
  'SLX': 67,
  'EL': 45,
  'CDX': 22,
}

// Year ranges per model
const MODEL_YEARS: Record<string, number[]> = {
  'MDX': [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  'TL': [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
  'RDX': [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  'TSX': [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
  'TLX': [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  'ILX': [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
  'Integra': [1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2023, 2024],
  'RSX': [2002, 2003, 2004, 2005, 2006],
  'RL': [1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
  'CL': [1997, 1998, 1999, 2001, 2002, 2003],
  'Legend': [1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995],
  'NSX': [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2017, 2018, 2019, 2020, 2021, 2022],
  'RLX': [2014, 2015, 2016, 2017, 2018, 2019, 2020],
  'ZDX': [2010, 2011, 2012, 2013],
  'Vigor': [1992, 1993, 1994],
  'SLX': [1996, 1997, 1998, 1999],
  'EL': [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005],
  'CDX': [2017, 2018, 2019],
}

// Part types with base prices and categories
interface PartType {
  slug: string
  name: string
  basePrice: number
  category: string
  googleCategory: string
  image: string
}

const PART_TYPES: PartType[] = [
  // Drivetrain
  { slug: 'engine', name: 'Engine', basePrice: 2500, category: 'Drivetrain', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'transmission', name: 'Transmission', basePrice: 1800, category: 'Drivetrain', googleCategory: '5613', image: '/images/parts/transmission-used.jpg' },
  { slug: 'transfer-case', name: 'Transfer Case', basePrice: 650, category: 'Drivetrain', googleCategory: '5613', image: '/images/parts/transmission-used.jpg' },
  { slug: 'axle-assembly', name: 'Axle Assembly', basePrice: 350, category: 'Drivetrain', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'driveshaft', name: 'Driveshaft', basePrice: 280, category: 'Drivetrain', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'differential', name: 'Differential', basePrice: 450, category: 'Drivetrain', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'flywheel', name: 'Flywheel', basePrice: 180, category: 'Drivetrain', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  
  // Electrical
  { slug: 'alternator', name: 'Alternator', basePrice: 189, category: 'Electrical', googleCategory: '5613', image: '/images/parts/starter-used.jpg' },
  { slug: 'starter-motor', name: 'Starter Motor', basePrice: 95, category: 'Electrical', googleCategory: '5613', image: '/images/parts/starter-used.jpg' },
  { slug: 'ecu-computer', name: 'ECU / Engine Computer', basePrice: 225, category: 'Electrical', googleCategory: '5613', image: '/images/parts/ac-control-used.jpg' },
  { slug: 'fuse-box', name: 'Fuse Box', basePrice: 125, category: 'Electrical', googleCategory: '5613', image: '/images/parts/ac-control-used.jpg' },
  { slug: 'ignition-switch', name: 'Ignition Switch', basePrice: 85, category: 'Electrical', googleCategory: '5613', image: '/images/parts/ac-control-used.jpg' },
  { slug: 'wiper-motor', name: 'Wiper Motor', basePrice: 75, category: 'Electrical', googleCategory: '5613', image: '/images/parts/wiper-motor-used.jpg' },
  { slug: 'window-motor', name: 'Window Motor', basePrice: 65, category: 'Electrical', googleCategory: '5613', image: '/images/parts/wiper-motor-used.jpg' },
  { slug: 'battery', name: 'Battery', basePrice: 95, category: 'Electrical', googleCategory: '5613', image: '/images/parts/starter-used.jpg' },
  
  // Lighting
  { slug: 'headlight-headlamp-assembly', name: 'Headlight / Headlamp Assembly', basePrice: 165, category: 'Lighting', googleCategory: '5613', image: '/images/parts/headlight-used.jpg' },
  { slug: 'taillight-assembly', name: 'Taillight Assembly', basePrice: 125, category: 'Lighting', googleCategory: '5613', image: '/images/parts/headlight-used.jpg' },
  { slug: 'fog-light', name: 'Fog Light', basePrice: 75, category: 'Lighting', googleCategory: '5613', image: '/images/parts/headlight-used.jpg' },
  { slug: 'turn-signal', name: 'Turn Signal', basePrice: 45, category: 'Lighting', googleCategory: '5613', image: '/images/parts/headlight-used.jpg' },
  { slug: 'third-brake-light', name: 'Third Brake Light', basePrice: 55, category: 'Lighting', googleCategory: '5613', image: '/images/parts/headlight-used.jpg' },
  
  // Cooling System
  { slug: 'radiator', name: 'Radiator', basePrice: 145, category: 'Cooling System', googleCategory: '5613', image: '/images/parts/radiator-used.jpg' },
  { slug: 'radiator-fan', name: 'Radiator Fan', basePrice: 95, category: 'Cooling System', googleCategory: '5613', image: '/images/parts/radiator-used.jpg' },
  { slug: 'water-pump', name: 'Water Pump', basePrice: 85, category: 'Cooling System', googleCategory: '5613', image: '/images/parts/radiator-used.jpg' },
  { slug: 'thermostat-housing', name: 'Thermostat Housing', basePrice: 55, category: 'Cooling System', googleCategory: '5613', image: '/images/parts/radiator-used.jpg' },
  { slug: 'coolant-reservoir', name: 'Coolant Reservoir', basePrice: 45, category: 'Cooling System', googleCategory: '5613', image: '/images/parts/radiator-used.jpg' },
  
  // Climate Control
  { slug: 'ac-compressor', name: 'A/C Compressor', basePrice: 225, category: 'Climate Control', googleCategory: '5613', image: '/images/parts/ac-control-used.jpg' },
  { slug: 'ac-condenser', name: 'A/C Condenser', basePrice: 145, category: 'Climate Control', googleCategory: '5613', image: '/images/parts/ac-control-used.jpg' },
  { slug: 'heater-core', name: 'Heater Core', basePrice: 125, category: 'Climate Control', googleCategory: '5613', image: '/images/parts/ac-control-used.jpg' },
  { slug: 'blower-motor', name: 'Blower Motor', basePrice: 75, category: 'Climate Control', googleCategory: '5613', image: '/images/parts/ac-control-used.jpg' },
  { slug: 'climate-control-unit', name: 'Climate Control Unit', basePrice: 165, category: 'Climate Control', googleCategory: '5613', image: '/images/parts/ac-control-used.jpg' },
  
  // Suspension
  { slug: 'control-arm', name: 'Control Arm', basePrice: 85, category: 'Suspension', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'strut-assembly', name: 'Strut Assembly', basePrice: 165, category: 'Suspension', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'shock-absorber', name: 'Shock Absorber', basePrice: 95, category: 'Suspension', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'spindle-knuckle', name: 'Spindle / Knuckle', basePrice: 145, category: 'Suspension', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'sway-bar', name: 'Sway Bar', basePrice: 75, category: 'Suspension', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'ball-joint', name: 'Ball Joint', basePrice: 55, category: 'Suspension', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'tie-rod', name: 'Tie Rod', basePrice: 45, category: 'Suspension', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'hub-bearing', name: 'Hub / Bearing', basePrice: 125, category: 'Suspension', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  
  // Brakes
  { slug: 'brake-caliper', name: 'Brake Caliper', basePrice: 85, category: 'Brakes', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'brake-rotor', name: 'Brake Rotor', basePrice: 65, category: 'Brakes', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'brake-master-cylinder', name: 'Brake Master Cylinder', basePrice: 125, category: 'Brakes', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'abs-module', name: 'ABS Module', basePrice: 245, category: 'Brakes', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'brake-booster', name: 'Brake Booster', basePrice: 145, category: 'Brakes', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  
  // Body Parts
  { slug: 'door-shell', name: 'Door Shell', basePrice: 285, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'door-assembly', name: 'Door Assembly', basePrice: 385, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'fender', name: 'Fender', basePrice: 165, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'hood', name: 'Hood', basePrice: 245, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'trunk-lid', name: 'Trunk Lid', basePrice: 225, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'bumper-cover', name: 'Bumper Cover', basePrice: 185, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'bumper-reinforcement', name: 'Bumper Reinforcement', basePrice: 125, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'grille', name: 'Grille', basePrice: 145, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'mirror', name: 'Mirror', basePrice: 95, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'quarter-panel', name: 'Quarter Panel', basePrice: 285, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'rocker-panel', name: 'Rocker Panel', basePrice: 145, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'rear-body-panel', name: 'Rear Body Panel', basePrice: 195, category: 'Body Parts', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  
  // Glass
  { slug: 'windshield', name: 'Windshield', basePrice: 225, category: 'Glass', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'door-glass', name: 'Door Glass', basePrice: 95, category: 'Glass', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'rear-window', name: 'Rear Window', basePrice: 145, category: 'Glass', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'quarter-glass', name: 'Quarter Glass', basePrice: 75, category: 'Glass', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'sunroof-glass', name: 'Sunroof Glass', basePrice: 185, category: 'Glass', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  
  // Interior
  { slug: 'seat', name: 'Seat', basePrice: 245, category: 'Interior', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'dashboard', name: 'Dashboard', basePrice: 285, category: 'Interior', googleCategory: '5613', image: '/images/parts/speedometer-used.jpg' },
  { slug: 'steering-wheel', name: 'Steering Wheel', basePrice: 145, category: 'Interior', googleCategory: '5613', image: '/images/parts/speedometer-used.jpg' },
  { slug: 'steering-column', name: 'Steering Column', basePrice: 225, category: 'Interior', googleCategory: '5613', image: '/images/parts/speedometer-used.jpg' },
  { slug: 'instrument-cluster', name: 'Instrument Cluster', basePrice: 185, category: 'Interior', googleCategory: '5613', image: '/images/parts/speedometer-used.jpg' },
  { slug: 'speedometer', name: 'Speedometer', basePrice: 145, category: 'Interior', googleCategory: '5613', image: '/images/parts/speedometer-used.jpg' },
  { slug: 'center-console', name: 'Center Console', basePrice: 125, category: 'Interior', googleCategory: '5613', image: '/images/parts/speedometer-used.jpg' },
  { slug: 'door-panel', name: 'Door Panel', basePrice: 95, category: 'Interior', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'carpet', name: 'Carpet', basePrice: 145, category: 'Interior', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'headliner', name: 'Headliner', basePrice: 165, category: 'Interior', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'seatbelt', name: 'Seatbelt', basePrice: 75, category: 'Interior', googleCategory: '5613', image: '/images/parts/seat-front-used.jpg' },
  { slug: 'airbag', name: 'Airbag', basePrice: 185, category: 'Interior', googleCategory: '5613', image: '/images/parts/airbag-used.jpg' },
  { slug: 'radio', name: 'Radio', basePrice: 145, category: 'Interior', googleCategory: '5613', image: '/images/parts/speedometer-used.jpg' },
  { slug: 'navigation-unit', name: 'Navigation Unit', basePrice: 285, category: 'Interior', googleCategory: '5613', image: '/images/parts/speedometer-used.jpg' },
  
  // Exhaust
  { slug: 'catalytic-converter', name: 'Catalytic Converter', basePrice: 345, category: 'Exhaust', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'exhaust-manifold', name: 'Exhaust Manifold', basePrice: 185, category: 'Exhaust', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'muffler', name: 'Muffler', basePrice: 125, category: 'Exhaust', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'exhaust-pipe', name: 'Exhaust Pipe', basePrice: 85, category: 'Exhaust', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  
  // Steering
  { slug: 'power-steering-pump', name: 'Power Steering Pump', basePrice: 145, category: 'Steering', googleCategory: '5613', image: '/images/parts/starter-used.jpg' },
  { slug: 'steering-rack', name: 'Steering Rack', basePrice: 285, category: 'Steering', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  { slug: 'steering-gear', name: 'Steering Gear', basePrice: 245, category: 'Steering', googleCategory: '5613', image: '/images/parts/abs-module-used.jpg' },
  
  // Wheels & Tires
  { slug: 'wheel-rim', name: 'Wheel / Rim', basePrice: 185, category: 'Wheels', googleCategory: '5613', image: '/images/parts/wheel-rim-used.jpg' },
  { slug: 'spare-wheel', name: 'Spare Wheel', basePrice: 125, category: 'Wheels', googleCategory: '5613', image: '/images/parts/wheel-rim-used.jpg' },
  { slug: 'wheel-cover', name: 'Wheel Cover', basePrice: 45, category: 'Wheels', googleCategory: '5613', image: '/images/parts/wheel-rim-used.jpg' },
  
  // Fuel System
  { slug: 'fuel-pump', name: 'Fuel Pump', basePrice: 145, category: 'Fuel System', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'fuel-tank', name: 'Fuel Tank', basePrice: 225, category: 'Fuel System', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'fuel-injector', name: 'Fuel Injector', basePrice: 85, category: 'Fuel System', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'throttle-body', name: 'Throttle Body', basePrice: 145, category: 'Fuel System', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'intake-manifold', name: 'Intake Manifold', basePrice: 185, category: 'Fuel System', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  
  // Engine Components
  { slug: 'cylinder-head', name: 'Cylinder Head', basePrice: 485, category: 'Engine Components', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'camshaft', name: 'Camshaft', basePrice: 245, category: 'Engine Components', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'crankshaft', name: 'Crankshaft', basePrice: 345, category: 'Engine Components', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'timing-chain', name: 'Timing Chain', basePrice: 145, category: 'Engine Components', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'oil-pan', name: 'Oil Pan', basePrice: 95, category: 'Engine Components', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'valve-cover', name: 'Valve Cover', basePrice: 75, category: 'Engine Components', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
  { slug: 'turbocharger', name: 'Turbocharger', basePrice: 645, category: 'Engine Components', googleCategory: '5613', image: '/images/parts/engine-used.jpg' },
]

// ═══════════════════════════════════════════════════════════════════
// PRODUCT GENERATION
// ═══════════════════════════════════════════════════════════════════

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

function getDisplayPrice(basePrice: number): number {
  // Apply 15% markup and add variance (-10% to +15%)
  const variance = 0.9 + Math.random() * 0.25
  return Math.round(basePrice * 1.15 * variance * 100) / 100
}

function generateProductId(model: string, year: number, partSlug: string, index: number): string {
  return `AAP-${model.toUpperCase().replace(/\s/g, '')}-${year}-${partSlug.toUpperCase().replace(/-/g, '')}-${index.toString().padStart(5, '0')}`
}

function generateProducts(): GMCProduct[] {
  const products: GMCProduct[] = []
  let productIndex = 12345 // Starting ID
  
  // For each model
  for (const [model, targetCount] of Object.entries(MODEL_PART_COUNTS)) {
    const years = MODEL_YEARS[model] || [2020]
    const partsPerYearPerType = Math.ceil(targetCount / (years.length * PART_TYPES.length))
    
    let modelProductCount = 0
    
    // For each year
    for (const year of years) {
      if (modelProductCount >= targetCount) break
      
      // For each part type
      for (const part of PART_TYPES) {
        if (modelProductCount >= targetCount) break
        
        // Generate variants (left/right, front/rear, etc.)
        const variants = getPartVariants(part.name)
        
        for (const variant of variants) {
          if (modelProductCount >= targetCount) break
          
          const id = generateProductId(model, year, part.slug, productIndex++)
          const price = getDisplayPrice(part.basePrice)
          const variantSuffix = variant ? ` ${variant}` : ''
          
          products.push({
            id,
            title: `Used ${BRAND} ${model} ${year} ${part.name}${variantSuffix} - OEM Quality`,
            description: `Quality used OEM ${part.name}${variantSuffix} for ${BRAND} ${model} ${year}. Professionally inspected and tested. Includes 6-month warranty. Free shipping. Save 40-70% vs new dealer price.`,
            link: `${BASE_URL}/makes/acura/parts/${part.slug}?id=${id}`,
            image_link: `${BASE_URL}${part.image}`,
            price: `${price.toFixed(2)} USD`,
            availability: 'in stock',
            condition: 'used',
            brand: BRAND,
            google_product_category: part.googleCategory,
            product_type: `Auto Parts > ${BRAND} > ${model} > ${part.category} > ${part.name}`,
            mpn: `${part.slug.toUpperCase().replace(/-/g, '')}-${year}-${model.toUpperCase().replace(/\s/g, '')}`,
            shipping_country: 'US',
            shipping_service: 'Standard',
            shipping_price: '0 USD'
          })
          
          modelProductCount++
        }
      }
    }
    
    console.log(`Generated ${modelProductCount} products for ${model}`)
  }
  
  return products
}

function getPartVariants(partName: string): string[] {
  // Parts that have left/right variants
  const leftRightParts = ['Headlight', 'Taillight', 'Fog Light', 'Door', 'Fender', 'Mirror', 'Control Arm', 'Strut', 'Brake Caliper', 'Spindle', 'Quarter Panel']
  
  // Parts that have front/rear variants
  const frontRearParts = ['Bumper', 'Seat', 'Door', 'Shock', 'Brake Caliper', 'Sway Bar']
  
  const variants: string[] = [''] // Always include base variant
  
  for (const lr of leftRightParts) {
    if (partName.includes(lr)) {
      variants.push('Driver Side')
      variants.push('Passenger Side')
      break
    }
  }
  
  for (const fr of frontRearParts) {
    if (partName.includes(fr)) {
      variants.push('Front')
      variants.push('Rear')
      break
    }
  }
  
  return variants.slice(0, 2) // Limit to 2 variants to control product count
}

// ═══════════════════════════════════════════════════════════════════
// XML GENERATION
// ═══════════════════════════════════════════════════════════════════

function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateXML(products: GMCProduct[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>AUAPW.ORG - ${BRAND} Used Auto Parts</title>
    <link>${BASE_URL}</link>
    <description>Quality used ${BRAND} auto parts with warranty. Save 40-70% vs new. Free shipping nationwide. ${products.length} parts available.</description>
`

  for (const product of products) {
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
      <g:product_type>${escapeXML(product.product_type)}</g:product_type>
      <g:mpn>${escapeXML(product.mpn || '')}</g:mpn>
      <g:shipping>
        <g:country>${product.shipping_country}</g:country>
        <g:service>${product.shipping_service}</g:service>
        <g:price>${product.shipping_price}</g:price>
      </g:shipping>
    </item>
`
  }

  xml += `  </channel>
</rss>`

  return xml
}

// ═══════════════════════════════════════════════════════════════════
// CSV GENERATION
// ═══════════════════════════════════════════════════════════════════

function generateCSV(products: GMCProduct[]): string {
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
    'shipping(country:service:price)'
  ]

  let csv = headers.join(',') + '\n'

  for (const product of products) {
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
  }

  return csv
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════

function main() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`Generating GMC Feed for ${BRAND}...`)
  console.log('═══════════════════════════════════════════════════════════════\n')
  
  // Generate products
  const products = generateProducts()
  
  console.log(`\nTotal products generated: ${products.length}`)
  
  // Create output directory
  const outputDir = path.join(process.cwd(), 'public', 'feeds')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // Generate and save XML feed
  const xml = generateXML(products)
  const xmlPath = path.join(outputDir, 'acura-gmc-feed.xml')
  fs.writeFileSync(xmlPath, xml)
  console.log(`\nXML Feed saved: ${xmlPath}`)
  
  // Generate and save CSV feed
  const csv = generateCSV(products)
  const csvPath = path.join(outputDir, 'acura-gmc-feed.csv')
  fs.writeFileSync(csvPath, csv)
  console.log(`CSV Feed saved: ${csvPath}`)
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('FEED GENERATION COMPLETE')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`Brand: ${BRAND}`)
  console.log(`Products: ${products.length}`)
  console.log(`XML URL: ${BASE_URL}/feeds/acura-gmc-feed.xml`)
  console.log(`CSV URL: ${BASE_URL}/feeds/acura-gmc-feed.csv`)
  console.log('═══════════════════════════════════════════════════════════════\n')
}

main()

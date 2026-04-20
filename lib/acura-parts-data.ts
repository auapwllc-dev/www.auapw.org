// Acura Used Auto Parts Data
// Prices increased by 15% from original wholesale prices
// All parts are USED OEM parts from verified recyclers

export interface AcuraPart {
  id: string
  title: string
  description: string
  price: number // 15% markup applied
  originalPrice: number
  image: string
  mpn: string
  model: string
  year: string
  partType: string
  condition: 'used'
  availability: 'in_stock' | 'out_of_stock'
  link: string
}

// Sample Acura parts with 15% price increase
export const ACURA_PARTS: AcuraPart[] = [
  // Engines
  {
    id: "AAP-331",
    title: "Acura MDX 2020 Engine Electric (Hybrid), Rear",
    description: "Used OEM Engine for Acura MDX 2020 (electric (hybrid), rear (rear subframe mounted, 72HP)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(2729 * 1.15 * 100) / 100,
    originalPrice: 2729,
    image: "/images/parts/engine-used.jpg",
    mpn: "ENG-2020-331",
    model: "MDX",
    year: "2020",
    partType: "Engine",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=331"
  },
  {
    id: "AAP-332",
    title: "Acura MDX 2020 Engine Gasoline, 3.0L AWD",
    description: "Used OEM Engine for Acura MDX 2020 (gasoline, 3.0L (VIN 7, 6th digit, AWD)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(2770 * 1.15 * 100) / 100,
    originalPrice: 2770,
    image: "/images/parts/engine-used.jpg",
    mpn: "ENG-2020-332",
    model: "MDX",
    year: "2020",
    partType: "Engine",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=332"
  },
  {
    id: "AAP-333",
    title: "Acura MDX 2020 Engine Gasoline, 3.5L FWD",
    description: "Used OEM Engine for Acura MDX 2020 (gasoline, 3.5L, VIN 3 (6th digit, FWD)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(4460 * 1.15 * 100) / 100,
    originalPrice: 4460,
    image: "/images/parts/engine-used.jpg",
    mpn: "ENG-2020-333",
    model: "MDX",
    year: "2020",
    partType: "Engine",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=333"
  },
  {
    id: "AAP-334",
    title: "Acura MDX 2020 Engine Gasoline, 3.5L AWD",
    description: "Used OEM Engine for Acura MDX 2020 (gasoline, 3.5L, VIN 4 (6th digit, AWD)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(4460 * 1.15 * 100) / 100,
    originalPrice: 4460,
    image: "/images/parts/engine-used.jpg",
    mpn: "ENG-2020-334",
    model: "MDX",
    year: "2020",
    partType: "Engine",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=334"
  },
  // Transmissions
  {
    id: "AAP-335",
    title: "Acura MDX 2020 Transmission (AT), AWD Advance",
    description: "Used OEM Transmission for Acura MDX 2020 ((AT), AWD, Advance). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(3550 * 1.15 * 100) / 100,
    originalPrice: 3550,
    image: "/images/parts/transmission-used.jpg",
    mpn: "TRA-2020-335",
    model: "MDX",
    year: "2020",
    partType: "Transmission",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=335"
  },
  {
    id: "AAP-336",
    title: "Acura MDX 2020 Transmission (AT), AWD Base",
    description: "Used OEM Transmission for Acura MDX 2020 ((AT), AWD, Base). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(3550 * 1.15 * 100) / 100,
    originalPrice: 3550,
    image: "/images/parts/transmission-used.jpg",
    mpn: "TRA-2020-336",
    model: "MDX",
    year: "2020",
    partType: "Transmission",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=336"
  },
  {
    id: "AAP-337",
    title: "Acura MDX 2020 Transmission (AT), AWD Hybrid",
    description: "Used OEM Transmission for Acura MDX 2020 ((AT), AWD, Hybrid). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(1448 * 1.15 * 100) / 100,
    originalPrice: 1448,
    image: "/images/parts/transmission-used.jpg",
    mpn: "TRA-2020-337",
    model: "MDX",
    year: "2020",
    partType: "Transmission",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=337"
  },
  {
    id: "AAP-339",
    title: "Acura MDX 2020 Transmission (AT), FWD",
    description: "Used OEM Transmission for Acura MDX 2020 ((AT), FWD). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(4525 * 1.15 * 100) / 100,
    originalPrice: 4525,
    image: "/images/parts/transmission-used.jpg",
    mpn: "TRA-2020-339",
    model: "MDX",
    year: "2020",
    partType: "Transmission",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=339"
  },
  // Wheel Rims
  {
    id: "AAP-2291701",
    title: "Acura MDX 2020 Wheel Rim 17x4 (Steel, Compact Spare)",
    description: "Used OEM Wheel Rim for Acura MDX 2020 (17x4 (steel, compact spare)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(100 * 1.15 * 100) / 100,
    originalPrice: 100,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314114",
    model: "MDX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314114"
  },
  {
    id: "AAP-2291702",
    title: "Acura MDX 2020 Wheel Rim 18x8 (Alloy)",
    description: "Used OEM Wheel Rim for Acura MDX 2020 (18x8 (alloy)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(391 * 1.15 * 100) / 100,
    originalPrice: 391,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314115",
    model: "MDX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314115"
  },
  {
    id: "AAP-2291703",
    title: "Acura MDX 2020 Wheel Rim 20x8 (Alloy) Black",
    description: "Used OEM Wheel Rim for Acura MDX 2020 (20x8 (alloy) black). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(358 * 1.15 * 100) / 100,
    originalPrice: 358,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314116",
    model: "MDX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314116"
  },
  // Headlights
  {
    id: "AAP-2291732",
    title: "Acura RDX 2020 Headlight LED Adaptive Passenger Side",
    description: "Used OEM Headlight/Headlamp Assembly for Acura RDX 2020 (adaptive headlamps (LED) Passenger Side). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(1477 * 1.15 * 100) / 100,
    originalPrice: 1477,
    image: "/images/parts/headlight-used.jpg",
    mpn: "HEA-2020-2314145",
    model: "RDX",
    year: "2020",
    partType: "Headlight",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314145"
  },
  // ILX Parts
  {
    id: "AAP-2312397",
    title: "Acura ILX 2021 Wiper Motor, Rear",
    description: "Used OEM Wiper Motor, Rear for Acura ILX 2021 (No). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(145 * 1.15 * 100) / 100,
    originalPrice: 145,
    image: "/images/parts/wiper-motor-used.jpg",
    mpn: "WIP-2021-2334810",
    model: "ILX",
    year: "2021",
    partType: "Wiper Motor",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2334810"
  },
  {
    id: "AAP-2291807",
    title: "Acura ILX 2020 Wheel Rim 17x4 (Steel, Compact Spare)",
    description: "Used OEM Wheel Rim for Acura ILX 2020 (17x4 (steel, compact spare)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(129 * 1.15 * 100) / 100,
    originalPrice: 129,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314220",
    model: "ILX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314220"
  },
  {
    id: "AAP-2291808",
    title: "Acura ILX 2020 Wheel Rim 17x7 (Alloy) Machined Y Spoke",
    description: "Used OEM Wheel Rim for Acura ILX 2020 (17x7 (alloy) machined face Y spoke (factory installed)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(306 * 1.15 * 100) / 100,
    originalPrice: 306,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314221",
    model: "ILX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314221"
  },
  // TLX Parts
  {
    id: "AAP-2291858",
    title: "Acura TLX 2020 Wheel Rim 17x4 (Steel, Compact Spare)",
    description: "Used OEM Wheel Rim for Acura TLX 2020 (17x4 (steel, compact spare)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(129 * 1.15 * 100) / 100,
    originalPrice: 129,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314271",
    model: "TLX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314271"
  },
  {
    id: "AAP-2291860",
    title: "Acura TLX 2020 Wheel Rim 18x7-1/2 Chrome",
    description: "Used OEM Wheel Rim for Acura TLX 2020 (18x7-1/2 chrome (dealer installed)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(261 * 1.15 * 100) / 100,
    originalPrice: 261,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314273",
    model: "TLX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314273"
  },
  // A/C Controls
  {
    id: "AAP-2249189",
    title: "Acura MDX 2019 A/C Control Front (Dash)",
    description: "Used OEM A/C Control for Acura MDX 2019 ((US market) front (dash)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(58 * 1.15 * 100) / 100,
    originalPrice: 58,
    image: "/images/parts/ac-control-used.jpg",
    mpn: "ACC-2019-2271602",
    model: "MDX",
    year: "2019",
    partType: "A/C Control",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2271602"
  },
  {
    id: "AAP-2249190",
    title: "Acura MDX 2019 A/C Control Rear Entertainment System",
    description: "Used OEM A/C Control for Acura MDX 2019 ((US market) rear (floor console) rear entertainment system). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(108 * 1.15 * 100) / 100,
    originalPrice: 108,
    image: "/images/parts/ac-control-used.jpg",
    mpn: "ACC-2019-2271603",
    model: "MDX",
    year: "2019",
    partType: "A/C Control",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2271603"
  },
  // ABS Control
  {
    id: "AAP-2249195",
    title: "Acura MDX 2019 ABS Control Module AWD 3.5L Advance",
    description: "Used OEM ABS Control Module/Pump for Acura MDX 2019 ((modulator assembly) AWD 3.5L park assist (Advance)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(397 * 1.15 * 100) / 100,
    originalPrice: 397,
    image: "/images/parts/abs-module-used.jpg",
    mpn: "ABS-2019-2271608",
    model: "MDX",
    year: "2019",
    partType: "ABS Control Module",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2271608"
  },
  {
    id: "AAP-2249196",
    title: "Acura MDX 2019 ABS Control Module AWD 3.5L Base",
    description: "Used OEM ABS Control Module/Pump for Acura MDX 2019 ((modulator assembly) AWD 3.5L Without park assist). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(378 * 1.15 * 100) / 100,
    originalPrice: 378,
    image: "/images/parts/abs-module-used.jpg",
    mpn: "ABS-2019-2271609",
    model: "MDX",
    year: "2019",
    partType: "ABS Control Module",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2271609"
  },
  // Air Bags
  {
    id: "AAP-2249199",
    title: "Acura MDX 2019 Air Bag Driver Side Knee",
    description: "Used OEM Air Bag for Acura MDX 2019 ((front) Driver Side knee). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(443 * 1.15 * 100) / 100,
    originalPrice: 443,
    image: "/images/parts/airbag-used.jpg",
    mpn: "AIR-2019-2271612",
    model: "MDX",
    year: "2019",
    partType: "Air Bag",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2271612"
  },
  {
    id: "AAP-2249200",
    title: "Acura MDX 2019 Air Bag Driver Side Roof",
    description: "Used OEM Air Bag for Acura MDX 2019 ((front) Driver Side roof). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(534 * 1.15 * 100) / 100,
    originalPrice: 534,
    image: "/images/parts/airbag-used.jpg",
    mpn: "AIR-2019-2271613",
    model: "MDX",
    year: "2019",
    partType: "Air Bag",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2271613"
  },
  // RDX Parts
  {
    id: "AAP-2291755",
    title: "Acura RDX 2020 Wheel Rim 17x4 (Steel, Compact Spare)",
    description: "Used OEM Wheel Rim for Acura RDX 2020 (17x4 (steel, compact spare)). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(129 * 1.15 * 100) / 100,
    originalPrice: 129,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314168",
    model: "RDX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314168"
  },
  {
    id: "AAP-2291758",
    title: "Acura RDX 2020 Wheel Rim 19x8 (Alloy) Gray Advance",
    description: "Used OEM Wheel Rim for Acura RDX 2020 (19x8 (alloy) Without machined face painted gray (factory installed) Advance). Recycled auto part from All Used Auto Parts. Professionally inspected. Verify VIN/fitment before shipping.",
    price: Math.round(423 * 1.15 * 100) / 100,
    originalPrice: 423,
    image: "/images/parts/wheel-rim-used.jpg",
    mpn: "WHE-2020-2314171",
    model: "RDX",
    year: "2020",
    partType: "Wheel Rim",
    condition: "used",
    availability: "in_stock",
    link: "https://allusedautoparts.world/product.php?id=2314171"
  },
]

// Get unique models
export const ACURA_MODELS = [...new Set(ACURA_PARTS.map(p => p.model))]

// Get unique part types
export const ACURA_PART_TYPES = [...new Set(ACURA_PARTS.map(p => p.partType))]

// Get unique years
export const ACURA_YEARS = [...new Set(ACURA_PARTS.map(p => p.year))].sort((a, b) => Number(b) - Number(a))

// Get parts by model
export function getPartsByModel(model: string): AcuraPart[] {
  return ACURA_PARTS.filter(p => p.model === model)
}

// Get parts by type
export function getPartsByType(type: string): AcuraPart[] {
  return ACURA_PARTS.filter(p => p.partType === type)
}

// Get part by ID
export function getPartById(id: string): AcuraPart | undefined {
  return ACURA_PARTS.find(p => p.id === id)
}

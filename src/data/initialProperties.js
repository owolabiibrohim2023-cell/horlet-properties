import { generatePropertySvg } from "../utils/imageFallbacks";

export const INITIAL_PROPERTIES = [
  {
    id: "HP-001",
    title: "Luxury 5-Bedroom Fully Detached Duplex with BQ",
    price: 85000000,
    priceFormatted: "₦85,000,000",
    status: "For Sale",
    propertyType: "Detached Duplex",
    location: "Ibara GRA, Abeokuta, Ogun State",
    bedrooms: 5,
    bathrooms: 6,
    landSize: "650 sqm",
    titleDoc: "Certificate of Occupancy (C of O)",
    description: "Exquisite contemporary mansion nestled in prestigious Ibara GRA. Boasts all en-suite bedrooms, high-grade imported marble flooring, fitted Italian kitchen with heat extractor, automated perimeter security gate, stamp concrete compound parking 6 cars, and dedicated boys' quarter.",
    features: [
      "All En-Suite Bedrooms",
      "Fitted Luxury Kitchen",
      "Automated Security Gate",
      "Stamp Concrete Compound",
      "Dedicated BQ & Security Post",
      "Prepaid 3-Phase Meter"
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    fallbackSvg: generatePropertySvg({
      title: "5-Bed Detached Duplex, Ibara GRA",
      type: "Detached Duplex",
      price: "₦85,000,000"
    }),
    featured: true,
    inspectionAvailable: true,
  },
  {
    id: "HP-002",
    title: "Modern 4-Bedroom Semi-Detached Duplex",
    price: 55000000,
    priceFormatted: "₦55,000,000",
    status: "For Sale",
    propertyType: "Semi-Detached Duplex",
    location: "Oke-Mosan (Near State Secretariat), Abeokuta",
    bedrooms: 4,
    bathrooms: 5,
    landSize: "450 sqm",
    titleDoc: "Governor's Consent & Registered Survey",
    description: "Newly completed architectural family home in serene Oke-Mosan corridor. Features intricate POP ceilings, solar inverter conduit piping, industrial borehole water treatment, and paved interlocking driveway in an access-controlled estate.",
    features: [
      "CCTV Surveillance Ready",
      "Borehole with Water Treatment",
      "Modern POP Finishing",
      "Interlocked Driveway",
      "Gated Access Estate",
      "High Resale Value"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    fallbackSvg: generatePropertySvg({
      title: "4-Bed Semi-Detached, Oke-Mosan",
      type: "Semi-Detached Duplex",
      price: "₦55,000,000"
    }),
    featured: true,
    inspectionAvailable: true,
  },
  {
    id: "HP-003",
    title: "2 Plots of Prime Roadside Commercial Land",
    price: 32000000,
    priceFormatted: "₦32,000,000",
    status: "For Sale",
    propertyType: "Commercial Land",
    location: "Ijeja / Igbore Road Corridor, Abeokuta",
    bedrooms: null,
    bathrooms: null,
    landSize: "1,300 sqm (2 Standard Plots)",
    titleDoc: "Registered Conveyance & Beacon Survey",
    description: "100% dry, flat commercial parcel along the high-traffic Ijeja / Igbore corridor near Surveyors House. Strategic for commercial bank, shopping plaza, hospital, private school, or corporate logistics hub.",
    features: [
      "100% Dry Table Land",
      "Direct Tarred Road Access",
      "Fully Beaconed Survey",
      "No Omo-Onile Encumbrance",
      "Immediate Allocation",
      "High Commercial Yield"
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    fallbackSvg: generatePropertySvg({
      title: "2 Commercial Plots, Ijeja Corridor",
      type: "Commercial Land",
      price: "₦32,000,000"
    }),
    featured: false,
    inspectionAvailable: true,
  },
  {
    id: "HP-004",
    title: "Executive Serviced 3-Bedroom Flat with Balcony",
    price: 2500000,
    priceFormatted: "₦2,500,000 / annum",
    status: "For Rent",
    propertyType: "Apartment / Flat",
    location: "Asero Hillview Estate, Abeokuta",
    bedrooms: 3,
    bathrooms: 3,
    landSize: "180 sqm built-up",
    titleDoc: "Tenancy Agreement & Official Receipt",
    description: "Upscale 3-bedroom apartment located in a secure gated enclave in Asero. Features scenic panoramic views of Abeokuta rock formations, constant municipal and treated water supply, uniform security guard, and ample parking.",
    features: [
      "Scenic Hilltop Views",
      "Uniformed Estate Security",
      "Dedicated Prepaid Meter",
      "Ample Parking Lot",
      "Modern Kitchen Cabinets",
      "Quiet Residential Zone"
    ],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    fallbackSvg: generatePropertySvg({
      title: "3-Bed Serviced Flat, Asero",
      type: "Apartment / Flat",
      price: "₦2,500,000/yr"
    }),
    featured: true,
    inspectionAvailable: true,
  },
  {
    id: "HP-005",
    title: "4-Bedroom Modern Bungalow on Full Plot",
    price: 38000000,
    priceFormatted: "₦38,000,000",
    status: "For Sale",
    propertyType: "Bungalow",
    location: "Kobape Axis, Sagamu-Abeokuta Expressway Corridor",
    bedrooms: 4,
    bathrooms: 4,
    landSize: "648 sqm (Full Plot)",
    titleDoc: "Approved Building Plan & Gazette",
    description: "Solidly built contemporary bungalow on a full plot of dry land along the booming Kobape growth corridor. Perimeter-fenced with razor wire, large green garden space, spacious living room with dining alcove, and modern sanitary wares.",
    features: [
      "Perimeter Fencing & Gate",
      "Spacious Garden Lawn",
      "Modern Sanitary Wares",
      "High Ceiling Design",
      "Rapid Value Appreciation",
      "Title Verified"
    ],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    fallbackSvg: generatePropertySvg({
      title: "4-Bed Bungalow, Kobape Axis",
      type: "Bungalow",
      price: "₦38,000,000"
    }),
    featured: false,
    inspectionAvailable: true,
  },
  {
    id: "HP-006",
    title: "Tastefully Finished 2-Bedroom Terrace Apartment",
    price: 1800000,
    priceFormatted: "₦1,800,000 / annum",
    status: "For Rent",
    propertyType: "Terrace Apartment",
    location: "Ita-Eko Commercial District, Abeokuta",
    bedrooms: 2,
    bathrooms: 2,
    landSize: "120 sqm",
    titleDoc: "Annual Lease Contract",
    description: "Compact and modern 2-bedroom rental apartment in central Ita-Eko, close to major banking districts, supermarkets, and healthcare facilities. Ideal for young professionals, corporate executives, or small families.",
    features: [
      "Prime Central Location",
      "Fitted Wardrobes",
      "Fully Tiled Floors",
      "Gated Compound",
      "Constant Water Supply",
      "Proximity to Lalubu Street"
    ],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    fallbackSvg: generatePropertySvg({
      title: "2-Bed Terrace, Ita-Eko",
      type: "Terrace Apartment",
      price: "₦1,800,000/yr"
    }),
    featured: false,
    inspectionAvailable: true,
  },
  {
    id: "HP-007",
    title: "50 Hectares Commercial Farmland (SOLD)",
    price: 45000000,
    priceFormatted: "₦45,000,000",
    status: "Sold",
    propertyType: "Agricultural Land",
    location: "Rounder / Alamala Axis, Abeokuta",
    bedrooms: null,
    bathrooms: null,
    landSize: "50 Hectares",
    titleDoc: "Agricultural C of O & Surveyor Coordinates",
    description: "Expansive fertile farmland successfully acquired and closed by an agro-industrial client through Horlet Properties. Featured natural stream boundary, motorable access road, and verified government coordinates.",
    features: [
      "Transacted by Horlet Properties",
      "Natural Water Stream Access",
      "Full Boundary Beaconing",
      "Zero Dispute Guarantee",
      "Fast Track Documentation"
    ],
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
    fallbackSvg: generatePropertySvg({
      title: "50 Hectares Farm (SOLD)",
      type: "Agricultural Land",
      price: "₦45,000,000"
    }),
    featured: false,
    inspectionAvailable: false,
  },
  {
    id: "HP-008",
    title: "3-Storey Commercial Complex & Banking Hall (SOLD)",
    price: 120000000,
    priceFormatted: "₦120,000,000",
    status: "Sold",
    propertyType: "Commercial Building",
    location: "Lalubu Street, Oke-Ilewo, Abeokuta",
    bedrooms: 12,
    bathrooms: 8,
    landSize: "900 sqm",
    titleDoc: "Federal C of O & Land Registry Seal",
    description: "Landmark multi-level commercial office building on prestigious Lalubu commercial strip. Brokered and closed smoothly by Horlet Properties for an institutional private equity client.",
    features: [
      "Institutional Grade Investment",
      "Prime Banking Strip Location",
      "High Yield Rental Revenue",
      "Horlet Verified Title",
      "Seamless Legal Closing"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    fallbackSvg: generatePropertySvg({
      title: "3-Storey Commercial (SOLD)",
      type: "Commercial Building",
      price: "₦120,000,000"
    }),
    featured: false,
    inspectionAvailable: false,
  },
];

const LOCAL_STORAGE_KEY = "horlet_properties_catalog_v2";

/**
 * Loads properties from localStorage or falls back to INITIAL_PROPERTIES
 */
export function getSavedProperties() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading saved properties from localStorage:", err);
  }
  return INITIAL_PROPERTIES;
}

/**
 * Persists properties catalog to localStorage
 */
export function saveProperties(properties) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(properties));
  } catch (err) {
    console.error("Error saving properties to localStorage:", err);
  }
}

/**
 * Resets properties catalog back to default seed data
 */
export function resetPropertiesToDefault() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    // ignore
  }
  return INITIAL_PROPERTIES;
}

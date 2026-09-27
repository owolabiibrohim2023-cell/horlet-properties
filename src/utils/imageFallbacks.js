// SVG Graphic generator and photo presets for real estate properties

export function generatePropertySvg({ title, type, price, color = "#0f5132" }) {
  const isLand = type && type.toLowerCase().includes("land");
  const isCommercial = type && type.toLowerCase().includes("commercial");
  
  // Clean SVG architectural illustration
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14342b"/>
        <stop offset="60%" stop-color="#0f2922"/>
        <stop offset="100%" stop-color="#091b16"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
      <linearGradient id="glass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#34d399" stop-opacity="0.05"/>
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="500" fill="url(#bg)"/>
    
    <!-- Subtle architectural grid lines -->
    <g opacity="0.08" stroke="#ffffff" stroke-width="1">
      <line x1="0" y1="100" x2="800" y2="100"/>
      <line x1="0" y1="200" x2="800" y2="200"/>
      <line x1="0" y1="300" x2="800" y2="300"/>
      <line x1="0" y1="400" x2="800" y2="400"/>
      <line x1="200" y1="0" x2="200" y2="500"/>
      <line x1="400" y1="0" x2="400" y2="500"/>
      <line x1="600" y1="0" x2="600" y2="500"/>
    </g>

    <!-- Sun / Gold accent glow -->
    <circle cx="680" cy="120" r="80" fill="url(#gold)" opacity="0.15"/>

    <!-- Architectural Building Silhouette / Landscape -->
    ${
      isLand
        ? `
      <!-- Land / Landscape Topography -->
      <path d="M 0 380 Q 200 320 400 350 T 800 330 L 800 500 L 0 500 Z" fill="#1b4332" opacity="0.7"/>
      <path d="M 0 410 Q 300 370 600 420 T 800 400 L 800 500 L 0 500 Z" fill="#2d6a4f" opacity="0.9"/>
      <!-- Survey Pegs & Boundary Line -->
      <line x1="180" y1="360" x2="620" y2="340" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8,6"/>
      <circle cx="180" cy="360" r="7" fill="#f59e0b"/>
      <circle cx="400" cy="347" r="7" fill="#f59e0b"/>
      <circle cx="620" cy="340" r="7" fill="#f59e0b"/>
      <rect x="220" y="270" width="160" height="40" rx="6" fill="#0b201a" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="300" y="295" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#f59e0b" text-anchor="middle">VERIFIED SURVEY TITLE</text>
    `
        : isCommercial
        ? `
      <!-- Commercial Office Highrise Elevation -->
      <rect x="220" y="140" width="360" height="310" rx="4" fill="#1b3a30" stroke="#2d6a4f" stroke-width="2"/>
      <rect x="250" y="170" width="70" height="50" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <rect x="360" y="170" width="80" height="50" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <rect x="480" y="170" width="70" height="50" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <rect x="250" y="250" width="70" height="50" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <rect x="360" y="250" width="80" height="50" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <rect x="480" y="250" width="70" height="50" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <rect x="350" y="360" width="100" height="90" fill="#0f2922" stroke="#f59e0b" stroke-width="2"/>
      <!-- Ground line -->
      <line x1="0" y1="450" x2="800" y2="450" stroke="#f59e0b" stroke-width="3"/>
    `
        : `
      <!-- Modern Residential Duplex / Villa Elevation -->
      <!-- Main House Body -->
      <rect x="180" y="180" width="440" height="270" rx="6" fill="#1b3a30" stroke="#2d6a4f" stroke-width="2"/>
      <!-- Modern Asymmetrical Cantilever Floor 2 -->
      <polygon points="150,180 460,180 430,110 180,110" fill="#234a3e" stroke="#34d399" stroke-width="2"/>
      <!-- Balcony Glass Wall -->
      <rect x="190" y="195" width="180" height="75" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <rect x="410" y="195" width="170" height="75" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <!-- Entrance Porch & Door -->
      <rect x="340" y="330" width="80" height="120" rx="2" fill="#0d241d" stroke="#f59e0b" stroke-width="2"/>
      <!-- Picture Windows Ground Floor -->
      <rect x="200" y="330" width="110" height="90" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <rect x="450" y="330" width="130" height="90" rx="3" fill="url(#glass)" stroke="#34d399" stroke-width="1.5"/>
      <!-- Ground Line -->
      <line x1="0" y1="450" x2="800" y2="450" stroke="#f59e0b" stroke-width="3"/>
    `
    }

    <!-- Brand Watermark Badge -->
    <g transform="translate(40, 40)">
      <rect width="210" height="38" rx="6" fill="#091b16" opacity="0.85" stroke="#f59e0b" stroke-width="1"/>
      <text x="12" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#f59e0b" letter-spacing="1.5">HORLET PROPERTIES</text>
    </g>

    <!-- Property Info Overlay Badge Bottom -->
    <g transform="translate(40, 415)">
      <rect width="720" height="55" rx="8" fill="#091b16" opacity="0.9" stroke="#2d6a4f" stroke-width="1"/>
      <text x="20" y="34" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#ffffff">${escapeXml(
        title || "Horlet Exclusive Listing"
      )}</text>
      <text x="700" y="34" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#10b981" text-anchor="end">${escapeXml(
        price || "Verified Title"
      )}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

// Curated high quality presets for quick selection in the Admin Panel
export const PROPERTY_IMAGE_PRESETS = [
  {
    id: "preset-duplex-1",
    label: "Luxury 5-Bed Duplex (Ibara GRA)",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    type: "Detached Duplex",
  },
  {
    id: "preset-duplex-2",
    label: "Modern 4-Bed Semi-Detached (Oke-Mosan)",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    type: "Semi-Detached Duplex",
  },
  {
    id: "preset-land-1",
    label: "Commercial Dry Land (Ijeja / Igbore)",
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    type: "Commercial Land",
  },
  {
    id: "preset-flat-1",
    label: "Serviced 3-Bed Apartment (Asero)",
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    type: "Apartment / Flat",
  },
  {
    id: "preset-bungalow-1",
    label: "Modern 4-Bed Bungalow (Kobape)",
    url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    type: "Bungalow",
  },
  {
    id: "preset-terrace-1",
    label: "Executive Terrace Apartment (Ita-Eko)",
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    type: "Terrace Apartment",
  },
  {
    id: "preset-farmland-1",
    label: "Agricultural Farmland (Rounder / Alamala)",
    url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
    type: "Agricultural Land",
  },
  {
    id: "preset-commercial-1",
    label: "Commercial Complex (Oke-Ilewo / Lalubu)",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    type: "Commercial Building",
  },
];

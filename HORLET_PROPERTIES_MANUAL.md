# Horlet Properties — Real Estate Web Application

**Location:** Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101, Ogun State, Nigeria  
**Official Telephone:** 0703 091 8464  
**Direct WhatsApp:** +234 703 091 8464 (`2347030918464`)  
**Tech Stack:** React 18, Plain CSS, JavaScript (Zero Python, Zero Backend Server)

---

## 🔐 Admin Portal: Login, Change Password & Random Username Features

The Admin Portal Login has been upgraded with direct **Change Password** capabilities and complete **Random Username** support:

### 1. Change Password Directly from the Login Screen
* You no longer need to be logged in to change or reset your password.
* On the **Staff Login** modal, there are two tabs at the top:
  * **"Sign In"**
  * **"Change Password"**
* Under **"Change Password"**:
  * Set a new password (minimum 6 characters).
  * Optionally set or generate a new username.
  * Click **"🎲 Strong Password"** to automatically generate a secure random password.
  * Click **"Save & Continue to Login"** — your session credentials update instantly and the modal seamlessly switches to the Sign In screen with your new credentials ready.

### 2. Random Username Support
* **"🎲 Use Random Username" button:** On the Sign In screen, clicking this button generates and fills a clean, random username (e.g. `horlet_8x3a42`, `realtor_9k2m15`, `agent_b47f89`).
* **"Accept any random username with valid password" toggle:** Enabled by default. This permits the administrator to enter or generate **any random username** they want and log in successfully, provided their password is valid.
* **Random Username Generator in Change Password:** Also available on the password reset tab and within the management dashboard settings.

### 3. Default Credentials
* **Default Username:** `horlet_admin` (or any random username when "Accept any random username" is active!)
* **Default Password:** `HorletAbeokuta2024!`

*(As required, these credentials never appear in rendered HTML, placeholders, autofill attributes, or console logs).*

---

## 🏛️ Agency Overview & Architectural Structure

The website for **Horlet Properties** is a high-performance single-page application built entirely on the client side without any external server or Python dependencies. All state management, catalog updates, property filtering, and administrative authorization run smoothly in the browser using React state, `localStorage`, and `sessionStorage`.

---

## 🌟 Core Features & Pages

### 1. Header & Navigation (`src/components/Navbar.jsx`)
- **Branding:** Modern architectural emblem with gold and emerald styling representing Horlet Properties Abeokuta.
- **Top Utility Strip:** Displays physical office address at *Surveyors House, 97b Ijeja Road*, working hours, and surveyor title assurance badge.
- **Direct Contact CTAs:** One-click telephone dialer (`0703 091 8464`) and WhatsApp chat link.
- **Staff Entry:** Header lock icon providing instant access to the administrative login dialog.
- **Responsive Mobile Drawer:** Smooth slide-out mobile navigation for smartphone users.

### 2. Hero Section (`src/components/Hero.jsx`)
- **Headline & Value Proposition:** Highlighting prime residential homes, commercial hubs, and verified title lands across Abeokuta (Ibara GRA, Oke-Mosan, Ijeja, Kobape, Asero).
- **Interactive Quick Search Bar:** Live search with tabs for *All*, *For Sale*, and *For Rent*, plus dropdown selectors for property types and location keywords. Submitting dynamically scrolls and filters the listings grid.
- **Trust Indicators & Statistics Strip:**
  - 150+ Verified Listings Handled
  - 12+ Years Ogun State Real Estate Experience
  - 100% Surveyor Title Verification Guarantee
  - 98% Satisfied Buyer & Tenant Rate

### 3. Properties Portfolio & Filtering (`src/components/PropertyList.jsx` & `PropertyCard.jsx`)
- **Grid Layout:** Displays all active properties with high-resolution imagery, status badges, price in Nigerian Naira (`₦`), location, specifications, and descriptions.
- **Multi-Factor Filtering:**
  - Status Pills: *All*, *For Sale*, *For Rent*, *Sold* (with live count badges)
  - Keyword & Location Search
  - Property Type Dropdown (Detached Duplex, Semi-Detached Duplex, Bungalow, Apartment / Flat, Terrace, Commercial Land, Farmland, Commercial Building)
  - Price Sorting (Low to High, High to Low, Featured First)
- **Property Details Modal (`PropertyDetailsModal.jsx`):**
  - High-res image display with fallback SVG architectural elevation
  - Detailed amenities checklist (en-suite bedrooms, water treatment, solar prep, etc.)
  - Title documentation status (Certificate of Occupancy, Governor's Consent, Registered Survey)
  - One-click share button and direct "Book Inspection Now" button

### 4. Property Enquiry & Direct WhatsApp Flow (`src/components/EnquiryForm.jsx`)
- **Smooth Auto-Scroll:** Clicking *"Order / Enquire"* on any property card immediately scrolls down to the enquiry form on the same page and pre-populates that property's title, price, and ID into the form banner.
- **Visual Highlight:** The enquiry container flashes an emerald pulse glow to confirm selection.
- **Collected Information:**
  - Full Name (required)
  - Phone Number (required)
  - Email Address (optional)
  - Purpose of Enquiry (Purchase, Lease, Inspection Booking, Title Verification)
  - **Message & Customer Account Details:** Dedicated field requesting customer account details / bank name for payment next steps, reservation deposits, and preferred inspection dates.
- **Direct WhatsApp Dispatch:**
  - Composes a structured, professionally formatted WhatsApp message:
    ```text
    *🏛️ NEW ENQUIRY - HORLET PROPERTIES (ABEOKUTA)*
    ------------------------------------------
    *Property:* Luxury 5-Bedroom Fully Detached Duplex with BQ
    *Price:* ₦85,000,000
    *Location:* Ibara GRA, Abeokuta, Ogun State
    *Reference ID:* HP-001
    *Date:* 27 Sep 2026
    ------------------------------------------
    *CLIENT INFORMATION:*
    • *Full Name:* Chief Babatunde Adeleke
    • *Phone:* 0803 123 4567
    • *Email:* babatunde@example.com
    • *Purpose:* Property Purchase (Outright Buy)
    ------------------------------------------
    *ACCOUNT DETAILS / PAYMENT & NEXT STEPS:*
    GTBank / Babatunde Adeleke - Ready for site inspection this Saturday and initial deposit.
    ------------------------------------------
    *Agency Office:* Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101
    *Sent via:* Horlet Properties Official Web Portal
    ```
  - Directly launches WhatsApp with the agency's phone number: `https://wa.me/2347030918464?text=...`
  - Displays a confirmation modal with message preview, copy button, and direct dial fallback.

### 5. Agency Heritage & About (`src/components/AboutSection.jsx`)
- Deep background on Horlet Properties' strategic position at **Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101**.
- Detailed explanations of surveyor-backed title verification, elimination of Omo-Onile (customary land grabber) risks, fast-tracked Ogun State Ministry of Lands processes, and diaspora concierge services.

### 6. Office Location & Abeokuta Index (`src/components/ContactSection.jsx`)
- Full physical address, clickable phone link, direct WhatsApp link, and working hours.
- **Stylized Abeokuta Landmark Locator Guide:** Demonstrating travel times from Surveyors House on Ijeja Road to:
  - Ibara GRA Residential District: 3.5 km (8 mins)
  - Historic Olumo Rock Tourist Center: 4.2 km (11 mins)
  - Ogun State Secretariat, Oke-Mosan: 5.8 km (14 mins)
  - Lalubu Street Commercial Corridor: 2.9 km (7 mins)
  - Wole Soyinka Train Station (Lagos-Ibadan Rail): 11.4 km (22 mins)

---

## 🛠️ Property Management in Admin Dashboard (`src/components/AdminPanel.jsx`)
1. **Add New Property:**
   - Title, Price in ₦, Status (*For Sale / For Rent / Sold*), Type, Location, Beds, Baths, Land Area, Title Document, Description, and Features.
   * **Image Handling:** Supports direct computer file upload (converted via client-side `FileReader` to base64 Data URL so it persists locally), curated architectural photo presets, or custom URLs.
2. **Edit Existing Property:**
   * Modifies any property's pricing, title, status, description, or photos with instant live update.
3. **Remove Property:**
   * Two-step confirmation to safely delete any property from the catalog.
4. **Immediate Public Reflection:**
   * Updates are immediately written to React state and persisted to `localStorage`. When switching to the public site, changes reflect instantaneously without page reload.
5. **Change Credentials & Random Username inside Dashboard:**
   * Full credentials management tab with random username and password generators, plus reset to defaults.

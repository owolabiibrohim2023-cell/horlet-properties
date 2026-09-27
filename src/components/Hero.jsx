import React, { useState } from "react";
import {
  Search,
  ShieldCheck,
  Building,
  Award,
  Users,
  MapPin,
  ArrowRight,
  CheckCircle2,
  CalendarCheck
} from "lucide-react";

export default function Hero({ onApplyFilter }) {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("All");
  const [propertyType, setPropertyType] = useState("All");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onApplyFilter) {
      onApplyFilter({ keyword, status, propertyType });
    }
    const element = document.getElementById("properties");
    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById("enquire");
    if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
  };

  const scrollToProperties = () => {
    const el = document.getElementById("properties");
    if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-pattern"></div>
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        <div className="container hero-content">
          <div className="hero-badge">
            <ShieldCheck size={16} color="#d4af37" />
            <span>Surveyors House, 97b Ijeja Road • Abeokuta, Ogun State</span>
          </div>

          <h1 className="hero-title">
            Find Your Dream Property in <span className="highlight-gold">Abeokuta</span> &amp; Across Ogun State
          </h1>

          <p className="hero-subtitle">
            Horlet Properties is your premier real estate consultancy. We provide vetted residential homes, commercial hubs, and verified title lands with guaranteed surveyor-backed documentation and zero land-grabber risks.
          </p>

          <div className="hero-cta-group">
            <button onClick={scrollToProperties} className="btn-gold" style={{ padding: "0.85rem 1.75rem", fontSize: "1rem" }}>
              <span>Explore Available Properties</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={scrollToEnquiry} className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", padding: "0.85rem 1.75rem", fontSize: "1rem" }}>
              <CalendarCheck size={18} />
              <span>Book Property Inspection</span>
            </button>
          </div>

          {/* Quick Filter Box */}
          <div className="hero-quick-search-box">
            <div className="quick-search-tabs">
              <button
                type="button"
                className={`quick-tab-btn ${status === "All" ? "active" : ""}`}
                onClick={() => setStatus("All")}
              >
                All Status
              </button>
              <button
                type="button"
                className={`quick-tab-btn ${status === "For Sale" ? "active" : ""}`}
                onClick={() => setStatus("For Sale")}
              >
                For Sale
              </button>
              <button
                type="button"
                className={`quick-tab-btn ${status === "For Rent" ? "active" : ""}`}
                onClick={() => setStatus("For Rent")}
              >
                For Rent
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="quick-search-grid">
              <div className="quick-input-group">
                <label>Location / Keyword</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="e.g. Ibara GRA, Oke-Mosan, Ijeja..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </div>

              <div className="quick-input-group">
                <label>Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Detached Duplex">Detached Duplex</option>
                  <option value="Semi-Detached Duplex">Semi-Detached Duplex</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Apartment / Flat">Apartment / Flat</option>
                  <option value="Terrace Apartment">Terrace Apartment</option>
                  <option value="Commercial Land">Commercial Land</option>
                  <option value="Agricultural Land">Agricultural Farmland</option>
                  <option value="Commercial Building">Commercial Building</option>
                </select>
              </div>

              <div className="quick-input-group">
                <label>Transaction Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="All">All Properties</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Sold">Sold Records</option>
                </select>
              </div>

              <button type="submit" className="btn-search-submit">
                <Search size={18} />
                <span>Search Listings</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Hero Stats Strip */}
      <div className="hero-stats-strip">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-icon">
              <Building size={24} />
            </div>
            <div>
              <div className="stat-number">150+</div>
              <div className="stat-label">Verified Listings Brokered</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <Award size={24} />
            </div>
            <div>
              <div className="stat-number">12+ Yrs</div>
              <div className="stat-label">Abeokuta Real Estate Expertise</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Surveyor Title Verification</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div>
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfied Buyer &amp; Tenant Rate</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

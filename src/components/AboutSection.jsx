import React from "react";
import {
  Compass,
  FileCheck2,
  Users2,
  ShieldAlert,
  Building,
  CheckCircle,
  MapPin,
  Sparkles
} from "lucide-react";
import { AGENCY_ADDRESS, AGENCY_PHONE_DISPLAY } from "../utils/formatters";

export default function AboutSection() {
  return (
    <section id="about" className="section section-white">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Visual Card */}
          <div>
            <div className="about-card-banner">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80"
                alt="Horlet Properties Real Estate Headquarters in Abeokuta"
                style={{ width: "100%", height: "420px", objectFit: "cover", opacity: 0.85 }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="about-card-badge">
                <div className="badge-headline">
                  🏛️ Surveyors House, 97b Ijeja Road
                </div>
                <div className="badge-sub">
                  Strategically situated in Igbore, Abeokuta 110101 — providing direct institutional surveying precision to property buyers and investors across Ogun State.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div>
            <span className="section-tag">
              <Compass size={14} />
              <span>About Horlet Properties</span>
            </span>

            <h2 className="section-title">
              Your Dependable Real Estate Navigators in Ogun State
            </h2>

            <p style={{ color: "var(--slate-600)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Founded with the resolute mission to eliminate land ownership fraud and bureaucratic delays, <strong>Horlet Properties</strong> is a premier property consultancy based at the historic Surveyors House in Abeokuta.
            </p>

            <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "1.75rem" }}>
              Whether you are acquiring a luxury residential duplex in Ibara GRA, investing in expansive agro-industrial parcels in Rounder, or seeking commercial office space along Lalubu street, we conduct exhaustive title searches, physical beacon verifications, and Governor's Consent verifications before any financial commitment is made.
            </p>

            {/* Core Pillars */}
            <div className="about-values-grid">
              <div className="value-card">
                <div className="value-icon-box">
                  <Compass size={20} />
                </div>
                <h4 className="value-title">Surveyor-Backed Titles</h4>
                <p className="value-desc">
                  Rooted at Surveyors House, Ijeja Road. Every boundary, coordinates, and survey plan is vetted by licensed professionals.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon-box">
                  <FileCheck2 size={20} />
                </div>
                <h4 className="value-title">100% C of O &amp; Consent</h4>
                <p className="value-desc">
                  Direct liaison with Ogun State Ministry of Lands for rapid title searches and authentic documentation transfers.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon-box">
                  <ShieldAlert size={20} />
                </div>
                <h4 className="value-title">Zero Land Grabber Risk</h4>
                <p className="value-desc">
                  We guarantee zero customary dispute (Omo-Onile interference), ensuring peaceful possession of your property.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon-box">
                  <Users2 size={20} />
                </div>
                <h4 className="value-title">Diaspora Concierge</h4>
                <p className="value-desc">
                  Transparent video inspections, digital legal agreements, and progress milestones for buyers abroad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

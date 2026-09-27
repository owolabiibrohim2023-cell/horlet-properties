import React from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Compass,
  Building2,
  Navigation
} from "lucide-react";
import {
  AGENCY_ADDRESS,
  AGENCY_PHONE_DISPLAY,
  AGENCY_WHATSAPP_NUMBER
} from "../utils/formatters";

export default function ContactSection() {
  return (
    <section id="contact" className="section section-white">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Compass size={14} />
            <span>Visit Or Contact Us</span>
          </span>
          <h2 className="section-title">
            Get in Touch with Horlet Properties
          </h2>
          <p className="section-subtitle">
            We welcome you to our agency headquarters at Surveyors House in Abeokuta, or contact our team directly by phone and WhatsApp for immediate support.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--primary-50)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary-800)" }}>
                <Building2 size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.35rem", color: "var(--primary-darkest)" }}>
                  Corporate Headquarters
                </h3>
                <span style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>
                  Abeokuta, Ogun State, Nigeria
                </span>
              </div>
            </div>

            <div className="contact-info-list">
              {/* Physical Address */}
              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-label">Physical Office Address</div>
                  <div className="contact-value">
                    {AGENCY_ADDRESS}
                  </div>
                  <div className="contact-subvalue">
                    Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101
                  </div>
                </div>
              </div>

              {/* Telephone */}
              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-label">Official Telephone Number</div>
                  <div className="contact-value">
                    <a
                      href={`tel:${AGENCY_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                      style={{ color: "var(--primary-700)" }}
                    >
                      {AGENCY_PHONE_DISPLAY}
                    </a>
                  </div>
                  <div className="contact-subvalue">
                    Direct line to administrative officers and site inspectors
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-item">
                <div className="contact-icon-box" style={{ background: "#ecfdf5", color: "#10b981", borderColor: "#a7f3d0" }}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="contact-label">Direct WhatsApp Business</div>
                  <div className="contact-value">
                    <a
                      href={`https://wa.me/${AGENCY_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#059669" }}
                    >
                      +234 703 091 8464 (WhatsApp Chat)
                    </a>
                  </div>
                  <div className="contact-subvalue">
                    Instant property enquiries, photos, coordinates &amp; video walkthroughs
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="contact-item">
                <div className="contact-icon-box">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="contact-label">Operating Hours</div>
                  <div className="contact-value" style={{ fontSize: "0.95rem" }}>
                    Monday – Friday: 8:00 AM – 6:00 PM
                  </div>
                  <div className="contact-subvalue">
                    Saturday: 9:00 AM – 4:00 PM • Sunday: By Inspection Appointment
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Quick Action CTAs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "2rem" }}>
              <a
                href={`tel:${AGENCY_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="btn-primary"
                style={{ justifyContent: "center" }}
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${AGENCY_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ justifyContent: "center" }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Abeokuta Landmark Locator Guide */}
          <div className="landmark-card">
            <div className="landmark-header">
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-primary)", fontWeight: 700 }}>
                Strategic Abeokuta Hub
              </span>
              <h3>Surveyors House Location Index</h3>
              <p>
                Our office at 97b Ijeja Road provides quick, central access to Abeokuta's premier commercial and administrative epicenters:
              </p>
            </div>

            <div className="landmark-list">
              <div className="landmark-row">
                <span className="landmark-name">
                  <Navigation size={16} color="#d4af37" />
                  <span>Ibara GRA Residential District</span>
                </span>
                <span className="landmark-distance">3.5 km (8 mins)</span>
              </div>

              <div className="landmark-row">
                <span className="landmark-name">
                  <Navigation size={16} color="#d4af37" />
                  <span>Historic Olumo Rock Tourist Center</span>
                </span>
                <span className="landmark-distance">4.2 km (11 mins)</span>
              </div>

              <div className="landmark-row">
                <span className="landmark-name">
                  <Navigation size={16} color="#d4af37" />
                  <span>Ogun State Secretariat, Oke-Mosan</span>
                </span>
                <span className="landmark-distance">5.8 km (14 mins)</span>
              </div>

              <div className="landmark-row">
                <span className="landmark-name">
                  <Navigation size={16} color="#d4af37" />
                  <span>Lalubu Street Banking Corridor</span>
                </span>
                <span className="landmark-distance">2.9 km (7 mins)</span>
              </div>

              <div className="landmark-row">
                <span className="landmark-name">
                  <Navigation size={16} color="#d4af37" />
                  <span>Wole Soyinka Train Station (Lagos-Ibadan Rail)</span>
                </span>
                <span className="landmark-distance">11.4 km (22 mins)</span>
              </div>
            </div>

            <div className="landmark-office-box">
              <div className="office-pin-icon">
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
                  Visit Surveyors House in Person
                </div>
                <div style={{ fontSize: "0.825rem", color: "rgba(255,255,255,0.8)" }}>
                  97b Ijeja Road, Igbore, Abeokuta. Ample client parking and private conference rooms for title verification.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

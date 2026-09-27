import React from "react";
import { Building2, Phone, MessageCircle, MapPin, Lock, ShieldCheck } from "lucide-react";
import {
  AGENCY_NAME,
  AGENCY_ADDRESS,
  AGENCY_PHONE_DISPLAY,
  AGENCY_WHATSAPP_NUMBER
} from "../utils/formatters";

export default function Footer({ onOpenAdminLogin, isAdminLoggedIn, onOpenAdminPanel }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div className="brand-icon-box" style={{ width: "38px", height: "38px" }}>
                <Building2 size={20} />
              </div>
              <div className="brand-name" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
                HORLET <span style={{ color: "var(--gold-primary)" }}>PROPERTIES</span>
              </div>
            </div>

            <p>
              Abeokuta's premier property brokerage and surveying-backed real estate consultancy. Delivering genuine, dispute-free residential, commercial, and agricultural properties throughout Ogun State.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.825rem", color: "var(--gold-primary)" }}>
              <ShieldCheck size={16} />
              <span>Registered Office: Surveyors House, Abeokuta</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#properties" className="footer-link" onClick={(e) => { e.preventDefault(); scrollTo("properties"); }}>
                  Available Properties
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>
                  About Agency
                </a>
              </li>
              <li>
                <a href="#enquire" className="footer-link" onClick={(e) => { e.preventDefault(); scrollTo("enquire"); }}>
                  Order / Enquire
                </a>
              </li>
              <li>
                <a href="#testimonials" className="footer-link" onClick={(e) => { e.preventDefault(); scrollTo("testimonials"); }}>
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
                  Office Location
                </a>
              </li>
            </ul>
          </div>

          {/* Locations Covered */}
          <div className="footer-col">
            <h4>Prime Locations</h4>
            <ul className="footer-links">
              <li className="footer-link">Ibara GRA</li>
              <li className="footer-link">Oke-Mosan (Secretariat)</li>
              <li className="footer-link">Ijeja / Igbore Road</li>
              <li className="footer-link">Kobape Expressway</li>
              <li className="footer-link">Asero &amp; Obantoko</li>
              <li className="footer-link">Oke-Ilewo / Lalubu</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="footer-col">
            <h4>Direct Contact</h4>
            <ul className="footer-links" style={{ gap: "0.85rem" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <MapPin size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
                <span>Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <a href={`tel:${AGENCY_PHONE_DISPLAY.replace(/\s+/g, '')}`} style={{ color: "#ffffff", fontWeight: 600 }}>
                  {AGENCY_PHONE_DISPLAY}
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MessageCircle size={16} color="#10b981" style={{ flexShrink: 0 }} />
                <a
                  href={`https://wa.me/${AGENCY_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#34d399", fontWeight: 600 }}
                >
                  WhatsApp: 0703 091 8464
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Discreet Admin Access */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {AGENCY_NAME}. All rights reserved. Abeokuta, Ogun State, Nigeria.
          </div>

          <div>
            {isAdminLoggedIn ? (
              <button
                type="button"
                onClick={onOpenAdminPanel}
                className="admin-discreet-link"
                style={{ color: "#10b981", background: "rgba(16, 185, 129, 0.15)" }}
              >
                <Lock size={12} />
                <span>Admin Panel (Logged In)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="admin-discreet-link"
                title="Agency Management Portal"
              >
                <Lock size={12} />
                <span>Authorized Staff Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

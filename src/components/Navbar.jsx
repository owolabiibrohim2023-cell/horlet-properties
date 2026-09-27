import React, { useState } from "react";
import {
  Building2,
  Phone,
  MessageCircle,
  Menu,
  X,
  Lock,
  MapPin,
  Clock,
  ShieldCheck
} from "lucide-react";
import { AGENCY_PHONE_DISPLAY, AGENCY_WHATSAPP_NUMBER } from "../utils/formatters";

export default function Navbar({ onOpenAdminLogin, isAdminLoggedIn, onOpenAdminPanel }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* Top info strip */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <MapPin size={13} color="#d4af37" />
              <span>Surveyors House, 97b Ijeja Road, Abeokuta</span>
            </span>
            <span className="top-bar-item" style={{ display: "none", md: "inline-flex" }}>
              <Clock size={13} color="#d4af37" />
              <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
            </span>
          </div>

          <div className="top-bar-right">
            <span className="top-bar-item">
              <ShieldCheck size={13} color="#10b981" />
              <span>Surveyor-Verified Titles in Ogun State</span>
            </span>
            <a
              href={`https://wa.me/${AGENCY_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-item"
              style={{ color: "#34d399", fontWeight: 600 }}
            >
              <MessageCircle size={13} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container navbar">
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "auto" }); }}>
          <div className="brand-icon-box">
            <Building2 size={24} />
          </div>
          <div className="brand-text-block">
            <div className="brand-name">
              HORLET <span>PROPERTIES</span>
            </div>
            <div className="brand-tagline">
              Abeokuta, Ogun State • Real Estate
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#properties" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("properties"); }}>
                Properties
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>
                About Agency
              </a>
            </li>
            <li>
              <a href="#enquire" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("enquire"); }}>
                Enquire
              </a>
            </li>
            <li>
              <a href="#testimonials" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("testimonials"); }}>
                Reviews
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Nav Actions */}
        <div className="nav-actions">
          <a href={`tel:${AGENCY_PHONE_DISPLAY.replace(/\s+/g, '')}`} className="nav-phone-btn" title="Call Horlet Properties">
            <Phone size={15} />
            <span>{AGENCY_PHONE_DISPLAY}</span>
          </a>

          {isAdminLoggedIn ? (
            <button
              onClick={onOpenAdminPanel}
              className="btn-primary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
            >
              <Lock size={14} />
              <span>Admin Dashboard</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="btn-admin-nav"
              title="Staff Portal Login"
            >
              <Lock size={14} />
              <span>Staff Login</span>
            </button>
          )}

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div id="mobile-navigation" className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <a href="#properties" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("properties"); }}>
              Browse Properties
            </a>
          </li>
          <li>
            <a href="#about" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>
              About Horlet Properties
            </a>
          </li>
          <li>
            <a href="#enquire" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("enquire"); }}>
              Property Enquiry Form
            </a>
          </li>
          <li>
            <a href="#contact" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>
              Office Location & Contact
            </a>
          </li>
        </ul>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <a
            href={`tel:${AGENCY_PHONE_DISPLAY.replace(/\s+/g, '')}`}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <Phone size={16} />
            <span>Call {AGENCY_PHONE_DISPLAY}</span>
          </a>

          <a
            href={`https://wa.me/${AGENCY_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </a>

          {isAdminLoggedIn ? (
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdminPanel(); }}
              className="btn-outline"
              style={{ width: "100%" }}
            >
              <Lock size={15} />
              <span>Admin Panel</span>
            </button>
          ) : (
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdminLogin(); }}
              className="btn-admin-nav"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Lock size={15} />
              <span>Staff Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

import React, { useState } from "react";
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  FileCheck,
  Send,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Share2
} from "lucide-react";
import { formatNaira, AGENCY_PHONE_DISPLAY } from "../utils/formatters";

export default function PropertyDetailsModal({ property, onClose, onSelectForEnquiry }) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!property) return null;

  const displayImage = imageError
    ? property.fallbackSvg
    : property.image || property.fallbackSvg;

  const handleEnquire = () => {
    onClose();
    onSelectForEnquiry(property);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin} - Horlet Properties: ${property.title} (${formatNaira(property.priceFormatted || property.price)})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="card-id-pill">{property.id}</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: property.status === "For Sale" ? "#065f46" : property.status === "For Rent" ? "#b45309" : "#475569"
                }}
              >
                ● {property.status}
              </span>
            </div>
            <h2 className="modal-title" style={{ marginTop: "0.25rem" }}>
              {property.title}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: "1.5rem" }}>
          {/* Main Image Banner */}
          <div style={{ position: "relative", width: "100%", height: "340px", borderRadius: "12px", overflow: "hidden", marginBottom: "1.5rem", backgroundColor: "#0f172a" }}>
            <img
              src={displayImage}
              alt={property.title}
              onError={() => setImageError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                background: "rgba(12, 43, 32, 0.92)",
                backdropFilter: "blur(6px)",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "1px solid rgba(212, 175, 55, 0.4)",
              }}
            >
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#d4af37", fontWeight: 700 }}>
                Asking Price
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800 }}>
                {formatNaira(property.priceFormatted || property.price)}
              </div>
            </div>
          </div>

          {/* Location strip */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--slate-200)", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--slate-700)", fontWeight: 600 }}>
              <MapPin size={18} color="#0f5132" />
              <span>{property.location}</span>
            </div>

            <button
              onClick={handleShare}
              className="btn-outline"
              style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
            >
              <Share2 size={14} />
              <span>{copied ? "Link Copied!" : "Share Property"}</span>
            </button>
          </div>

          {/* Key Specs Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.85rem", marginBottom: "1.5rem" }}>
            {property.bedrooms !== null && property.bedrooms !== undefined && (
              <div style={{ background: "var(--slate-50)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--slate-200)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Bed size={14} /> Bedrooms
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--slate-800)", marginTop: "0.2rem" }}>
                  {property.bedrooms} Beds
                </div>
              </div>
            )}

            {property.bathrooms !== null && property.bathrooms !== undefined && (
              <div style={{ background: "var(--slate-50)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--slate-200)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Bath size={14} /> Bathrooms
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--slate-800)", marginTop: "0.2rem" }}>
                  {property.bathrooms} Baths
                </div>
              </div>
            )}

            {property.landSize && (
              <div style={{ background: "var(--slate-50)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--slate-200)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Maximize2 size={14} /> Land Size
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--slate-800)", marginTop: "0.2rem" }}>
                  {property.landSize}
                </div>
              </div>
            )}

            {property.propertyType && (
              <div style={{ background: "var(--slate-50)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--slate-200)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Building2 size={14} /> Category
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--slate-800)", marginTop: "0.2rem" }}>
                  {property.propertyType}
                </div>
              </div>
            )}
          </div>

          {/* Title documentation status */}
          {property.titleDoc && (
            <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "0.85rem 1.15rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <ShieldCheck size={24} color="#059669" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#065f46", textTransform: "uppercase" }}>
                  Verified Title Documentation
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#047857" }}>
                  {property.titleDoc}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>Property Overview</h4>
            <p style={{ color: "var(--slate-700)", lineHeight: 1.7, fontSize: "0.95rem" }}>
              {property.description}
            </p>
          </div>

          {/* Features Checklist */}
          {property.features && property.features.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ fontSize: "1.05rem", marginBottom: "0.75rem" }}>Amenities &amp; Features</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.6rem" }}>
                {property.features.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--slate-700)" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs Bottom */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", paddingTop: "1.25rem", borderTop: "1px solid var(--slate-200)" }}>
            <button
              onClick={handleEnquire}
              className="btn-gold"
              style={{ flex: 1, minWidth: "220px", padding: "0.85rem 1.5rem", fontSize: "1rem" }}
            >
              <Send size={18} />
              <span>Enquire / Book Inspection Now</span>
            </button>

            <a
              href={`tel:${AGENCY_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="btn-outline"
              style={{ padding: "0.85rem 1.25rem" }}
            >
              <Phone size={16} />
              <span>Call Agency</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { CheckCircle2, MessageCircle, Phone, Copy, Check, ExternalLink, X } from "lucide-react";
import { AGENCY_PHONE_DISPLAY, AGENCY_WHATSAPP_NUMBER } from "../utils/formatters";

export default function WhatsAppConfirmModal({ enquiryData, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!enquiryData) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(enquiryData.messageDetails || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
        <div className="modal-header" style={{ borderBottom: "none", paddingBottom: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#ecfdf5", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "var(--primary-darkest)" }}>
                Enquiry Composed &amp; Sent!
              </h3>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ paddingTop: "0.5rem" }}>
          <p style={{ color: "var(--slate-600)", fontSize: "0.925rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            Thank you, <strong>{enquiryData.fullName}</strong>. A pre-filled WhatsApp message has been generated for the Horlet Properties admin team at <strong>{AGENCY_PHONE_DISPLAY}</strong>.
          </p>

          <div style={{ background: "#f8fafc", border: "1px solid var(--slate-200)", borderRadius: "10px", padding: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--slate-500)" }}>
                Target Property
              </span>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary-700)" }}>
                {enquiryData.propertyPrice || "Contact for Price"}
              </span>
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--slate-800)" }}>
              {enquiryData.propertyTitle}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {/* Primary re-open button in case popup blocked */}
            <a
              href={enquiryData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem", background: "linear-gradient(135deg, #25d366, #128c7e)", color: "#ffffff" }}
            >
              <MessageCircle size={18} />
              <span>Continue to WhatsApp Web / App</span>
              <ExternalLink size={15} />
            </a>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <a
                href={`tel:${AGENCY_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="btn-outline"
                style={{ justifyContent: "center", fontSize: "0.85rem" }}
              >
                <Phone size={15} />
                <span>Direct Call</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="btn-outline"
                style={{ justifyContent: "center", fontSize: "0.85rem" }}
              >
                {copied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                <span>{copied ? "Copied!" : "Copy Details"}</span>
              </button>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.775rem", color: "var(--slate-500)" }}>
            Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101
          </div>
        </div>
      </div>
    </div>
  );
}

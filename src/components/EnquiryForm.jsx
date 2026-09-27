import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Phone,
  ShieldCheck,
  CheckCircle,
  Clock,
  MapPin,
  Building,
  CreditCard,
  XCircle,
  HelpCircle
} from "lucide-react";
import {
  AGENCY_PHONE_DISPLAY,
  AGENCY_WHATSAPP_NUMBER,
  formatNaira,
  buildWhatsAppEnquiryUrl
} from "../utils/formatters";

export default function EnquiryForm({
  selectedProperty,
  onClearSelectedProperty,
  isFormHighlighted,
  onEnquirySuccess
}) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [interestType, setInterestType] = useState("Property Purchase");
  const [messageAndAccountDetails, setMessageAndAccountDetails] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // When selected property changes, pre-populate a helpful default message template if empty
  useEffect(() => {
    if (selectedProperty) {
      if (!messageAndAccountDetails) {
        setMessageAndAccountDetails(
          `Hello Horlet Properties, I am interested in acquiring/inspecting "${selectedProperty.title}" (Ref: ${selectedProperty.id}, ${formatNaira(selectedProperty.priceFormatted || selectedProperty.price)}). ` +
          `My preferred inspection day is [Enter Date/Time]. For transaction next steps and payment reservation, my details are [Enter Bank & Account Name or Payment Notes].`
        );
      }
    }
  }, [selectedProperty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMsg("Please enter your contact phone number.");
      return;
    }
    if (!messageAndAccountDetails.trim()) {
      setErrorMsg("Please provide your message and account/payment details for next steps.");
      return;
    }

    // Build WhatsApp URL
    const whatsappUrl = buildWhatsAppEnquiryUrl({
      propertyTitle: selectedProperty?.title || "General Real Estate Consultation",
      propertyPrice: selectedProperty?.priceFormatted || selectedProperty?.price,
      propertyId: selectedProperty?.id || "HP-GEN",
      propertyLocation: selectedProperty?.location || "Abeokuta, Ogun State",
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      interestType,
      messageAndAccountDetails: messageAndAccountDetails.trim(),
    });

    // Try to open WhatsApp directly
    const openedWindow = window.open(whatsappUrl, "_blank");

    // Pass details to parent to show confirmation modal
    if (onEnquirySuccess) {
      onEnquirySuccess({
        whatsappUrl,
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        propertyTitle: selectedProperty?.title || "General Property Enquiry",
        propertyPrice: selectedProperty ? formatNaira(selectedProperty.priceFormatted || selectedProperty.price) : null,
        messageDetails: messageAndAccountDetails.trim(),
        windowOpened: !!openedWindow,
      });
    }

    // Reset inputs
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setMessageAndAccountDetails("");
  };

  return (
    <section id="enquire" className="enquiry-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <MessageSquare size={14} />
            <span>Direct WhatsApp Enquiry</span>
          </span>
          <h2 className="section-title">
            Order or Enquire About Any Property
          </h2>
          <p className="section-subtitle">
            Fill in your enquiry details below. Your submission composes a complete, structured WhatsApp message sent directly to the Horlet Properties administration team at <strong>{AGENCY_PHONE_DISPLAY}</strong>.
          </p>
        </div>

        <div className={`enquiry-card-container ${isFormHighlighted ? "highlight-target" : ""}`}>
          <div className="enquiry-grid">
            {/* Info Pane (Left) */}
            <div className="enquiry-info-pane">
              <div>
                <h3>Connect with Horlet Properties</h3>
                <p>
                  Our certified real estate surveyors in Abeokuta review all enquiries promptly. We arrange physical site inspections, provide verified survey coordinates, and assist with smooth payment processing.
                </p>

                <ul className="enquiry-features-list">
                  <li className="enquiry-feature-item">
                    <div className="enquiry-feature-icon">
                      <CheckCircle size={15} />
                    </div>
                    <div className="enquiry-feature-text">
                      <strong>Immediate WhatsApp Delivery</strong>
                      <span>Enquiry sends straight to the agency admin phone: 0703 091 8464.</span>
                    </div>
                  </li>

                  <li className="enquiry-feature-item">
                    <div className="enquiry-feature-icon">
                      <Clock size={15} />
                    </div>
                    <div className="enquiry-feature-text">
                      <strong>Fast Inspection Scheduling</strong>
                      <span>Schedule weekend or weekday physical tours at your convenience.</span>
                    </div>
                  </li>

                  <li className="enquiry-feature-item">
                    <div className="enquiry-feature-icon">
                      <ShieldCheck size={15} />
                    </div>
                    <div className="enquiry-feature-text">
                      <strong>Surveyor-Backed Verification</strong>
                      <span>All titles and boundaries are confirmed before transaction closure.</span>
                    </div>
                  </li>

                  <li className="enquiry-feature-item">
                    <div className="enquiry-feature-icon">
                      <MapPin size={15} />
                    </div>
                    <div className="enquiry-feature-text">
                      <strong>Headquarters in Abeokuta</strong>
                      <span>Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Direct Call / Contact Box */}
              <div className="enquiry-direct-box">
                <div className="direct-box-label">Prefer Direct Phone Call?</div>
                <a
                  href={`tel:${AGENCY_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                  className="direct-phone-num"
                  title="Call Horlet Properties"
                >
                  <Phone size={22} color="#d4af37" />
                  <span>{AGENCY_PHONE_DISPLAY}</span>
                </a>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginTop: "0.35rem" }}>
                  Available 8:00 AM - 6:00 PM (West Africa Time)
                </div>
              </div>
            </div>

            {/* Form Pane (Right) */}
            <div className="enquiry-form-pane">
              {/* Selected Property Banner if chosen */}
              {selectedProperty ? (
                <div className="selected-property-banner">
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary-700)", fontWeight: 700 }}>
                      Active Selected Property
                    </div>
                    <div className="banner-title-text">
                      {selectedProperty.title} ({selectedProperty.id})
                    </div>
                    <div className="banner-price-text">
                      Price: {formatNaira(selectedProperty.priceFormatted || selectedProperty.price)} • {selectedProperty.location}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClearSelectedProperty}
                    className="btn-clear-selection"
                    title="Clear selected property"
                  >
                    Clear / Change
                  </button>
                </div>
              ) : (
                <div style={{ background: "var(--slate-50)", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px dashed var(--slate-300)", marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--slate-600)" }}>
                  💡 <strong>Tip:</strong> Click <em>"Order / Enquire"</em> on any listing card above to automatically attach that specific property here, or fill this form for general inquiries.
                </div>
              )}

              {errorMsg && (
                <div style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "0.65rem 1rem", borderRadius: "6px", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Full Name <span className="form-label-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Babatunde Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Phone & Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">
                      <span>Phone Number <span className="form-label-required">*</span></span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Email Address</span>
                      <span className="form-label-subtext">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. client@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Purpose / Interest Type */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Purpose of Enquiry</span>
                  </label>
                  <select
                    value={interestType}
                    onChange={(e) => setInterestType(e.target.value)}
                    className="form-select"
                  >
                    <option value="Property Purchase (Outright)">Property Purchase (Outright Buy)</option>
                    <option value="Property Lease / Rental">Property Lease / Rental</option>
                    <option value="Site Inspection Booking">Site Inspection Booking</option>
                    <option value="Title Document & Survey Verification">Title Document &amp; Survey Verification</option>
                    <option value="Commercial Land Investment">Commercial Land Investment</option>
                    <option value="General Real Estate Advisory">General Real Estate Advisory</option>
                  </select>
                </div>

                {/* Message & Account Details Field */}
                <div className="form-group">
                  <label className="form-label">
                    <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <CreditCard size={15} color="#0f5132" />
                      <span>Message &amp; Account Details (for payment / next steps) <span className="form-label-required">*</span></span>
                    </span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter your message, proposed inspection timeline, and your account/bank details for payment reference or invoice generation (e.g. Bank Name / Account Name)..."
                    value={messageAndAccountDetails}
                    onChange={(e) => setMessageAndAccountDetails(e.target.value)}
                    className="form-textarea"
                  ></textarea>
                  <div className="form-helper-note">
                    ℹ️ Providing your bank/account name helps us match inspection reservation deposits or prepare the official purchase invoice.
                  </div>
                </div>

                {/* Submit button */}
                <button type="submit" className="form-submit-btn">
                  <Send size={18} />
                  <span>Send Enquiry via WhatsApp to 0703 091 8464</span>
                </button>

                <div className="form-security-footer">
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Opens WhatsApp directly with your structured message to Horlet Properties admin</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

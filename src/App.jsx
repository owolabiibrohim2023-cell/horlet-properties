import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PropertyList from "./components/PropertyList";
import PropertyDetailsModal from "./components/PropertyDetailsModal";
import EnquiryForm from "./components/EnquiryForm";
import AboutSection from "./components/AboutSection";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminPanel from "./components/AdminPanel";
import WhatsAppConfirmModal from "./components/WhatsAppConfirmModal";

import {
  getSavedProperties,
  saveProperties,
  resetPropertiesToDefault
} from "./data/initialProperties";
import {
  isSessionAuthenticated,
  clearAdminSession
} from "./auth/authConfig";

export default function App() {
  // Properties catalog
  const [properties, setProperties] = useState(getSavedProperties);

  // Authentication & Admin View State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(isSessionAuthenticated);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Enquiry flow state
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);
  const [whatsappSentData, setWhatsappSentData] = useState(null);

  // Details Modal state
  const [activeDetailsProperty, setActiveDetailsProperty] = useState(null);

  // Hero Quick Filter state passed to PropertyList
  const [heroFilter, setHeroFilter] = useState(null);

  // Toast feedback notifications
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3500);
  };

  // Sync properties to localStorage whenever updated
  useEffect(() => {
    saveProperties(properties);
  }, [properties]);

  // Handler: "Order / Enquire" clicked on any property listing
  const handleSelectPropertyForEnquiry = (property) => {
    setSelectedProperty(property);
    setIsFormHighlighted(true);

    const formElement = document.getElementById("enquire");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "auto", block: "start" });
    }

    // Flash highlight
    setTimeout(() => {
      setIsFormHighlighted(false);
    }, 2800);
  };

  // Handler: Add new property (Admin)
  const handleAddProperty = (newProp) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  // Handler: Update property (Admin)
  const handleUpdateProperty = (updatedProp) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProp.id ? updatedProp : p))
    );
    // If the currently selected enquiry property was edited, update it too
    if (selectedProperty && selectedProperty.id === updatedProp.id) {
      setSelectedProperty(updatedProp);
    }
  };

  // Handler: Delete property (Admin)
  const handleDeleteProperty = (propertyId) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    if (selectedProperty && selectedProperty.id === propertyId) {
      setSelectedProperty(null);
    }
  };

  // Handler: Reset default properties
  const handleResetDefaults = () => {
    const defaults = resetPropertiesToDefault();
    setProperties(defaults);
  };

  // Handler: Admin Login Success
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowLoginModal(false);
    setShowAdminPanel(true);
    showToast("Logged in to Horlet Properties Admin Panel");
  };

  // Handler: Admin Logout
  const handleLogout = () => {
    clearAdminSession();
    setIsAdminLoggedIn(false);
    setShowAdminPanel(false);
    showToast("Logged out of Admin Portal");
  };

  return (
    <div className="app-root">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast-message">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ADMIN PANEL VIEW (when admin opens the full management portal) */}
      {isAdminLoggedIn && showAdminPanel ? (
        <AdminPanel
          properties={properties}
          onAddProperty={handleAddProperty}
          onUpdateProperty={handleUpdateProperty}
          onDeleteProperty={handleDeleteProperty}
          onResetDefaults={handleResetDefaults}
          onLogout={handleLogout}
          onViewPublicSite={() => setShowAdminPanel(false)}
          showToast={showToast}
        />
      ) : (
        /* PUBLIC WEBSITE VIEW */
        <>
          {/* Admin Bar Notification if logged in while viewing public site */}
          {isAdminLoggedIn && (
            <div style={{ background: "linear-gradient(90deg, #071f16, #0f3d2e)", color: "#ffffff", padding: "0.45rem 1rem", fontSize: "0.825rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(212, 175, 55, 0.3)" }}>
              <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  🔒 <strong>Admin Mode Active:</strong> You are previewing the live site as an administrator.
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => setShowAdminPanel(true)}
                    style={{ color: "#d4af37", fontWeight: 700, textDecoration: "underline", fontSize: "0.825rem" }}
                  >
                    Open Management Dashboard →
                  </button>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <button
                    onClick={handleLogout}
                    style={{ color: "#f87171", fontSize: "0.825rem" }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Bar */}
          <Navbar
            onOpenAdminLogin={() => setShowLoginModal(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onOpenAdminPanel={() => setShowAdminPanel(true)}
          />

          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <Hero onApplyFilter={(filters) => setHeroFilter(filters)} />

            {/* Public Properties Catalog */}
            <PropertyList
              properties={properties}
              onSelectForEnquiry={handleSelectPropertyForEnquiry}
              onViewDetails={(prop) => setActiveDetailsProperty(prop)}
              filterState={heroFilter}
              onResetFilters={() => setHeroFilter(null)}
            />

            {/* About Horlet Properties */}
            <AboutSection />

            {/* Client Testimonials */}
            <Testimonials />

            {/* Property Enquiry Form Flow */}
            <EnquiryForm
              selectedProperty={selectedProperty}
              onClearSelectedProperty={() => setSelectedProperty(null)}
              isFormHighlighted={isFormHighlighted}
              onEnquirySuccess={(data) => setWhatsappSentData(data)}
            />

            {/* Agency Contact & Office Landmarks */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer
            onOpenAdminLogin={() => setShowLoginModal(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onOpenAdminPanel={() => setShowAdminPanel(true)}
          />
        </>
      )}

      {/* Property Details Modal */}
      {activeDetailsProperty && (
        <PropertyDetailsModal
          property={activeDetailsProperty}
          onClose={() => setActiveDetailsProperty(null)}
          onSelectForEnquiry={handleSelectPropertyForEnquiry}
        />
      )}

      {/* Admin Login Modal (Hidden credentials strictly in JS source) */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* WhatsApp Enquiry Confirmation Modal */}
      {whatsappSentData && (
        <WhatsAppConfirmModal
          enquiryData={whatsappSentData}
          onClose={() => setWhatsappSentData(null)}
        />
      )}
    </div>
  );
}

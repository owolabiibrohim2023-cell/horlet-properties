import React, { useState } from "react";
import {
  Building2,
  PlusCircle,
  ListFilter,
  KeyRound,
  LogOut,
  ExternalLink,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Save,
  X,
  Eye,
  ShieldCheck,
  Bed,
  Bath,
  Maximize2,
  Dices,
  RefreshCw,
  User
} from "lucide-react";
import { formatNaira } from "../utils/formatters";
import {
  updateSessionPassword,
  generateRandomUsername,
  generateRandomPassword,
  getActiveAdminUsername,
  isAllowAnyUsernameEnabled,
  setAllowAnyUsername,
  resetCredentialsToDefault,
  getCurrentLoggedUser
} from "../auth/authConfig";
import { PROPERTY_IMAGE_PRESETS, generatePropertySvg } from "../utils/imageFallbacks";

export default function AdminPanel({
  properties,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
  onResetDefaults,
  onLogout,
  onViewPublicSite,
  showToast
}) {
  const [activeTab, setActiveTab] = useState("listings"); // "listings" | "add" | "password"
  const [editingProperty, setEditingProperty] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // New property form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    status: "For Sale",
    propertyType: "Detached Duplex",
    location: "Ibara GRA, Abeokuta",
    bedrooms: "4",
    bathrooms: "4",
    landSize: "500 sqm",
    titleDoc: "Certificate of Occupancy (C of O)",
    description: "",
    featuresStr: "En-suite bedrooms, Paved compound, Constant water supply, Security post",
    imageMode: "preset", // "preset" | "upload" | "url"
    imageUrl: PROPERTY_IMAGE_PRESETS[0].url,
    imageUploadData: "",
    featured: false,
  });

  // Password & credentials change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customUsername, setCustomUsername] = useState(getActiveAdminUsername);
  const [allowAnyUser, setAllowAnyUserState] = useState(isAllowAnyUsernameEnabled);
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  // Counts
  const totalCount = properties.length;
  const saleCount = properties.filter((p) => p.status === "For Sale").length;
  const rentCount = properties.filter((p) => p.status === "For Rent").length;
  const soldCount = properties.filter((p) => p.status === "Sold").length;

  // Handle image upload via FileReader
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        imageUploadData: event.target.result,
        imageMode: "upload",
      }));
    };
    reader.readAsDataURL(file);
  };

  // Submit Add or Edit Property
  const handleSaveProperty = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please provide a property title.");
      return;
    }
    if (!formData.price) {
      alert("Please provide a property price.");
      return;
    }

    // Determine final image
    let finalImage = "";
    if (formData.imageMode === "upload" && formData.imageUploadData) {
      finalImage = formData.imageUploadData;
    } else if (formData.imageMode === "url" && formData.imageUrl) {
      finalImage = formData.imageUrl;
    } else if (formData.imageMode === "preset" && formData.imageUrl) {
      finalImage = formData.imageUrl;
    } else {
      finalImage = PROPERTY_IMAGE_PRESETS[0].url;
    }

    // Split features
    const featuresList = formData.featuresStr
      ? formData.featuresStr.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const numericPrice = parseFloat(String(formData.price).replace(/[^0-9.]/g, "")) || 0;

    const propertyPayload = {
      id: editingProperty ? editingProperty.id : `HP-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title.trim(),
      price: numericPrice,
      priceFormatted: formatNaira(numericPrice),
      status: formData.status,
      propertyType: formData.propertyType,
      location: formData.location.trim() || "Abeokuta, Ogun State",
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms, 10) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms, 10) : null,
      landSize: formData.landSize.trim(),
      titleDoc: formData.titleDoc.trim(),
      description: formData.description.trim() || "Genuine real estate property managed by Horlet Properties.",
      features: featuresList,
      image: finalImage,
      fallbackSvg: generatePropertySvg({
        title: formData.title.trim(),
        type: formData.propertyType,
        price: formatNaira(numericPrice),
      }),
      featured: formData.featured,
    };

    if (editingProperty) {
      onUpdateProperty(propertyPayload);
      setEditingProperty(null);
      showToast("Property updated successfully!");
    } else {
      onAddProperty(propertyPayload);
      showToast("New property listed successfully!");
    }

    // Reset Form
    resetForm();
    setActiveTab("listings");
  };

  const startEditProperty = (prop) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title || "",
      price: prop.price || "",
      status: prop.status || "For Sale",
      propertyType: prop.propertyType || "Detached Duplex",
      location: prop.location || "",
      bedrooms: prop.bedrooms !== null && prop.bedrooms !== undefined ? String(prop.bedrooms) : "",
      bathrooms: prop.bathrooms !== null && prop.bathrooms !== undefined ? String(prop.bathrooms) : "",
      landSize: prop.landSize || "",
      titleDoc: prop.titleDoc || "",
      description: prop.description || "",
      featuresStr: prop.features ? prop.features.join(", ") : "",
      imageMode: "url",
      imageUrl: prop.image || "",
      imageUploadData: prop.image?.startsWith("data:") ? prop.image : "",
      featured: !!prop.featured,
    });
    setActiveTab("add");
  };

  const resetForm = () => {
    setEditingProperty(null);
    setFormData({
      title: "",
      price: "",
      status: "For Sale",
      propertyType: "Detached Duplex",
      location: "Ibara GRA, Abeokuta",
      bedrooms: "4",
      bathrooms: "4",
      landSize: "500 sqm",
      titleDoc: "Certificate of Occupancy (C of O)",
      description: "",
      featuresStr: "En-suite bedrooms, Paved compound, Constant water supply, Security post",
      imageMode: "preset",
      imageUrl: PROPERTY_IMAGE_PRESETS[0].url,
      imageUploadData: "",
      featured: false,
    });
  };

  // Handle password and username credentials change
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordMsg({ type: "", text: "" });

    if (!newPassword || newPassword.length < 6) {
      setPasswordMsg({
        type: "error",
        text: "New password must be at least 6 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({
        type: "error",
        text: "New passwords do not match.",
      });
      return;
    }

    const res = updateSessionPassword(newPassword, customUsername.trim() || null);
    if (res.success) {
      setPasswordMsg({
        type: "success",
        text: res.message,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("Session credentials updated successfully!");
    } else {
      setPasswordMsg({
        type: "error",
        text: res.message,
      });
    }
  };

  const handleGenerateRandomUser = () => {
    const randomUser = generateRandomUsername();
    setCustomUsername(randomUser);
    showToast(`Generated random username: ${randomUser}`);
  };

  const handleGenerateRandomPwd = () => {
    const randomPwd = generateRandomPassword();
    setNewPassword(randomPwd);
    setConfirmPassword(randomPwd);
    showToast("Generated strong random password");
  };

  const handleToggleAllowAny = (e) => {
    const checked = e.target.checked;
    setAllowAnyUserState(checked);
    setAllowAnyUsername(checked);
    showToast(checked ? "Now accepting any random username on login" : "Enforcing exact username match");
  };

  const handleResetCredentials = () => {
    if (window.confirm("Reset login credentials back to hardcoded source code defaults?")) {
      resetCredentialsToDefault();
      setCustomUsername(getActiveAdminUsername());
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setAllowAnyUserState(isAllowAnyUsernameEnabled());
      setPasswordMsg({
        type: "success",
        text: "Credentials reset to hardcoded defaults.",
      });
      showToast("Credentials restored to original source constants.");
    }
  };

  // Preview Image URL
  const previewImg = formData.imageMode === "upload" && formData.imageUploadData
    ? formData.imageUploadData
    : formData.imageUrl || PROPERTY_IMAGE_PRESETS[0].url;

  return (
    <div className="admin-view-container">
      {/* Top Header */}
      <header className="admin-top-header">
        <div className="container admin-header-flex">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="brand-icon-box" style={{ width: "38px", height: "38px" }}>
              <Building2 size={20} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h1 style={{ fontSize: "1.15rem", color: "#ffffff", margin: 0 }}>
                  Horlet Properties Admin Panel
                </h1>
                <span className="admin-badge-role">
                  User: {getCurrentLoggedUser()}
                </span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)" }}>
                Surveyors House, 97b Ijeja Road, Abeokuta
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={onViewPublicSite}
              className="btn-outline"
              style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)", padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
            >
              <ExternalLink size={15} />
              <span>View Public Website</span>
            </button>

            <button
              onClick={onLogout}
              className="btn-admin-nav"
              style={{ background: "#ef4444", color: "#ffffff", border: "none", padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Tab Navigation */}
      <div className="admin-nav-tabs">
        <div className="container">
          <div className="admin-tab-list">
            <button
              className={`admin-tab-btn ${activeTab === "listings" ? "active" : ""}`}
              onClick={() => { setActiveTab("listings"); setEditingProperty(null); }}
            >
              <ListFilter size={17} />
              <span>Property Catalog ({totalCount})</span>
            </button>

            <button
              className={`admin-tab-btn ${activeTab === "add" ? "active" : ""}`}
              onClick={() => {
                if (!editingProperty) resetForm();
                setActiveTab("add");
              }}
            >
              <PlusCircle size={17} />
              <span>{editingProperty ? `Edit: ${editingProperty.id}` : "Add New Property"}</span>
            </button>

            <button
              className={`admin-tab-btn ${activeTab === "password" ? "active" : ""}`}
              onClick={() => setActiveTab("password")}
            >
              <KeyRound size={17} />
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "1.5rem" }}>
        {/* Metric Overview Strip */}
        <div className="admin-stats-overview">
          <div className="admin-stat-card">
            <div className="label">Total Portfolio</div>
            <div className="value">{totalCount}</div>
          </div>
          <div className="admin-stat-card">
            <div className="label" style={{ color: "#065f46" }}>For Sale</div>
            <div className="value" style={{ color: "#065f46" }}>{saleCount}</div>
          </div>
          <div className="admin-stat-card">
            <div className="label" style={{ color: "#b45309" }}>For Rent</div>
            <div className="value" style={{ color: "#b45309" }}>{rentCount}</div>
          </div>
          <div className="admin-stat-card">
            <div className="label" style={{ color: "#475569" }}>Sold Records</div>
            <div className="value" style={{ color: "#475569" }}>{soldCount}</div>
          </div>
        </div>

        {/* TAB 1: LISTINGS VIEW */}
        {activeTab === "listings" && (
          <div className="admin-content-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-darkest)" }}>
                  Manage Properties Catalog
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--slate-500)" }}>
                  All modifications made here immediately update the live public website.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => { resetForm(); setActiveTab("add"); }}
                  className="btn-primary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                >
                  <PlusCircle size={15} />
                  <span>Add Property</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Restore default showcase properties for Horlet Properties Abeokuta? Any custom additions will be reset.")) {
                      onResetDefaults();
                      showToast("Default properties catalog restored.");
                    }
                  }}
                  className="btn-outline"
                  style={{ padding: "0.5rem 0.85rem", fontSize: "0.85rem" }}
                  title="Restore default Abeokuta sample listings"
                >
                  <RotateCcw size={14} />
                  <span>Reset Default Showcase</span>
                </button>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Ref ID &amp; Title</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((prop) => (
                    <tr key={prop.id}>
                      <td>
                        <img
                          src={prop.image || prop.fallbackSvg}
                          alt={prop.title}
                          className="admin-thumb"
                          onError={(e) => { e.target.src = prop.fallbackSvg; }}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: "var(--slate-800)" }}>
                          {prop.title}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>
                          Ref: {prop.id} {prop.featured && <span style={{ color: "#d97706", fontWeight: 700 }}>• Featured</span>}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: "var(--primary-700)" }}>
                          {formatNaira(prop.priceFormatted || prop.price)}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            backgroundColor: prop.status === "For Sale" ? "#ecfdf5" : prop.status === "For Rent" ? "#fffbeb" : "#f1f5f9",
                            color: prop.status === "For Sale" ? "#065f46" : prop.status === "For Rent" ? "#92400e" : "#475569",
                          }}
                        >
                          {prop.status}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.825rem", color: "var(--slate-600)" }}>
                          {prop.propertyType}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.825rem", color: "var(--slate-600)" }}>
                          {prop.location}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="admin-action-btn-group" style={{ justifyContent: "flex-end" }}>
                          <button
                            onClick={() => startEditProperty(prop)}
                            className="btn-action-edit"
                            title="Edit Property"
                          >
                            <Edit3 size={13} />
                            <span>Edit</span>
                          </button>

                          {deleteConfirmId === prop.id ? (
                            <div style={{ display: "inline-flex", gap: "0.25rem" }}>
                              <button
                                onClick={() => {
                                  onDeleteProperty(prop.id);
                                  setDeleteConfirmId(null);
                                  showToast(`Property ${prop.id} removed.`);
                                }}
                                className="btn-action-delete"
                                style={{ background: "#dc2626", color: "#ffffff" }}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="btn-outline"
                                style={{ padding: "0.2rem 0.4rem", fontSize: "0.75rem" }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(prop.id)}
                              className="btn-action-delete"
                              title="Delete Property"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ADD OR EDIT PROPERTY */}
        {activeTab === "add" && (
          <div className="admin-content-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-darkest)" }}>
                  {editingProperty ? `Edit Property (${editingProperty.id})` : "Add New Property Listing"}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--slate-500)" }}>
                  Provide complete specifications. The property will immediately appear on the public properties page.
                </p>
              </div>

              {editingProperty && (
                <button
                  type="button"
                  onClick={() => { resetForm(); setActiveTab("listings"); }}
                  className="btn-outline"
                  style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
                >
                  <X size={14} />
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProperty}>
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "2rem" }}>
                {/* Form fields left */}
                <div>
                  {/* Title */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Property Title <span className="form-label-required">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern 5-Bedroom Detached Duplex with Swimming Pool"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Price and Status row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">
                        <span>Price (in Nigerian Naira ₦) <span className="form-label-required">*</span></span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 85000000 or 2500000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="form-input"
                      />
                      <div style={{ fontSize: "0.75rem", color: "var(--primary-700)", marginTop: "0.2rem", fontWeight: 600 }}>
                        Preview: {formatNaira(formData.price)}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span>Status <span className="form-label-required">*</span></span>
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="form-select"
                      >
                        <option value="For Sale">For Sale</option>
                        <option value="For Rent">For Rent</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>
                  </div>

                  {/* Property Type and Location */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">
                        <span>Property Type</span>
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="form-select"
                      >
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

                    <div className="form-group">
                      <label className="form-label">
                        <span>Location / Neighborhood</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ibara GRA, Abeokuta"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Specs: Beds, Baths, Land Size */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">
                        <span>Bedrooms</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="e.g. 5"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span>Bathrooms</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="e.g. 6"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span>Land / Built Area</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 650 sqm or 2 Plots"
                        value={formData.landSize}
                        onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Title Document */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Title Document</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Certificate of Occupancy (C of O), Governor's Consent, Registered Survey"
                      value={formData.titleDoc}
                      onChange={(e) => setFormData({ ...formData, titleDoc: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Description</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Detail features, neighborhood advantages, security, and finishing..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  {/* Features list */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Features / Amenities (comma separated)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="All En-suite, Borehole, Solar Ready, Gated Compound, Stamp Concrete"
                      value={formData.featuresStr}
                      onChange={(e) => setFormData({ ...formData, featuresStr: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Featured checkbox */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
                    <input
                      type="checkbox"
                      id="featuredProp"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    />
                    <label htmlFor="featuredProp" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--slate-800)", cursor: "pointer" }}>
                      Mark as Featured Property on Homepage
                    </label>
                  </div>
                </div>

                {/* Image handling right pane */}
                <div>
                  <div style={{ background: "var(--slate-50)", border: "1px solid var(--slate-200)", borderRadius: "12px", padding: "1.25rem" }}>
                    <h4 style={{ fontSize: "1rem", color: "var(--primary-darkest)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <ImageIcon size={18} color="var(--primary-700)" />
                      <span>Property Photo</span>
                    </h4>

                    {/* Image Mode tabs */}
                    <div className="image-picker-tabs">
                      <button
                        type="button"
                        className={`image-picker-tab ${formData.imageMode === "preset" ? "active" : ""}`}
                        onClick={() => setFormData({ ...formData, imageMode: "preset" })}
                      >
                        Curated Presets
                      </button>
                      <button
                        type="button"
                        className={`image-picker-tab ${formData.imageMode === "upload" ? "active" : ""}`}
                        onClick={() => setFormData({ ...formData, imageMode: "upload" })}
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        className={`image-picker-tab ${formData.imageMode === "url" ? "active" : ""}`}
                        onClick={() => setFormData({ ...formData, imageMode: "url" })}
                      >
                        Direct URL
                      </button>
                    </div>

                    {/* Mode 1: Presets Grid */}
                    {formData.imageMode === "preset" && (
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--slate-500)", marginBottom: "0.5rem" }}>
                          Select from professional architectural templates:
                        </div>
                        <div className="image-presets-grid">
                          {PROPERTY_IMAGE_PRESETS.map((preset) => (
                            <div
                              key={preset.id}
                              className={`preset-thumbnail-card ${formData.imageUrl === preset.url ? "selected" : ""}`}
                              onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                            >
                              <img src={preset.url} alt={preset.label} />
                              <div className="preset-label-overlay">{preset.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mode 2: File Upload */}
                    {formData.imageMode === "upload" && (
                      <div style={{ textAlign: "center", padding: "1.25rem 0.5rem", border: "2px dashed var(--slate-300)", borderRadius: "8px", background: "var(--white)" }}>
                        <Upload size={28} color="var(--primary-700)" style={{ margin: "0 auto 0.5rem" }} />
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--slate-700)", marginBottom: "0.35rem" }}>
                          Upload Property Photo from Computer
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--slate-500)", marginBottom: "0.75rem" }}>
                          Converted client-side to base64 and stored in local catalog
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          style={{ fontSize: "0.8rem" }}
                        />
                      </div>
                    )}

                    {/* Mode 3: Custom URL */}
                    {formData.imageMode === "url" && (
                      <div>
                        <label className="form-label" style={{ fontSize: "0.8rem" }}>
                          <span>Image Web URL</span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/property.jpg"
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          className="form-input"
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    )}

                    {/* Live Preview Box */}
                    <div style={{ marginTop: "1rem" }}>
                      <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--slate-500)", marginBottom: "0.35rem" }}>
                        Photo Preview
                      </div>
                      <div className="image-preview-box">
                        <img
                          src={previewImg}
                          alt="Preview"
                          onError={(e) => {
                            e.target.src = generatePropertySvg({
                              title: formData.title || "Property Preview",
                              type: formData.propertyType,
                              price: formatNaira(formData.price || 0),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem" }}
                    >
                      <Save size={18} />
                      <span>{editingProperty ? "Save Property Changes" : "Publish Property to Live Site"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: PASSWORD & CREDENTIALS SETTINGS */}
        {activeTab === "password" && (
          <div className="admin-content-card" style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", color: "var(--primary-darkest)" }}>
                Session Credentials &amp; Password Management
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--slate-500)" }}>
                Update administrator password or randomize credentials for this active browser session.
              </p>
            </div>

            {/* Prominent explanation of client-side limitation */}
            <div className="session-limitation-notice">
              <ShieldCheck size={26} color="#b45309" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
              <div>
                <strong>Client-Side Session Limitation Notice</strong>
                Because this website operates entirely on the front end without a Python or server-side database (per tech stack specifications), password and username changes apply exclusively to your active browser session. If you close your browser or log in from a separate device, the portal will revert to the hardcoded default credentials defined in the application source code.
              </div>
            </div>

            {passwordMsg.text && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: passwordMsg.type === "success" ? "#ecfdf5" : "#fef2f2",
                  color: passwordMsg.type === "success" ? "#065f46" : "#991b1b",
                  border: `1px solid ${passwordMsg.type === "success" ? "#a7f3d0" : "#fecaca"}`,
                }}
              >
                {passwordMsg.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword}>
              {/* Username Field with Random Generator */}
              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    <span>Active Administrator Username</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateRandomUser}
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--primary-700)",
                      background: "var(--primary-50)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "4px",
                      border: "1px solid var(--primary-200)",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem"
                    }}
                    title="Generate a random username"
                  >
                    <Dices size={13} />
                    <span>🎲 Generate Random Username</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter administrator username"
                  value={customUsername}
                  onChange={(e) => setCustomUsername(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* New Password with Strong Password Generator */}
              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    <span>New Password (min 6 characters) <span className="form-label-required">*</span></span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateRandomPwd}
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--gold-dark)",
                      background: "var(--gold-50)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "4px",
                      border: "1px solid #fde68a",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem"
                    }}
                    title="Generate a secure strong password"
                  >
                    <RefreshCw size={13} />
                    <span>🎲 Generate Strong Password</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Confirm New Password */}
              <div className="form-group">
                <label className="form-label">
                  <span>Confirm New Password <span className="form-label-required">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Allow Any Username Setting */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", padding: "0.75rem 1rem", background: "var(--slate-50)", borderRadius: "8px", border: "1px solid var(--slate-200)" }}>
                <input
                  type="checkbox"
                  id="allowAnyAdminCheck"
                  checked={allowAnyUser}
                  onChange={handleToggleAllowAny}
                  style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "var(--primary-700)" }}
                />
                <label htmlFor="allowAnyAdminCheck" style={{ fontSize: "0.85rem", color: "var(--slate-700)", cursor: "pointer", fontWeight: 600 }}>
                  Accept any random username on login (as long as password is valid)
                </label>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: "0.75rem 1.5rem" }}
                >
                  <KeyRound size={16} />
                  <span>Update Session Credentials</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCredentials}
                  className="btn-outline"
                  style={{ padding: "0.75rem 1.25rem" }}
                >
                  <RotateCcw size={15} />
                  <span>Reset to Source Defaults</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

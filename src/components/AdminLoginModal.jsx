import React, { useState } from "react";
import {
  Lock,
  X,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Dices,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import {
  validateCredentials,
  updateSessionPassword,
  generateRandomUsername,
  generateRandomPassword,
  isAllowAnyUsernameEnabled,
  setAllowAnyUsername
} from "../auth/authConfig";

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login"); // "login" | "change-password"

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [allowAnyUser, setAllowAnyUserState] = useState(isAllowAnyUsernameEnabled);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Change password form state (accessible directly on login modal)
  const [changeUser, setChangeUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeSuccessMessage, setChangeSuccessMessage] = useState("");
  const [changeErrorMessage, setChangeErrorMessage] = useState("");

  if (!isOpen) return null;

  // Generate random username into login field
  const handleGenerateRandomUserForLogin = () => {
    const randomUser = generateRandomUsername();
    setUsername(randomUser);
    setErrorMessage("");
  };

  // Generate random username into change-password field
  const handleGenerateRandomUserForChange = () => {
    const randomUser = generateRandomUsername();
    setChangeUser(randomUser);
    setChangeErrorMessage("");
  };

  // Generate random strong password
  const handleGenerateRandomPassword = () => {
    const randomPwd = generateRandomPassword();
    setNewPassword(randomPwd);
    setConfirmPassword(randomPwd);
    setChangeErrorMessage("");
  };

  // Toggle "allow any username" setting
  const handleToggleAllowAny = (e) => {
    const checked = e.target.checked;
    setAllowAnyUserState(checked);
    setAllowAnyUsername(checked);
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setChangeSuccessMessage("");
    setIsSubmitting(true);

    const isValid = validateCredentials(username, password);

    if (isValid) {
      setUsername("");
      setPassword("");
      setIsSubmitting(false);
      onLoginSuccess();
    } else {
      setIsSubmitting(false);
      setErrorMessage("Invalid credentials entered. Access denied. Check your password or use 'Change Password' tab.");
    }
  };

  // Handle Change Password Submit (directly from login modal)
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setChangeErrorMessage("");
    setChangeSuccessMessage("");

    if (!newPassword || newPassword.length < 6) {
      setChangeErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangeErrorMessage("New passwords do not match. Please verify.");
      return;
    }

    // Update session credentials
    const res = updateSessionPassword(newPassword, changeUser || null);

    if (res.success) {
      setChangeSuccessMessage("Password successfully updated for this browser session! You can now log in.");
      // Pre-fill login inputs with the newly configured credentials
      if (changeUser) {
        setUsername(changeUser);
      }
      setPassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setChangeUser("");

      // Switch back to login view after short delay so user can sign in
      setTimeout(() => {
        setActiveTab("login");
      }, 1400);
    } else {
      setChangeErrorMessage(res.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card admin-login-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: "none", paddingBottom: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--slate-500)", fontWeight: 700 }}>
              Horlet Staff Portal
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ paddingTop: "0.25rem" }}>
          {/* Top Banner Icon */}
          <div className="admin-login-banner" style={{ marginBottom: "1.25rem" }}>
            <div className="admin-lock-icon">
              <Lock size={24} />
            </div>
            <h3 style={{ fontSize: "1.3rem", color: "var(--primary-darkest)", marginBottom: "0.25rem" }}>
              Administrator Portal
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--slate-500)" }}>
              Horlet Properties Management Access
            </p>
          </div>

          {/* Navigation Tabs on Login Modal */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              backgroundColor: "var(--slate-100)",
              borderRadius: "8px",
              padding: "4px",
              marginBottom: "1.25rem",
              gap: "4px"
            }}
          >
            <button
              type="button"
              onClick={() => { setActiveTab("login"); setErrorMessage(""); }}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 700,
                backgroundColor: activeTab === "login" ? "var(--white)" : "transparent",
                color: activeTab === "login" ? "var(--primary-800)" : "var(--slate-600)",
                boxShadow: activeTab === "login" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.35rem",
                transition: "all 0.2s ease"
              }}
            >
              <Lock size={14} />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("change-password"); setChangeErrorMessage(""); setChangeSuccessMessage(""); }}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 700,
                backgroundColor: activeTab === "change-password" ? "var(--white)" : "transparent",
                color: activeTab === "change-password" ? "var(--primary-800)" : "var(--slate-600)",
                boxShadow: activeTab === "change-password" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.35rem",
                transition: "all 0.2s ease"
              }}
            >
              <KeyRound size={14} />
              <span>Change Password</span>
            </button>
          </div>

          {/* TAB 1: SIGN IN FORM */}
          {activeTab === "login" && (
            <div>
              {errorMessage && (
                <div className="login-error-alert">
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {changeSuccessMessage && (
                <div style={{ backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", padding: "0.65rem 0.85rem", borderRadius: "8px", fontSize: "0.825rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CheckCircle2 size={16} />
                  <span>{changeSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit}>
                {/* Username with Random Generator Button */}
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <label className="form-label" style={{ margin: 0 }}>
                      <span>Username</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomUserForLogin}
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
                      title="Generate and fill a random username"
                    >
                      <Dices size={13} />
                      <span>Use Random Username</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Password field with toggle view */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Password</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input"
                      style={{ paddingRight: "2.5rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "0.75rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--slate-400)",
                        padding: "0.2rem"
                      }}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Allow Any Username Checkbox */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", padding: "0.5rem 0.75rem", background: "var(--slate-50)", borderRadius: "6px", border: "1px solid var(--slate-200)" }}>
                  <input
                    type="checkbox"
                    id="allowAnyCheck"
                    checked={allowAnyUser}
                    onChange={handleToggleAllowAny}
                    style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "var(--primary-700)" }}
                  />
                  <label htmlFor="allowAnyCheck" style={{ fontSize: "0.8rem", color: "var(--slate-700)", cursor: "pointer", fontWeight: 500 }}>
                    Accept any random username with valid password
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem" }}
                >
                  <span>{isSubmitting ? "Verifying..." : "Sign In to Admin Panel"}</span>
                  <ArrowRight size={16} />
                </button>

                {/* Quick Link to Change Password */}
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                  <button
                    type="button"
                    onClick={() => { setActiveTab("change-password"); setChangeErrorMessage(""); setChangeSuccessMessage(""); }}
                    style={{ fontSize: "0.8rem", color: "var(--primary-700)", textDecoration: "underline", fontWeight: 600 }}
                  >
                    Forgot or need to change your password? Click here
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: CHANGE PASSWORD ON LOGIN MODAL */}
          {activeTab === "change-password" && (
            <div>
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: "0.65rem 0.85rem", borderRadius: "8px", fontSize: "0.775rem", color: "#92400e", marginBottom: "1rem", lineHeight: 1.4 }}>
                ℹ️ <strong>Session Password Reset:</strong> Updates your credentials for this browser session. You can immediately log in with your updated credentials.
              </div>

              {changeErrorMessage && (
                <div className="login-error-alert" style={{ marginBottom: "1rem" }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{changeErrorMessage}</span>
                </div>
              )}

              {changeSuccessMessage && (
                <div style={{ backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", padding: "0.65rem 0.85rem", borderRadius: "8px", fontSize: "0.825rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CheckCircle2 size={16} />
                  <span>{changeSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit}>
                {/* Optional Username Setting with Random Generator */}
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <label className="form-label" style={{ margin: 0 }}>
                      <span>New / Custom Username</span>
                      <span className="form-label-subtext" style={{ marginLeft: "0.25rem" }}>(Optional)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomUserForChange}
                      style={{
                        fontSize: "0.725rem",
                        color: "var(--primary-700)",
                        background: "var(--primary-50)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        border: "1px solid var(--primary-200)",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}
                      title="Generate a random username"
                    >
                      <Dices size={12} />
                      <span>🎲 Random Username</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter custom username or leave blank"
                    value={changeUser}
                    onChange={(e) => setChangeUser(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* New Password with Strong Password Generator */}
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <label className="form-label" style={{ margin: 0 }}>
                      <span>New Password (min 6 chars) <span className="form-label-required">*</span></span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomPassword}
                      style={{
                        fontSize: "0.725rem",
                        color: "var(--gold-dark)",
                        background: "var(--gold-50)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #fde68a",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}
                      title="Generate a secure random password"
                    >
                      <RefreshCw size={12} />
                      <span>🎲 Strong Password</span>
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
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: "center", padding: "0.75rem", fontSize: "0.9rem" }}
                  >
                    <KeyRound size={15} />
                    <span>Save &amp; Continue to Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="btn-outline"
                    style={{ padding: "0.75rem 1rem", fontSize: "0.85rem" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Subtle Security Footnote */}
          <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.725rem", color: "var(--slate-400)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
            <ShieldCheck size={13} />
            <span>Client-Side Session Security • Zero Server Database</span>
          </div>
        </div>
      </div>
    </div>
  );
}

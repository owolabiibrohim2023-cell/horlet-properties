// Hardcoded Administrator Credentials
// Kept strictly inside JavaScript source code and NEVER hardcoded in HTML/DOM placeholders
export const ADMIN_USERNAME = "horlet_admin";
export const ADMIN_PASSWORD = "HorletAbeokuta2024!";

const AUTH_STORAGE_KEY = "horlet_admin_authenticated";
const SESSION_PWD_KEY = "horlet_session_password_override";
const SESSION_USER_KEY = "horlet_session_username_override";
const ALLOW_ANY_USER_KEY = "horlet_allow_any_username";

/**
 * Generate a clean, random username with real-estate prefix and random alphanumeric string
 */
export function generateRandomUsername() {
  const prefixes = ["horlet", "admin", "realtor", "agent", "surveyor", "manager", "abeokuta"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomChars = Math.random().toString(36).substring(2, 6);
  const randomNum = Math.floor(10 + Math.random() * 90);
  return `${prefix}_${randomChars}${randomNum}`;
}

/**
 * Generate a strong randomized password
 */
export function generateRandomPassword() {
  const letters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbers = "23456789";
  const symbols = "!@#$%&*";
  
  let pwd = "";
  for (let i = 0; i < 6; i++) {
    pwd += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 3; i++) {
    pwd += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  for (let i = 0; i < 2; i++) {
    pwd += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return pwd;
}

/**
 * Checks if "Allow Any Random Username" mode is active.
 * Defaults to true so any random username entered or generated is permitted with valid password.
 */
export function isAllowAnyUsernameEnabled() {
  const stored = sessionStorage.getItem(ALLOW_ANY_USER_KEY);
  if (stored === null) return true; // Enabled by default
  return stored === "true";
}

/**
 * Set the "Allow Any Random Username" preference
 */
export function setAllowAnyUsername(enabled) {
  sessionStorage.setItem(ALLOW_ANY_USER_KEY, enabled ? "true" : "false");
}

/**
 * Returns the active username for this browser session
 */
export function getActiveAdminUsername() {
  const sessionUser = sessionStorage.getItem(SESSION_USER_KEY);
  return sessionUser || ADMIN_USERNAME;
}

/**
 * Returns the active password for this browser session
 * (either the hardcoded default or an in-session override)
 */
export function getActiveAdminPassword() {
  const sessionOverride = sessionStorage.getItem(SESSION_PWD_KEY);
  return sessionOverride || ADMIN_PASSWORD;
}

/**
 * Validates login credentials against JS constants and session overrides.
 * If "allow any username" is active, accepts any non-empty username as long as password is correct.
 */
export function validateCredentials(username, password) {
  const validPassword = getActiveAdminPassword();
  const validUser = getActiveAdminUsername();
  const allowAnyUser = isAllowAnyUsernameEnabled();

  // Password must match active password
  if (!password || password !== validPassword) {
    return false;
  }

  // If Allow Any Username is active, accept any non-empty username!
  if (allowAnyUser) {
    if (username && username.trim().length > 0) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      sessionStorage.setItem("horlet_current_logged_user", username.trim());
      return true;
    }
    return false;
  }

  // Otherwise, match exact active username
  if (username && username.trim() === validUser) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    sessionStorage.setItem("horlet_current_logged_user", username.trim());
    return true;
  }

  return false;
}

/**
 * Checks if the current browser session is already authenticated
 */
export function isSessionAuthenticated() {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
  } catch (e) {
    return false;
  }
}

/**
 * Gets the current logged in user display name
 */
export function getCurrentLoggedUser() {
  return sessionStorage.getItem("horlet_current_logged_user") || getActiveAdminUsername();
}

/**
 * Updates the admin password (and optional username) for the current browser session only
 */
export function updateSessionPassword(newPassword, newUsername = null) {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }
  sessionStorage.setItem(SESSION_PWD_KEY, newPassword);

  if (newUsername && newUsername.trim()) {
    sessionStorage.setItem(SESSION_USER_KEY, newUsername.trim());
  }

  return { success: true, message: "Password successfully updated for this browser session." };
}

/**
 * Updates the admin username for the session
 */
export function updateSessionUsername(newUsername) {
  if (!newUsername || newUsername.trim().length < 3) {
    return { success: false, message: "Username must be at least 3 characters long." };
  }
  sessionStorage.setItem(SESSION_USER_KEY, newUsername.trim());
  return { success: true, message: "Username updated for this browser session." };
}

/**
 * Resets all credentials back to original JS source constants
 */
export function resetCredentialsToDefault() {
  sessionStorage.removeItem(SESSION_PWD_KEY);
  sessionStorage.removeItem(SESSION_USER_KEY);
  sessionStorage.removeItem(ALLOW_ANY_USER_KEY);
  return { success: true, message: "Credentials reset to original source defaults." };
}

/**
 * Logs out the administrator and clears session tokens
 */
export function clearAdminSession() {
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem("horlet_current_logged_user");
  } catch (e) {
    // ignore
  }
}

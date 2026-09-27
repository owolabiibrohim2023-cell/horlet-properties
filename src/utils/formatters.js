// Utility formatters for Horlet Properties

export const AGENCY_PHONE_DISPLAY = "0703 091 8464";
export const AGENCY_PHONE_INTL = "+234 703 091 8464";
export const AGENCY_WHATSAPP_NUMBER = "2347030918464";
export const AGENCY_ADDRESS = "Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101, Ogun State";
export const AGENCY_NAME = "Horlet Properties";

/**
 * Format a number or string into Nigerian Naira (₦) representation
 */
export function formatNaira(value) {
  if (value === null || value === undefined || value === "") return "Contact for Price";
  
  // If string contains non-numeric characters besides commas/dots/periods
  if (typeof value === "string") {
    // Check if it already starts with currency symbol
    if (value.startsWith("₦") || value.toLowerCase().includes("contact") || value.toLowerCase().includes("call")) {
      return value;
    }
    // Clean string to number
    const numericOnly = value.replace(/[^0-9.]/g, "");
    if (!numericOnly) return value;
    const num = parseFloat(numericOnly);
    if (isNaN(num)) return value;
    return "₦" + num.toLocaleString("en-NG");
  }

  if (typeof value === "number") {
    return "₦" + value.toLocaleString("en-NG");
  }

  return "₦" + String(value);
}

/**
 * Generate formatted WhatsApp click-to-chat URL
 */
export function buildWhatsAppEnquiryUrl({
  propertyTitle,
  propertyPrice,
  propertyId,
  propertyLocation,
  fullName,
  phoneNumber,
  email,
  interestType = "Purchase / Lease Enquiry",
  messageAndAccountDetails,
}) {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const lines = [
    `*🏛️ NEW ENQUIRY - HORLET PROPERTIES (ABEOKUTA)*`,
    `------------------------------------------`,
    `*Property:* ${propertyTitle || "General Property Enquiry"}`,
    propertyPrice ? `*Price:* ${formatNaira(propertyPrice)}` : null,
    propertyLocation ? `*Location:* ${propertyLocation}` : null,
    propertyId ? `*Reference ID:* ${propertyId}` : null,
    `*Date:* ${currentDate}`,
    `------------------------------------------`,
    `*CLIENT INFORMATION:*`,
    `• *Full Name:* ${fullName}`,
    `• *Phone:* ${phoneNumber}`,
    email ? `• *Email:* ${email}` : null,
    interestType ? `• *Purpose:* ${interestType}` : null,
    `------------------------------------------`,
    `*ACCOUNT DETAILS / PAYMENT & NEXT STEPS:*`,
    `${messageAndAccountDetails}`,
    `------------------------------------------`,
    `*Agency Office:* Surveyors House, 97b Ijeja Road, Igbore, Abeokuta 110101`,
    `*Sent via:* Horlet Properties Official Web Portal`,
  ].filter(Boolean);

  const fullText = lines.join("\n");
  const encodedText = encodeURIComponent(fullText);
  return `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodedText}`;
}

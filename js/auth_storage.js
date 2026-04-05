const AUTH_SESSION_KEY = "cursorapp_auth_session";
const PENDING_PHONE_KEY = "cursorapp_pending_phone";
const PENDING_OTP_KEY = "cursorapp_pending_otp";

/**
 * @returns {{ phoneNumber: string, loggedInAt: string } | null}
 */
function readSession() {
  try {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (typeof parsed?.phoneNumber !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * @param {string} phoneNumber
 */
function saveSession(phoneNumber) {
  const payload = {
    phoneNumber: phoneNumber,
    loggedInAt: new Date().toISOString(),
  };
  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(payload));
}

function clearSession() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
}

/**
 * @param {string} phoneNumber
 * @param {string} otp
 */
function setPendingVerification(phoneNumber, otp) {
  sessionStorage.setItem(PENDING_PHONE_KEY, phoneNumber);
  sessionStorage.setItem(PENDING_OTP_KEY, otp);
}

function clearPendingVerification() {
  sessionStorage.removeItem(PENDING_PHONE_KEY);
  sessionStorage.removeItem(PENDING_OTP_KEY);
}

/**
 * @returns {{ phoneNumber: string, otp: string } | null}
 */
function readPendingVerification() {
  const phoneNumber = sessionStorage.getItem(PENDING_PHONE_KEY);
  const otp = sessionStorage.getItem(PENDING_OTP_KEY);
  if (!phoneNumber || !otp) {
    return null;
  }
  return { phoneNumber: phoneNumber, otp: otp };
}

/**
 * @param {string} input
 * @returns {string}
 */
function normalizePhoneNumber(input) {
  const digits = input.replace(/\D/g, "");
  return digits;
}

/**
 * @param {string} digits
 * @returns {boolean}
 */
function isValidPhoneDigits(digits) {
  return digits.length >= 10 && digits.length <= 15;
}

/**
 * @returns {string}
 */
function generateOtp() {
  const code = Math.floor(100000 + Math.random() * 900000);
  return String(code);
}

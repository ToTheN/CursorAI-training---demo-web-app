(function () {
  if (readSession()) {
    window.location.href = "home.html";
    return;
  }
  const form = document.getElementById("login-form");
  const phoneInput = document.getElementById("phone");
  const errorEl = document.getElementById("login-error");
  const submitBtn = document.getElementById("login-submit");

  if (!form || !phoneInput || !errorEl || !submitBtn) {
    return;
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.add("is-visible");
  }

  function hideError() {
    errorEl.textContent = "";
    errorEl.classList.remove("is-visible");
  }

  /**
   * Normalizes pasted or typed input to at most 10 national (mobile) digits.
   * Handles full international form (e.g. +91 9876543210 → 9876543210), not only bare national input.
   * @param {string} raw
   * @returns {string}
   */
  function sanitizeNationalDigits(raw) {
    let d = raw.replace(/\D/g, "");
    while (d.length > 10 && d.startsWith("0")) {
      d = d.slice(1);
    }
    while (d.length > 10 && d.startsWith("91")) {
      d = d.slice(2);
    }
    return d.slice(0, 10);
  }

  phoneInput.addEventListener("input", function () {
    const next = sanitizeNationalDigits(phoneInput.value);
    if (phoneInput.value !== next) {
      phoneInput.value = next;
    }
    hideError();
  });

  phoneInput.addEventListener("paste", function (event) {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData("text");
    phoneInput.value = sanitizeNationalDigits(text);
    hideError();
  });

  /**
   * @param {string} nationalDigits
   * @returns {boolean}
   */
  function isValidIndianMobileNational(nationalDigits) {
    return nationalDigits.length === 10 && /^[6-9]\d{9}$/.test(nationalDigits);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideError();
    const national = sanitizeNationalDigits(phoneInput.value);
    if (!isValidIndianMobileNational(national)) {
      showError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    const digits = "91" + national;
    submitBtn.disabled = true;
    const otp = generateOtp();
    setPendingVerification(digits, otp);
    window.location.href = "verify.html";
  });
})();

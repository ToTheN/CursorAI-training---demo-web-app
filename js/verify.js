(function () {
  const pending = readPendingVerification();
  if (!pending) {
    window.location.href = "index.html";
    return;
  }

  const phoneDisplay = document.getElementById("phone-display");
  const form = document.getElementById("verify-form");
  const inputs = Array.from(document.querySelectorAll(".otp-digit"));
  const errorEl = document.getElementById("verify-error");
  const submitBtn = document.getElementById("verify-submit");
  const demoBanner = document.getElementById("demo-otp");

  if (phoneDisplay) {
    phoneDisplay.textContent = formatPhoneForDisplay(pending.phoneNumber);
  }

  if (demoBanner) {
    demoBanner.innerHTML =
      "Demo mode: your code is <strong>" + pending.otp + "</strong> (no SMS is sent).";
    demoBanner.classList.add("is-visible");
  }

  /**
   * @param {string} digits
   * @returns {string}
   */
  function formatPhoneForDisplay(digits) {
    if (digits.length <= 4) {
      return digits;
    }
    return "+" + digits.slice(0, -4).replace(/(\d)(?=(\d{3})+$)/g, "$1 ") + " " + digits.slice(-4);
  }

  function showError(message) {
    if (!errorEl) {
      return;
    }
    errorEl.textContent = message;
    errorEl.classList.add("is-visible");
  }

  function hideError() {
    if (!errorEl) {
      return;
    }
    errorEl.textContent = "";
    errorEl.classList.remove("is-visible");
  }

  /**
   * @returns {string}
   */
  function collectOtp() {
    return inputs.map(function (el) {
      return el.value.replace(/\D/g, "");
    }).join("");
  }

  inputs.forEach(function (input, index) {
    input.addEventListener("input", function () {
      hideError();
      const v = input.value.replace(/\D/g, "").slice(-1);
      input.value = v;
      if (v && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
    input.addEventListener("paste", function (event) {
      event.preventDefault();
      const text = (event.clipboardData || window.clipboardData).getData("text");
      const digits = text.replace(/\D/g, "").slice(0, inputs.length);
      digits.split("").forEach(function (char, i) {
        if (inputs[i]) {
          inputs[i].value = char;
        }
      });
      const lastIndex = Math.min(digits.length, inputs.length - 1);
      inputs[lastIndex].focus();
    });
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      hideError();
      const entered = collectOtp();
      if (entered.length !== 6) {
        showError("Enter the 6-digit code.");
        return;
      }
      if (entered !== pending.otp) {
        showError("Invalid code. Try again.");
        return;
      }
      saveSession(pending.phoneNumber);
      clearPendingVerification();
      window.location.href = "home.html";
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      if (form) {
        form.requestSubmit();
      }
    });
  }

  inputs[0].focus();
})();

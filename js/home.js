(function () {
  const session = readSession();
  if (!session) {
    window.location.href = "index.html";
    return;
  }

  const userPhoneEl = document.getElementById("user-phone");
  if (userPhoneEl) {
    userPhoneEl.textContent = session.phoneNumber;
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      clearSession();
      window.location.href = "index.html";
    });
  }

  const path = window.location.pathname.split("/").pop() || "home.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("is-active");
    }
  });

  const previewCount = 5;
  document.querySelectorAll("[data-rail-mount]").forEach(function (container) {
    const railId = container.getAttribute("data-rail-mount");
    if (railId) {
      mountRailCards(container, railId, previewCount);
    }
  });
})();

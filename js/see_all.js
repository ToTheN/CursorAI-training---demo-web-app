(function () {
  const session = readSession();
  if (!session) {
    window.location.href = "index.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const railId = params.get("rail") || "";
  if (!isValidRailId(railId)) {
    window.location.href = "home.html";
    return;
  }

  const def = RAIL_DEFINITIONS[railId];
  const titleEl = document.getElementById("see-all-title");
  const gridEl = document.getElementById("see-all-grid");
  const userPhoneEl = document.getElementById("user-phone");

  if (titleEl) {
    titleEl.textContent = def.title;
  }
  document.title = def.title + " — See all";

  if (gridEl) {
    mountRailCards(gridEl, railId, null);
  }

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

  const path = window.location.pathname.split("/").pop() || "see-all.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("is-active");
    }
  });
})();

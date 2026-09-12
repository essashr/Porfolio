(function () {
  "use strict";

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu after a nav link is used.
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     Theme toggle (persisted, respects system preference)
  --------------------------------------------------------- */
  var THEME_KEY = "thomaz-portfolio-theme";
  var root = document.documentElement;
  var themeToggles = Array.prototype.slice.call(
    document.querySelectorAll(".theme-toggle")
  );

  function applyTheme(theme) {
    var isDark = theme === "dark";
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    themeToggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(isDark));
      var label = btn.querySelector(".theme-toggle__label");
      if (label) label.textContent = isDark ? "Light mode" : "Dark mode";
    });
  }

  var stored = null;
  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch (e) {
    /* localStorage may be unavailable; fall back to system preference */
  }

  var prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(stored || (prefersDark ? "dark" : "light"));

  themeToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* ignore write errors (private browsing, etc.) */
      }
    });
  });

  /* ---------------------------------------------------------
     Cursor-tracked spotlight on project cards
     (adapted, simplified re-implementation of a card-hover
     spotlight pattern — recolored and rewritten for this site)
  --------------------------------------------------------- */
  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supportsHover =
    window.matchMedia && window.matchMedia("(hover: hover)").matches;

  if (!prefersReducedMotion && supportsHover) {
    var cards = document.querySelectorAll(".carde");
    cards.forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty("--mx", x + "px");
        card.style.setProperty("--my", y + "px");
      });
    });
  }

  /* ---------------------------------------------------------
     Footer year removed (no fabricated copyright text) —
     nothing to compute here on purpose.
  --------------------------------------------------------- */
})();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const nav = document.querySelector(".nav");
  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const themeLabel = {
    light: "Light",
    dark: "Dark"
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const storedTheme = window.localStorage.getItem("dk-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    root.dataset.theme = storedTheme;
  }

  if (nav && !nav.querySelector(".theme-toggle")) {
    const controls = document.createElement("div");
    controls.className = "nav-controls";
    controls.innerHTML = `
      <button class="theme-toggle" type="button" aria-pressed="false">
        <span aria-hidden="true">Theme</span>
        <span data-theme-label></span>
      </button>
    `;

    if (menuButton) {
      nav.insertBefore(controls, menuButton);
      controls.appendChild(menuButton);
    } else {
      nav.appendChild(controls);
    }
  }

  const themeButton = document.querySelector(".theme-toggle");
  const themeLabelNode = document.querySelector("[data-theme-label]");

  const appliedTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");

  const syncThemeButton = () => {
    if (!themeButton || !themeLabelNode) {
      return;
    }

    const current = appliedTheme();
    themeButton.setAttribute("aria-label", `Switch to ${current === "dark" ? "light" : "dark"} theme`);
    themeButton.setAttribute("aria-pressed", String(current === "dark"));
    themeLabelNode.textContent = themeLabel[current];
  };

  syncThemeButton();

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const nextTheme = appliedTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      window.localStorage.setItem("dk-theme", nextTheme);
      syncThemeButton();
    });
  }

  const handleSystemThemeChange = () => {
    if (!window.localStorage.getItem("dk-theme")) {
      syncThemeButton();
    }
  };

  if (typeof prefersDark.addEventListener === "function") {
    prefersDark.addEventListener("change", handleSystemThemeChange);
  } else if (typeof prefersDark.addListener === "function") {
    prefersDark.addListener(handleSystemThemeChange);
  }

  if (!menuButton || !navLinks) {
    return;
  }

  if (!navLinks.id) {
    navLinks.id = "primary-nav";
  }

  menuButton.setAttribute("aria-controls", navLinks.id);

  const isMobile = () => window.innerWidth <= 960;

  const closeMenu = ({ returnFocus = false } = {}) => {
    navLinks.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) {
      menuButton.focus();
    }
  };

  const openMenu = () => {
    navLinks.hidden = false;
    menuButton.setAttribute("aria-expanded", "true");
    const firstLink = navLinks.querySelector("a");
    if (firstLink) {
      firstLink.focus();
    }
  };

  const syncNavVisibility = () => {
    if (isMobile()) {
      if (menuButton.getAttribute("aria-expanded") !== "true") {
        navLinks.hidden = true;
      }
    } else {
      navLinks.hidden = false;
      menuButton.setAttribute("aria-expanded", "false");
    }
  };

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeMenu({ returnFocus: true });
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("click", (event) => {
    if (!isMobile() || menuButton.getAttribute("aria-expanded") !== "true") {
      return;
    }

    if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMobile() && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu({ returnFocus: true });
    }
  });

  window.addEventListener("resize", syncNavVisibility);

  syncNavVisibility();
  syncThemeButton();
});

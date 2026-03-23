(function () {
  const data = window.DK_PRODUCTS;

  if (!data) {
    return;
  }

  function imageMarkup(product, className, eager) {
    const src = product.images[0];
    const second = product.images[1];
    const attrs = [
      `src="${src}"`,
      `alt="${product.primaryImageAlt || `${product.name} pedal`}"`,
      `loading="${eager ? "eager" : "lazy"}"`,
      'decoding="async"',
      'sizes="(max-width: 960px) 92vw, (max-width: 1280px) 45vw, 400px"'
    ];

    if (second) {
      attrs.push(`srcset="${second} 780w, ${src} 877w"`);
    }

    return `<img class="${className}" ${attrs.join(" ")} />`;
  }

  function productCard(product) {
    return `
      <article class="card product-card" data-line="${product.line}">
        ${imageMarkup(product, "product-card-image", false)}
        <div>
          <p class="product-category">${product.category}</p>
          <h3>${product.name}</h3>
          <p class="product-meta">${product.shortDescription}</p>
        </div>
        <div class="product-actions">
          <a class="btn btn-primary" href="products/${product.slug}.html">Open Details</a>
          <a class="btn btn-ghost" href="${product.buyUrl}" target="_blank" rel="noopener noreferrer">Buy on Reverb</a>
        </div>
      </article>
    `;
  }

  function legacyCard(item) {
    const watch = item.videoUrl
      ? `<a class="btn btn-ghost" href="${item.videoUrl}" target="_blank" rel="noopener noreferrer">Watch Archive Demo</a>`
      : "";

    return `
      <article class="card product-card legacy-card">
        <div>
          <p class="eyebrow">${item.status}</p>
          <p class="product-category">${item.category}</p>
          <h3>${item.name}</h3>
          <p class="product-meta">${item.description}</p>
        </div>
        ${watch ? `<div class="product-actions">${watch}</div>` : ""}
      </article>
    `;
  }

  function renderFeatured() {
    const host = document.querySelector("[data-featured-products]");
    if (!host) return;
    host.innerHTML = data.modernProducts.map(productCard).join("");
  }

  function renderProductsPage() {
    const host = document.querySelector("[data-products-grid]");
    if (!host) return;

    const filters = Array.from(document.querySelectorAll("[data-filter]"));
    const render = (mode) => {
      host.innerHTML = mode === "legacy"
        ? data.legacyProducts.map(legacyCard).join("")
        : data.modernProducts.map(productCard).join("");
    };

    const setPressed = (activeMode) => {
      filters.forEach((button) => {
        const pressed = button.getAttribute("data-filter") === activeMode;
        button.setAttribute("aria-pressed", String(pressed));
      });
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.getAttribute("data-filter") || "dsp";
        setPressed(mode);
        render(mode);
      });
    });

    setPressed("dsp");
    render("dsp");
  }

  function renderLegacyPage() {
    const host = document.querySelector("[data-legacy-grid]");
    if (!host) return;
    host.innerHTML = data.legacyProducts.map(legacyCard).join("");
  }

  renderFeatured();
  renderProductsPage();
  renderLegacyPage();
})();

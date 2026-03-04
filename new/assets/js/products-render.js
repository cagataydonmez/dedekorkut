(function () {
  const data = window.DK_PRODUCTS;

  if (!data) {
    return;
  }

  function bySlug(slug) {
    return data.modernProducts.find((item) => item.slug === slug);
  }

  function imageMarkup(product, className, eager) {
    const src = product.images[0];
    const second = product.images[1];
    const attrs = [
      `src="${src}"`,
      `alt="${product.name} pedal"`,
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
        <h3>${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-meta">${product.shortDescription}</p>
        <div class="product-actions">
          <a class="btn btn-primary" href="products/${product.slug}.html">Details</a>
          <a class="btn btn-ghost" href="${product.buyUrl}" target="_blank" rel="noopener noreferrer">Buy</a>
        </div>
      </article>
    `;
  }

  function legacyCard(item) {
    const watch = item.videoUrl
      ? `<a class="btn btn-ghost" href="${item.videoUrl}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>`
      : '<button class="btn btn-ghost" type="button" disabled aria-disabled="true">Watch on YouTube</button>';

    return `
      <article class="card legacy-card">
        <p class="eyebrow">${item.status}</p>
        <h3>${item.name}</h3>
        <p class="product-category">${item.category}</p>
        <p class="product-meta">${item.description}</p>
        <div class="product-actions">${watch}</div>
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

    const tabs = document.querySelectorAll("[data-filter]");
    const render = (mode) => {
      if (mode === "legacy") {
        host.innerHTML = data.legacyProducts.map(legacyCard).join("");
      } else {
        host.innerHTML = data.modernProducts.map(productCard).join("");
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((node) => {
          const selected = node === tab;
          node.classList.toggle("active", selected);
          node.setAttribute("aria-selected", String(selected));
        });
        render(tab.getAttribute("data-filter"));
      });
    });

    render("dsp");
  }

  function renderLegacyPage() {
    const host = document.querySelector("[data-legacy-grid]");
    if (!host) return;
    host.innerHTML = data.legacyProducts.map(legacyCard).join("");
  }

  function listItems(items) {
    return `<ul class="list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function setDetailSeo(product) {
    document.title = `${product.name} | Dede Korkut Pedal`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", product.seoDescription);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", `${product.name} | Dede Korkut Pedal`);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", product.shortDescription);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", window.location.pathname);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", product.images[0]);
    }
  }

  function renderDetailPage() {
    const host = document.querySelector("[data-product-detail]");
    if (!host) return;

    const slug = host.getAttribute("data-product-detail");
    const product = bySlug(slug);
    if (!product) return;

    const controlsSection = product.controls && product.controls.length
      ? `
        <section class="section">
          <h2>Controls</h2>
          ${listItems(product.controls)}
        </section>
      `
      : "";

    const togglesSection = product.toggles && product.toggles.length
      ? `
        <section class="section">
          <h2>Toggles</h2>
          ${listItems(product.toggles)}
        </section>
      `
      : "";

    const specsSection = product.specs && product.specs.length
      ? `
        <section class="section">
          <h2>Specs</h2>
          ${listItems(product.specs)}
        </section>
      `
      : "";

    const gallerySection = product.images.length > 1
      ? `
        <section class="section">
          <h2>Gallery</h2>
          <div class="grid-2">
            ${product.images.map((url, index) => `
              <figure class="card gallery-card">
                <img src="${url}" alt="${product.name} image ${index + 1}" loading="lazy" decoding="async" sizes="(max-width: 960px) 92vw, 44vw" />
              </figure>
            `).join("")}
          </div>
        </section>
      `
      : "";

    const demoAction = product.demoUrl
      ? `<a class="btn btn-ghost" href="${product.demoUrl}" target="_blank" rel="noopener noreferrer">Watch Demo</a>`
      : '<button class="btn btn-ghost" type="button" disabled aria-disabled="true">Watch Demo</button>';

    host.innerHTML = `
      <section class="split">
        <div>
          <p class="eyebrow">${product.category}</p>
          <h1>${product.name}</h1>
          <p class="lead">${product.shortDescription}</p>
          <section class="section-tight">
            <h2>Key Features</h2>
            ${listItems(product.features)}
          </section>
          ${controlsSection}
          ${togglesSection}
          ${specsSection}
          <div class="product-actions">
            <a class="btn btn-primary" href="${product.buyUrl}" target="_blank" rel="noopener noreferrer">Buy on Reverb</a>
            ${demoAction}
          </div>
        </div>
        ${imageMarkup(product, "product-hero-image", true)}
      </section>
      ${gallerySection}
    `;

    setDetailSeo(product);
  }

  renderFeatured();
  renderProductsPage();
  renderLegacyPage();
  renderDetailPage();
})();

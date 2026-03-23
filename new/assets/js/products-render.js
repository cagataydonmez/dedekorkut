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
      <article class="card product-card" data-line="${product.line}" data-product-trigger data-product-slug="${product.slug}">
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

  function featuredLeadCard(product) {
    const highlights = (product.features || []).slice(0, 1).map((item) => `<li>${item}</li>`).join("");

    return `
      <article class="card product-card product-card-featured" data-line="${product.line}">
        ${imageMarkup(product, "product-card-image", true)}
        <div class="product-card-featured-copy">
          <div>
            <p class="eyebrow">Featured Focus</p>
            <p class="product-category">${product.category}</p>
            <h3>${product.name}</h3>
            <p class="product-meta">${product.shortDescription}</p>
          </div>
          <ul class="product-note-list">
            ${highlights}
          </ul>
          <div class="product-actions">
            <a class="btn btn-primary" href="products/${product.slug}.html">Open Details</a>
            <a class="btn btn-ghost" href="${product.buyUrl}" target="_blank" rel="noopener noreferrer">Buy on Reverb</a>
          </div>
        </div>
      </article>
    `;
  }

  function legacyCard(item) {
    const watch = item.videoUrl
      ? `<a class="btn btn-ghost" href="${item.videoUrl}" target="_blank" rel="noopener noreferrer">Watch Archive Demo</a>`
      : "";

    return `
      <article class="card product-card legacy-card" data-product-trigger data-product-slug="${item.slug}">
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
    const [lead, ...rest] = data.modernProducts.slice(0, 4);
    host.innerHTML = [featuredLeadCard(lead), ...rest.map(productCard)].join("");
  }

  function renderProductsPage() {
    const host = document.querySelector("[data-products-grid]");
    if (!host) return;

    const stage = document.querySelector("[data-catalog-stage]");
    const stageMedia = document.querySelector("[data-catalog-stage-media]");
    const stageImage = document.querySelector("[data-stage-image]");
    const stageEyebrow = document.querySelector("[data-stage-eyebrow]");
    const stageCategory = document.querySelector("[data-stage-category]");
    const stageName = document.querySelector("[data-stage-name]");
    const stageDescription = document.querySelector("[data-stage-description]");
    const stageList = document.querySelector("[data-stage-list]");
    const stageActions = document.querySelector("[data-stage-actions]");
    const stageTags = Array.from(document.querySelectorAll("[data-stage-tag]"));
    const filters = Array.from(document.querySelectorAll("[data-filter]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stageAnimationToken = 0;

    function stagePayload(mode, item) {
      if (mode === "legacy") {
        return {
          mode,
          eyebrow: "Archive Focus",
          category: item.category,
          name: item.name,
          description: item.description,
          image: "assets/images/2020126-951352020-1-3-11-34-54.jpg",
          alt: "An archival workshop-style photograph from the brand's early analog era.",
          tags: ["Analog", "Archive", "History"],
          notes: [
            "Preserved as part of the brand's first handmade chapter.",
            "Shown here for context rather than current production."
          ],
          actions: `
            <button class="btn btn-primary" type="button" data-stage-reset>View Current DSP Line</button>
          `
        };
      }

      return {
        mode,
        eyebrow: "Curated Stage",
        category: item.category,
        name: item.name,
        description: item.shortDescription,
        image: item.stageImage || item.images[0],
        alt: item.stageAlt || item.primaryImageAlt || `${item.name} pedal`,
        tags: item.stageTags || ["Tone", "Control", "Feel"],
        notes: (item.features || []).slice(0, 2),
        actions: `
          <a class="btn btn-primary" href="products/${item.slug}.html">Open Details</a>
          <a class="btn btn-ghost" href="${item.buyUrl}" target="_blank" rel="noopener noreferrer">Buy on Reverb</a>
        `
      };
    }

    function setActiveCard(cards, activeSlug) {
      cards.forEach((card) => {
        card.dataset.active = String(card.dataset.productSlug === activeSlug);
      });
    }

    function commitStage(data) {
      if (!stage || !stageImage || !stageEyebrow || !stageCategory || !stageName || !stageDescription || !stageList || !stageActions) {
        return;
      }

      stage.dataset.mode = data.mode;
      stageImage.src = data.image;
      stageImage.alt = data.alt;
      stageEyebrow.textContent = data.eyebrow;
      stageCategory.textContent = data.category;
      stageName.textContent = data.name;
      stageDescription.textContent = data.description;
      stageList.innerHTML = data.notes.map((item) => `<li>${item}</li>`).join("");
      stageActions.innerHTML = data.actions;
      stageTags.forEach((tagNode, index) => {
        tagNode.textContent = data.tags[index] || "";
        tagNode.hidden = !data.tags[index];
      });

      const resetButton = stageActions.querySelector("[data-stage-reset]");
      if (resetButton) {
        resetButton.addEventListener("click", () => {
          setPressed("dsp");
          render("dsp");
        });
      }
    }

    function updateStage(data, animate) {
      if (!stageImage || !stage) {
        return;
      }

      const token = ++stageAnimationToken;
      const stageCopy = document.querySelector("[data-catalog-stage-copy]");
      const shouldAnimate = animate && !prefersReducedMotion && typeof stageImage.animate === "function" && stageCopy;

      if (!shouldAnimate) {
        commitStage(data);
        return;
      }
      Promise.all([
        stageImage.animate(
          [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0.22, transform: "scale(0.982)" }
          ],
          { duration: 150, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" }
        ).finished.catch(() => undefined),
        stageCopy.animate(
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.18, transform: "translateY(10px)" }
          ],
          { duration: 150, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" }
        ).finished.catch(() => undefined)
      ]).then(() => {
        if (token !== stageAnimationToken) {
          return;
        }

        commitStage(data);

        stageImage.animate(
          [
            { opacity: 0.2, transform: "scale(1.02)" },
            { opacity: 1, transform: "scale(1)" }
          ],
          { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
        );
        stageCopy.animate(
          [
            { opacity: 0.18, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
        );
      });
    }

    function bindCardStage(mode, items) {
      const cards = Array.from(host.querySelectorAll("[data-product-trigger]"));

      cards.forEach((card, index) => {
        const activate = () => {
          const item = items[index];
          if (!item) return;
          setActiveCard(cards, item.slug);
          updateStage(stagePayload(mode, item), true);
        };

        card.addEventListener("mouseenter", activate);
        card.addEventListener("focusin", activate);
        card.addEventListener("touchstart", activate, { passive: true });
      });

      if (items[0]) {
        setActiveCard(cards, items[0].slug);
      }
    }

    if (stageMedia && !prefersReducedMotion) {
      const syncStageField = (event) => {
        const rect = stageMedia.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 24;
        stageMedia.style.setProperty("--stage-x", `${x.toFixed(2)}px`);
        stageMedia.style.setProperty("--stage-y", `${y.toFixed(2)}px`);
      };

      stageMedia.addEventListener("pointermove", syncStageField);
      stageMedia.addEventListener("pointerleave", () => {
        stageMedia.style.setProperty("--stage-x", "0px");
        stageMedia.style.setProperty("--stage-y", "0px");
      });
    }

    const render = (mode) => {
      const items = mode === "legacy" ? data.legacyProducts : data.modernProducts;
      host.dataset.mode = mode;
      host.innerHTML = mode === "legacy"
        ? data.legacyProducts.map(legacyCard).join("")
        : data.modernProducts.map(productCard).join("");
      updateStage(stagePayload(mode, items[0]), false);
      bindCardStage(mode, items);
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

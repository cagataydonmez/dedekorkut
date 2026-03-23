document.addEventListener("DOMContentLoaded", () => {
  const galleries = Array.from(document.querySelectorAll("[data-gallery]"));

  if (!galleries.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const exitTiming = {
    duration: 140,
    easing: "cubic-bezier(0.4, 0, 1, 1)",
    fill: "forwards"
  };
  const enterTiming = {
    duration: 340,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "forwards"
  };

  function preloadImage(src) {
    const image = new Image();
    image.src = src;

    if (typeof image.decode === "function") {
      return image.decode().catch(() => undefined);
    }

    return Promise.resolve();
  }

  function swapStage(stage, caption, button) {
    stage.src = button.dataset.image || stage.src;
    stage.alt = button.dataset.alt || stage.alt;

    if (caption && button.dataset.caption) {
      caption.textContent = button.dataset.caption;
    }
  }

  galleries.forEach((gallery) => {
    const stage = gallery.querySelector("[data-gallery-stage]");
    const caption = gallery.querySelector("[data-gallery-caption]");
    const buttons = Array.from(gallery.querySelectorAll("[data-gallery-item]"));

    if (!stage || !buttons.length) {
      return;
    }

    let activeIndex = Math.max(0, buttons.findIndex((button) => button.getAttribute("aria-pressed") === "true"));
    let isAnimating = false;

    const syncPressed = (index) => {
      buttons.forEach((button, buttonIndex) => {
        button.setAttribute("aria-pressed", String(buttonIndex === index));
      });
    };

    const activate = async (index, { focus = false } = {}) => {
      if (isAnimating || index === activeIndex || !buttons[index]) {
        return;
      }

      const button = buttons[index];
      isAnimating = true;

      await preloadImage(button.dataset.image || "");

      if (!prefersReducedMotion && typeof stage.animate === "function") {
        await stage.animate(
          [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0.18, transform: "scale(0.985)" }
          ],
          exitTiming
        ).finished.catch(() => undefined);
      }

      activeIndex = index;
      syncPressed(activeIndex);
      swapStage(stage, caption, button);

      if (!prefersReducedMotion && typeof stage.animate === "function") {
        stage.animate(
          [
            { opacity: 0.28, transform: "scale(1.015)" },
            { opacity: 1, transform: "scale(1)" }
          ],
          enterTiming
        );
      } else {
        stage.style.opacity = "1";
        stage.style.transform = "scale(1)";
      }

      if (focus) {
        button.focus();
      }

      isAnimating = false;
    };

    syncPressed(activeIndex);

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        activate(index);
      });

      button.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }

        event.preventDefault();

        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + direction + buttons.length) % buttons.length;
        activate(nextIndex, { focus: true });
      });
    });
  });
});

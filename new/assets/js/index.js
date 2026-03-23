document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector("[data-signal-hero]");
  const field = hero?.querySelector(".signal-field");

  if (!hero || !field) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return;
  }

  let frame = null;
  let pointerX = 0;
  let pointerY = 0;
  let scrollY = 0;

  const render = () => {
    frame = null;
    const offsetX = (pointerX - 0.5) * 24;
    const offsetY = (pointerY - 0.5) * 24 + scrollY * -0.06;
    field.style.setProperty("--signal-x", `${offsetX.toFixed(2)}px`);
    field.style.setProperty("--signal-y", `${offsetY.toFixed(2)}px`);
  };

  const schedule = () => {
    if (frame === null) {
      frame = window.requestAnimationFrame(render);
    }
  };

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width;
    pointerY = (event.clientY - rect.top) / rect.height;
    schedule();
  });

  hero.addEventListener("pointerleave", () => {
    pointerX = 0.5;
    pointerY = 0.5;
    schedule();
  });

  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const travel = Math.min(Math.max(-rect.top, 0), rect.height);
    scrollY = travel;
    schedule();
  };

  pointerX = 0.5;
  pointerY = 0.5;
  onScroll();

  window.addEventListener("scroll", onScroll, { passive: true });
});

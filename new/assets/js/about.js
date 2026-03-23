document.addEventListener("DOMContentLoaded", () => {
  const revealItems = Array.from(document.querySelectorAll(".about-reveal"));
  const stage = document.querySelector(".about-stage-board");
  const chapters = Array.from(document.querySelectorAll("[data-stage]"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealItems.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10%" }
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    }
  }

  if (!stage || !chapters.length) {
    return;
  }

  const caption = stage.querySelector("[data-stage-caption]");
  const indexNode = stage.querySelector(".about-stage-index");
  const panels = Array.from(stage.querySelectorAll("[data-stage-panel]"));

  const activateStage = (name, index, copy) => {
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.stagePanel === name);
    });

    if (indexNode && index) {
      indexNode.textContent = index;
    }

    if (caption && copy) {
      caption.textContent = copy;
    }
  };

  activateStage(
    chapters[0].dataset.stage || "analog",
    chapters[0].dataset.stageIndex || "01",
    chapters[0].dataset.stageCopy || ""
  );

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const chapterObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const chapter = visible.target;
      activateStage(
        chapter.dataset.stage || "analog",
        chapter.dataset.stageIndex || "01",
        chapter.dataset.stageCopy || ""
      );
    },
    {
      threshold: [0.3, 0.55, 0.75],
      rootMargin: "-18% 0px -28%"
    }
  );

  chapters.forEach((chapter) => chapterObserver.observe(chapter));
});

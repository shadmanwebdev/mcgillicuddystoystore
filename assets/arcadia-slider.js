(() => {
  const A = window.Arcadia;
  A.modules.register("slider", (root) => {
    const track = root.querySelector("[data-arcadia-slider-track]");
    if (!track) return;
    root
      .querySelector("[data-arcadia-slider-controls]")
      ?.removeAttribute("hidden");
    const click = (e) => {
      const button = e.target.closest("[data-arcadia-slide]");
      if (button)
        track.scrollBy({
          left:
            Number(button.dataset.arcadiaSlide) *
            track.clientWidth *
            (document.documentElement.dir === "rtl" ? -1 : 1),
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
    };
    root.addEventListener("click", click);
    return () => root.removeEventListener("click", click);
  });
})();

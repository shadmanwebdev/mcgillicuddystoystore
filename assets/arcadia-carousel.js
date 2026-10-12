/* Reusable, instance-scoped scroll carousel; native scrolling works without JS. */
(() => {
  window.Arcadia.modules.register("carousel", (root) => {
    const track = root.querySelector("[data-carousel-track]");
    const controls = root.querySelector("[data-carousel-controls]");
    if (!track || !controls) return;
    const buttons = [...controls.querySelectorAll("[data-carousel-direction]")];
    const rtl = getComputedStyle(track).direction === "rtl";
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const position = Math.abs(track.scrollLeft);
      controls.hidden = max <= 2;
      buttons.forEach(button => {
        button.disabled = Number(button.dataset.carouselDirection) < 0 ? position <= 2 : position >= max - 2;
      });
    };
    const click = (event) => {
      const button = event.target.closest("[data-carousel-direction]");
      if (!button || !controls.contains(button)) return;
      track.scrollBy({left: Number(button.dataset.carouselDirection) * track.clientWidth * (rtl ? -1 : 1), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
    };
    const select = (event) => {
      const item = event.target.closest("li");
      if (item && track.contains(item)) item.scrollIntoView({block: "nearest", inline: "nearest", behavior: "auto"});
    };
    controls.addEventListener("click", click);
    track.addEventListener("scroll", update, {passive: true});
    root.addEventListener("shopify:block:select", select);
    const observer = new ResizeObserver(update);
    observer.observe(track);
    update();
    return () => {
      controls.removeEventListener("click", click);
      track.removeEventListener("scroll", update);
      root.removeEventListener("shopify:block:select", select);
      observer.disconnect();
    };
  });
})();

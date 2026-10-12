(() => {
  const A = window.Arcadia;
  A.modules.register("product-gallery", (root) => {
    const click = (e) => {
      const thumb = e.target.closest("[data-arcadia-thumb]");
      if (thumb) {
        root
          .querySelectorAll("[data-arcadia-thumb]")
          .forEach((t) => t.setAttribute("aria-current", String(t === thumb)));
        return;
      }
      const zoom = e.target.closest("[data-arcadia-zoom]");
      if (!zoom) return;
      e.preventDefault();
      const dialog = root.querySelector("[data-arcadia-zoom-dialog]"),
        content = root.querySelector("[data-arcadia-zoom-content]"),
        img = new Image();
      img.src = zoom.href;
      img.alt = zoom.querySelector("img")?.alt || "";
      content.replaceChildren(img);
      A.modal.open(dialog, zoom);
    };
    const stop = A.events.on("arcadia:variant:changed", (e) => {
      if (!root.closest("[data-arcadia-product-root]")?.contains(e.target))
        return;
      const id = e.detail.variant.featured_media?.id;
      if (id)
        root
          .querySelector('[data-arcadia-media="' + id + '"]')
          ?.scrollIntoView({ block: "nearest" });
    });
    root.addEventListener("click", click);
    return () => {
      root.removeEventListener("click", click);
      stop();
    };
  });
})();

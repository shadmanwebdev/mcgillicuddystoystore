(() => {
  const A = window.Arcadia;
  A.modules.register("recommendations", (root) => {
    if (!root.hidden || !root.dataset.arcadiaProductId) return;
    const controller = new AbortController();
    const url = new URL(
      root.dataset.arcadiaRecommendationsUrl,
      location.origin,
    );
    url.search = new URLSearchParams({
      section_id: root.dataset.arcadiaSectionId,
      product_id: root.dataset.arcadiaProductId,
      limit: "4",
      intent: "related",
    });
    A.render
      .section(url, root.dataset.arcadiaSectionId, {
        signal: controller.signal,
        selector: '[data-arcadia-module="recommendations"]',
      })
      .then((next) => {
        if (next && !next.hidden) {
          root.replaceChildren(...next.childNodes);
          root.hidden = false;
          A.modules.scan(root);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  });
})();

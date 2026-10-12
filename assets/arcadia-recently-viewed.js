/* Local browsing history only; no external analytics or tracking. */
(() => {
  const A = window.Arcadia,
    key = "arcadia-recent-products";
  const read = () => {
    try {
      const data = JSON.parse(A.utils.safeStorage("get", key) || "[]");
      return Array.isArray(data)
        ? data.filter((x) => typeof x === "string" && /^[a-z0-9-]+$/.test(x))
        : [];
    } catch (_) {
      return [];
    }
  };
  A.modules.register("recent-product", (root) => {
    const handle = root.dataset.arcadiaProductHandle;
    if (handle)
      A.utils.safeStorage(
        "set",
        key,
        JSON.stringify(
          [handle, ...read().filter((x) => x !== handle)].slice(0, 12),
        ),
      );
  });
  A.modules.register("recently-viewed", (root) => {
    const controller = new AbortController(),
      grid = root.querySelector("[data-arcadia-recent-grid]"),
      handles = read()
        .filter((x) => x !== root.dataset.arcadiaCurrentProduct)
        .slice(0, 4);
    Promise.all(
      handles.map(async (handle) => {
        try {
          return await A.render.section(
            A.utils.root() + "products/" + encodeURIComponent(handle),
            "arcadia-product-card",
            { signal: controller.signal, selector: "article" },
          );
        } catch (_) {
          return null;
        }
      }),
    ).then((cards) => {
      if (controller.signal.aborted) return;
      cards.filter(Boolean).forEach((card) => grid.append(card));
      if (grid.children.length) {
        root.hidden = false;
        A.modules.scan(grid);
      }
    });
    return () => controller.abort();
  });
})();

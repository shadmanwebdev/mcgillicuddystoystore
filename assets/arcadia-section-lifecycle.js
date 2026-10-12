/* Shopify editor integration; initial DOM and inserted feature roots. */
(() => {
  const A = window.Arcadia;
  // Section HTML inserted by the editor does not reliably execute script tags.
  // Load only Arcadia theme assets; module registration scans the inserted roots.
  const featureScripts = new Map();
  const loadFeatures = async (root) => {
    const scripts = [...root.querySelectorAll("script[src]")].filter((script) =>
      /\/arcadia-[a-z0-9-]+\.js(?:\?|$)/.test(script.src),
    );
    await Promise.all(
      scripts.map((script) => {
        const src = script.src;
        if (featureScripts.has(src)) return featureScripts.get(src);
        if (
          [...document.scripts].some(
            (existing) => existing !== script && existing.src === src,
          )
        )
          return;
        const ready = new Promise((resolve) => {
          const asset = document.createElement("script");
          asset.src = src;
          asset.onload = resolve;
          asset.onerror = () => {
            featureScripts.delete(src);
            asset.remove();
            resolve();
          };
          document.head.append(asset);
        });
        featureScripts.set(src, ready);
        return ready;
      }),
    );
  };
  A.sections = {
    init(root = document) {
      A.modules.scan(root);
    },
    unload(root) {
      A.modules.destroy(root);
    },
  };
  document.addEventListener("DOMContentLoaded", () => A.sections.init());
  document.addEventListener("shopify:section:load", async (e) => {
    await loadFeatures(e.target);
    if (!e.target.isConnected) return;
    A.sections.init(e.target);
    A.events.emit(
      "arcadia:section:loaded",
      { sectionId: e.detail.sectionId, root: e.target },
      e.target,
    );
  });
  document.addEventListener("shopify:section:unload", (e) => {
    A.sections.unload(e.target);
    A.events.emit(
      "arcadia:section:unloaded",
      { sectionId: e.detail.sectionId, root: e.target },
      e.target,
    );
  });
  document.addEventListener("shopify:section:reorder", (e) => {
    A.sections.init(e.target);
    A.events.emit(
      "arcadia:section:reordered",
      { sectionId: e.detail.sectionId, root: e.target },
      e.target,
    );
  });
  document.addEventListener("shopify:block:select", (e) => {
    const details = e.target.closest("details");
    if (details) details.open = true;
    A.events.emit(
      "arcadia:editor:block-selected",
      { root: e.target },
      e.target,
    );
    e.target.scrollIntoView({ block: "nearest" });
  });
  document.addEventListener("shopify:block:deselect", (e) =>
    A.events.emit(
      "arcadia:editor:block-deselected",
      { root: e.target },
      e.target,
    ),
  );
})();

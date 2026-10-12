/* Fetch server-rendered product section; requests cancel on unload. */
(() => {
  const A = window.Arcadia;
  A.modules.register("quick-view", (root) => {
    const abort = new AbortController();
    let dialog;
    const click = async (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (root.getAttribute("aria-busy") === "true") return;
      root.setAttribute("aria-busy", "true");
      try {
        const url = new URL(root.dataset.arcadiaProductUrl, location.origin);
        url.searchParams.set("section_id", "arcadia-quick-view");
        const fragment = await A.render.section(url, "arcadia-quick-view", {
          signal: abort.signal,
          selector: "[data-arcadia-quick-content]",
        });
        if (!fragment) throw new Error("Missing product");
        dialog = document.createElement("dialog");
        dialog.dataset.arcadiaModule = "dialog";
        dialog.id = "ArcadiaQuickView-" + crypto.randomUUID();
        dialog.setAttribute("aria-label", root.textContent.trim());
        dialog.append(fragment);
        document.body.append(dialog);
        A.modules.scan(dialog);
        A.modal.open(dialog, root);
        dialog.addEventListener(
          "close",
          () => {
            A.events.emit("arcadia:quickview:closed", {
              productHandle: root.dataset.arcadiaProductUrl,
            });
            A.modules.destroy(dialog);
            dialog.remove();
            dialog = null;
          },
          { once: true },
        );
        A.events.emit(
          "arcadia:quickview:opened",
          { productHandle: root.dataset.arcadiaProductUrl },
          root,
        );
      } catch (error) {
        if (error.name !== "AbortError") location.assign(root.href);
      } finally {
        root.removeAttribute("aria-busy");
      }
    };
    root.addEventListener("click", click);
    return () => {
      abort.abort();
      root.removeEventListener("click", click);
      if (dialog) {
        A.modules.destroy(dialog);
        dialog.remove();
      }
    };
  });
})();

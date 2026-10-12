(() => {
  const A = window.Arcadia;
  A.modules.register("cart-drawer", (root) => {
    const content = root.querySelector("[data-arcadia-drawer-content]");
    let controller;
    const load = async (trigger) => {
      controller?.abort();
      controller = new AbortController();
      root.setAttribute("aria-busy", "true");
      try {
        const url = new URL(A.utils.root() + "cart", location.origin);
        url.searchParams.set("section_id", "arcadia-cart-drawer");
        const next = await A.render.section(url, "arcadia-cart-drawer", {
          signal: controller.signal,
          selector: "[data-arcadia-drawer-fragment]",
        });
        if (!next) throw new Error("Cart unavailable");
        A.modules.destroy(content);
        content.replaceChildren(next);
        A.modules.scan(content);
        A.drawer.open(root, trigger);
      } catch (error) {
        if (error.name !== "AbortError")
          location.assign(A.utils.root() + "cart");
      } finally {
        root.removeAttribute("aria-busy");
      }
    };
    const added = A.events.on("arcadia:cart:item-added", (e) =>
      load(
        e.detail.source?.querySelector("[data-arcadia-add]") ||
          document.activeElement,
      ),
    );
    const click = (e) => {
      const trigger = e.target.closest("[data-arcadia-cart-open]");
      if (!trigger || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      load(trigger);
    };
    document.addEventListener("click", click);
    return () => {
      controller?.abort();
      added();
      document.removeEventListener("click", click);
    };
  });
})();

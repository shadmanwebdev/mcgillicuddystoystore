/* Optional automatic next-page loading; visible link remains on errors/no JS. */
(() => {
  const A = window.Arcadia;
  A.modules.register("infinite-scroll", (root) => {
    const grid = root.querySelector("[data-arcadia-grid]");
    if (!grid) return;
    const controller = new AbortController();
    let loading = false,
      observer;
    const load = async (link) => {
      if (loading) return;
      loading = true;
      link.setAttribute("aria-busy", "true");
      try {
        const nextRoot = await A.render.section(link.href, null, {
            signal: controller.signal,
            selector:
              '[data-arcadia-pagination-root="' +
              root.dataset.arcadiaPaginationRoot +
              '"]',
          }),
          nextGrid = nextRoot?.querySelector("[data-arcadia-grid]");
        if (!nextGrid) throw new Error("Missing results");
        Array.from(nextGrid.children).forEach((child) => {
          grid.append(child);
          A.modules.scan(child);
        });
        const nav = root.querySelector("[data-arcadia-pagination]"),
          nextNav = nextRoot.querySelector("[data-arcadia-pagination]");
        observer?.disconnect();
        if (nextNav) nav.replaceWith(nextNav);
        else nav?.remove();
        observe();
      } catch (error) {
        if (error.name !== "AbortError") link.removeAttribute("aria-busy");
      } finally {
        loading = false;
      }
    };
    const click = (e) => {
      const link = e.target.closest("[data-arcadia-next]");
      if (link) {
        e.preventDefault();
        load(link);
      }
    };
    const observe = () => {
      const next = root.querySelector("[data-arcadia-next]");
      if (
        next &&
        root.dataset.arcadiaAutomatic === "true" &&
        "IntersectionObserver" in window
      ) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) load(next);
          },
          { rootMargin: "150px" },
        );
        observer.observe(next);
      }
    };
    root.addEventListener("click", click);
    observe();
    return () => {
      controller.abort();
      observer?.disconnect();
      root.removeEventListener("click", click);
    };
  });
})();

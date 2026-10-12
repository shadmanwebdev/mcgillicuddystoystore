/* Search suggestions: debounced, abortable; ordinary form always remains available. */
(() => {
  const A = window.Arcadia;
  A.modules.register("predictive-search", (root) => {
    const input = root.querySelector("[data-arcadia-search-input]"),
      results = root.querySelector("[data-arcadia-search-results]"),
      status = root.querySelector("[data-arcadia-search-status]");
    if (!input || !results) return;
    let timer,
      controller,
      version = 0;
    input.setAttribute("aria-controls", results.id);
    input.setAttribute("aria-expanded", "false");
    const hide = () => {
      results.hidden = true;
      input.setAttribute("aria-expanded", "false");
    };
    const search = () => {
      clearTimeout(timer);
      controller?.abort();
      const current = ++version,
        q = input.value.trim();
      if (q.length < 2) {
        hide();
        return;
      }
      timer = setTimeout(async () => {
        controller = new AbortController();
        try {
          const url = new URL(
            A.utils.root() + "search/suggest",
            location.origin,
          );
          url.search = new URLSearchParams({
            q,
            "resources[type]": "product,collection,page,article,query",
            "resources[limit]": "6",
            section_id: "arcadia-predictive-search",
          });
          const fragment = await A.render.section(
            url,
            "arcadia-predictive-search",
            {
              signal: controller.signal,
              selector: "[data-arcadia-predictive-fragment]",
            },
          );
          if (!fragment || current !== version) return;
          results.replaceChildren(fragment);
          results.hidden = false;
          input.setAttribute("aria-expanded", "true");
          status.textContent = fragment.textContent.trim();
        } catch (error) {
          if (error.name !== "AbortError") hide();
        }
      }, 200);
    };
    const key = (e) => {
      if (e.key === "Escape") {
        hide();
        input.focus();
      }
      if (e.key === "ArrowDown" && !results.hidden) {
        const links = [...results.querySelectorAll("a")],
          index = links.indexOf(document.activeElement);
        e.preventDefault();
        links[(index + 1) % links.length]?.focus();
      }
      if (e.key === "ArrowUp" && !results.hidden) {
        const links = [...results.querySelectorAll("a")],
          index = links.indexOf(document.activeElement);
        e.preventDefault();
        if (index <= 0) input.focus();
        else links[index - 1].focus();
      }
    };
    const outside = (e) => {
      if (!root.contains(e.target)) hide();
    };
    input.addEventListener("input", search);
    root.addEventListener("keydown", key);
    document.addEventListener("click", outside);
    return () => {
      clearTimeout(timer);
      controller?.abort();
      input.removeEventListener("input", search);
      root.removeEventListener("keydown", key);
      document.removeEventListener("click", outside);
    };
  });
})();

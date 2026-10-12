(() => {
  const A = window.Arcadia;
  A.modules.register("navigation", (root) => {
    const close = (e) => {
      if (e.key === "Escape") {
        root.querySelectorAll("details[open]").forEach((d) => {
          d.open = false;
          d.querySelector("summary")?.focus();
        });
      }
    };
    const outside = (e) => {
      if (!root.contains(e.target))
        root.querySelectorAll("details[open]").forEach((d) => (d.open = false));
    };
    root.addEventListener("keydown", close);
    document.addEventListener("click", outside);
    return () => {
      root.removeEventListener("keydown", close);
      document.removeEventListener("click", outside);
    };
  });
})();

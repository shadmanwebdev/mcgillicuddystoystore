/* Native GET form retains Shopify's canonical filter semantics. */
(() => {
  window.Arcadia.modules.register("facets", (root) => {
    const submit = () => root.setAttribute("aria-busy", "true");
    root.addEventListener("submit", submit);
    return () => root.removeEventListener("submit", submit);
  });
})();

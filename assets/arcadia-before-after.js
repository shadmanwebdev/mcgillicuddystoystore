(() => {
  window.Arcadia.modules.register("before-after", (root) => {
    const input = root.querySelector("[data-arcadia-compare]");
    const update = () =>
      root.style.setProperty("--position", input.value + "%");
    input.addEventListener("input", update);
    update();
    return () => input.removeEventListener("input", update);
  });
})();

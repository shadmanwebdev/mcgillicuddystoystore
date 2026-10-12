(() => {
  const A = window.Arcadia;
  const saved = A.utils.safeStorage("get", "arcadia-mode");
  if (saved === "dark" || saved === "light")
    document.documentElement.dataset.mode = saved;
  A.modules.register("theme-mode", (root) => {
    const update = () =>
      root.setAttribute(
        "aria-pressed",
        String(document.documentElement.dataset.mode === "light"),
      );
    const click = () => {
      const mode =
        document.documentElement.dataset.mode === "light" ? "dark" : "light";
      document.documentElement.dataset.mode = mode;
      A.utils.safeStorage("set", "arcadia-mode", mode);
      update();
      A.events.emit(
        "arcadia:theme:mode-changed",
        { mode, source: "toggle" },
        root,
      );
    };
    update();
    root.addEventListener("click", click);
    return () => root.removeEventListener("click", click);
  });
})();

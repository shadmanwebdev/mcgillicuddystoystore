/* Self-declaration only. Does not claim identity or regulatory verification. */
(() => {
  const A = window.Arcadia;
  A.modules.register("age-verifier", (root) => {
    const key = "arcadia-age-" + root.dataset.arcadiaMinimum;
    if (A.utils.safeStorage("get", key) === "confirmed") return;
    const confirm = root.querySelector("[data-arcadia-age-confirm]");
    const cancel = (e) => e.preventDefault();
    const click = () => {
      A.utils.safeStorage("set", key, "confirmed");
      root.close();
    };
    root.addEventListener("cancel", cancel);
    confirm.addEventListener("click", click);
    root.showModal();
    return () => {
      root.removeEventListener("cancel", cancel);
      confirm.removeEventListener("click", click);
      if (root.open) root.close();
    };
  });
})();

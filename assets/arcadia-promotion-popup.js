(() => {
  const A = window.Arcadia;
  A.modules.register("promotion-popup", (root) => {
    const dialog = root.querySelector("dialog");
    const key = "arcadia-promo-" + root.dataset.key;
    const remember = () => A.utils.safeStorage("set", key, "dismissed");
    const show = () => {
      if (
        !document.querySelector("dialog[open]") &&
        document.visibilityState === "visible"
      )
        A.modal.open(dialog);
    };
    let timer;
    if (window.Shopify?.designMode || !A.utils.safeStorage("get", key))
      timer = setTimeout(show, Number(root.dataset.delay) * 1000);
    const stop = A.events.on("arcadia:editor:block-selected", (event) => {
      if (root.contains(event.detail.root)) show();
    });
    dialog.addEventListener("close", remember);
    return () => {
      clearTimeout(timer);
      stop();
      dialog.removeEventListener("close", remember);
      if (dialog.open) A.modal.close(dialog);
    };
  });
})();

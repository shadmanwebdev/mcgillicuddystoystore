/* Native dialogs provide modal focus containment, Escape, and inert background. */
(() => {
  const A = window.Arcadia,
    triggers = new WeakMap();
  A.modal = {
    open(dialog, trigger = document.activeElement) {
      if (!dialog || dialog.open) return;
      triggers.set(dialog, trigger);
      dialog.showModal();
      A.events.emit("arcadia:modal:opened", { id: dialog.id, trigger }, dialog);
    },
    close(dialog) {
      if (!dialog?.open) return;
      dialog.close();
    },
  };
  A.drawer = {
    open: (dialog, trigger) => {
      A.modal.open(dialog, trigger);
      A.events.emit(
        "arcadia:drawer:opened",
        { id: dialog.id, trigger },
        dialog,
      );
    },
    close: (dialog) => A.modal.close(dialog),
  };
  A.modules.register("dialog", (root) => {
    const close = (e) => {
      if (e.target.closest("[data-arcadia-close]") || e.target === root)
        A.modal.close(root);
    };
    const restore = () => {
      triggers.get(root)?.focus();
      A.events.emit(
        "arcadia:modal:closed",
        { id: root.id, trigger: triggers.get(root) },
        root,
      );
      if (root.dataset.arcadiaModule.includes("cart-drawer"))
        A.events.emit(
          "arcadia:drawer:closed",
          { id: root.id, trigger: triggers.get(root) },
          root,
        );
    };
    root.addEventListener("click", close);
    root.addEventListener("close", restore);
    return () => {
      if (root.open) root.close();
      root.removeEventListener("click", close);
      root.removeEventListener("close", restore);
    };
  });
  A.modules.register("dialog-trigger", (root) => {
    const click = () =>
      A.modal.open(document.getElementById(root.dataset.arcadiaTarget), root);
    root.addEventListener("click", click);
    return () => root.removeEventListener("click", click);
  });
})();

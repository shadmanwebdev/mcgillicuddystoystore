(() => {
  const A = window.Arcadia;
  A.modules.register("tabs", (root) => {
    const tabs = [...root.querySelectorAll("[data-arcadia-tab]")],
      panels = [...root.querySelectorAll("[data-arcadia-panel]")];
    if (!tabs.length) return;
    root
      .querySelector("[data-arcadia-tab-list]")
      .setAttribute("role", "tablist");
    const activate = (index) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute("aria-selected", String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
    };
    tabs.forEach((tab, i) => {
      tab.setAttribute("role", "tab");
      tab.id = "Label-" + panels[i].id;
      tab.setAttribute("aria-controls", panels[i].id);
      panels[i].setAttribute("role", "tabpanel");
      panels[i].setAttribute("aria-labelledby", tab.id);
      panels[i].tabIndex = 0;
    });
    const click = (e) => {
      const tab = e.target.closest("[data-arcadia-tab]");
      if (tab) {
        e.preventDefault();
        activate(tabs.indexOf(tab));
      }
    };
    const key = (e) => {
      const index = tabs.indexOf(document.activeElement);
      if (index < 0) return;
      let next = index;
      const rtl = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight")
        next = (index + (rtl ? -1 : 1) + tabs.length) % tabs.length;
      else if (e.key === "ArrowLeft")
        next = (index + (rtl ? 1 : -1) + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      else return;
      e.preventDefault();
      activate(next);
      tabs[next].focus();
    };
    const stop = A.events.on("arcadia:editor:block-selected", (e) => {
      const index = panels.findIndex(
        (panel) => panel === e.detail.root || panel.contains(e.detail.root),
      );
      if (index >= 0) activate(index);
    });
    root.addEventListener("click", click);
    root.addEventListener("keydown", key);
    activate(0);
    return () => {
      stop();
      root.removeEventListener("click", click);
      root.removeEventListener("keydown", key);
      panels.forEach((p) => (p.hidden = false));
    };
  });
})();

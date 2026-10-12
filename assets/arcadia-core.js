/* Arcadia foundation: DOM events and small defensive utilities. */
(() => {
  "use strict";
  if (window.Arcadia) return;
  window.Arcadia = {
    version: "1.0.0",
    events: {
      on(name, fn, root = document) {
        root.addEventListener(name, fn);
        return () => root.removeEventListener(name, fn);
      },
      off(name, fn, root = document) {
        root.removeEventListener(name, fn);
      },
      once(name, fn, root = document) {
        root.addEventListener(name, fn, { once: true });
      },
      emit(name, detail = {}, root = document) {
        root.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
      },
    },
    utils: {
      root: () => window.Shopify?.routes?.root || "/",
      money(cents, currency = document.documentElement.dataset.currency) {
        return new Intl.NumberFormat(document.documentElement.lang, {
          style: "currency",
          currency: currency || "USD",
        }).format(cents / 100);
      },
      safeStorage(action, key, value) {
        try {
          return action === "get"
            ? localStorage.getItem(key)
            : localStorage.setItem(key, value);
        } catch (_) {
          return null;
        }
      },
      date(value) {
        if (!value || !/T.*(?:Z|[+-]\d{2}:?\d{2})$/.test(value)) return null;
        const d = new Date(value);
        return Number.isFinite(d.getTime()) ? d : null;
      },
    },
  };
})();

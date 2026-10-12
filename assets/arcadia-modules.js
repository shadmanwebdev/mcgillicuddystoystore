/* Registry: independent root instances; cleanup on section removal. */
(() => {
  const A = window.Arcadia,
    registry = new Map(),
    instances = new Map();
  A.modules = {
    register(name, init) {
      if (!registry.has(name)) registry.set(name, init);
      if (document.readyState !== "loading") this.scan(document);
    },
    init(root) {
      for (const name of (root.dataset.arcadiaModule || "")
        .split(/\s+/)
        .filter(Boolean)) {
        if (!registry.has(name)) continue;
        let active = instances.get(root);
        if (!active) {
          active = new Map();
          instances.set(root, active);
        }
        if (active.has(name)) continue;
        try {
          active.set(name, registry.get(name)(root));
          A.events.emit("arcadia:module:ready", { name, root }, root);
        } catch (error) {
          A.events.emit("arcadia:module:error", { name, root, error }, root);
          console.error("[Arcadia]", name, error);
        }
      }
    },
    scan(scope = document) {
      if (scope.matches?.("[data-arcadia-module]")) this.init(scope);
      scope
        .querySelectorAll("[data-arcadia-module]")
        .forEach((root) => this.init(root));
    },
    destroy(scope) {
      for (const [root, modules] of instances)
        if (root === scope || scope.contains(root)) {
          modules.forEach((cleanup) => {
            try {
              cleanup?.();
            } catch (e) {
              console.error(e);
            }
          });
          instances.delete(root);
        }
    },
  };
})();

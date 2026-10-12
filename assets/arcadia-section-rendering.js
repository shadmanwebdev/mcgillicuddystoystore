/* Shared section-rendering boundary. Consumers own cancellation and insertion. */
(() => {
  const A = window.Arcadia;
  A.render = {
    async section(url, sectionId, { signal, selector } = {}) {
      const target = new URL(url, location.origin);
      if (target.origin !== location.origin)
        throw new Error("Section URL must be same-origin");
      if (sectionId) target.searchParams.set("section_id", sectionId);
      const response = await fetch(target, {
        signal,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      if (!response.ok) throw new Error(response.statusText);
      const documentFragment = new DOMParser().parseFromString(
        await response.text(),
        "text/html",
      );
      return selector
        ? documentFragment.querySelector(selector)
        : documentFragment;
    },
  };
})();

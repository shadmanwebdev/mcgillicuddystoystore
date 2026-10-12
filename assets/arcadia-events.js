/* Filtering, chronological strips and reversible editor state. */
(() => {
  const A = window.Arcadia;
  A.modules.register("events", (root) => {
    const cards = [...root.querySelectorAll("[data-arcadia-event]")];
    const game = root.querySelector("[data-arcadia-filter-game]");
    const type = root.querySelector("[data-arcadia-filter-type]");
    const date = root.querySelector("[data-arcadia-filter-date]");
    const layout = root.querySelector("[data-arcadia-filter-layout]");
    const empty = root.querySelector("[data-arcadia-event-empty]");
    const generated = [];
    if (root.dataset.layout === "strip") {
      cards
        .slice()
        .sort(
          (a, b) =>
            (A.utils.date(a.dataset.arcadiaStart)?.getTime() || Infinity) -
            (A.utils.date(b.dataset.arcadiaStart)?.getTime() || Infinity),
        )
        .forEach((card) => card.parentElement.append(card));
    }
    for (const [select, key] of [
      [game, "arcadiaGame"],
      [type, "arcadiaType"],
    ]) {
      if (!select) continue;
      [...new Set(cards.map((card) => card.dataset[key]).filter(Boolean))]
        .sort()
        .forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.append(option);
          generated.push(option);
        });
    }
    const filters = root.querySelector("[data-arcadia-event-filters]");
    filters?.removeAttribute("hidden");
    const change = () => {
      if (layout) root.dataset.layout = layout.value;
      if (root.dataset.layout === "strip") {
        cards
          .slice()
          .sort(
            (a, b) =>
              (A.utils.date(a.dataset.arcadiaStart)?.getTime() || Infinity) -
              (A.utils.date(b.dataset.arcadiaStart)?.getTime() || Infinity),
          )
          .forEach((card) => card.parentElement.append(card));
      }
      let visible = 0;
      cards.forEach((card) => {
        const start = A.utils.date(card.dataset.arcadiaStart);
        const upcoming =
          root.dataset.layout !== "strip" ||
          (!["completed", "cancelled"].includes(card.dataset.arcadiaStatus) &&
            (!start || start >= Date.now()));
        const match =
          upcoming &&
          (!game?.value || game.value === card.dataset.arcadiaGame) &&
          (!type?.value || type.value === card.dataset.arcadiaType) &&
          (!date?.value ||
            (start &&
              (date.value === "past"
                ? start < Date.now()
                : start >= Date.now())));
        card.hidden = !match;
        if (match) visible++;
      });
      if (empty) empty.hidden = visible > 0;
    };
    const stop = A.events.on("arcadia:editor:block-selected", (event) => {
      const card = event.detail.root.closest("[data-arcadia-event]");
      if (card && root.contains(card)) card.hidden = false;
    });
    const stopDeselect = A.events.on("arcadia:editor:block-deselected", change);
    const selected = (event) => {
      const link = event.target.closest("a");
      const card = link?.closest("[data-arcadia-event]");
      if (card && root.contains(card)) {
        A.events.emit(
          "arcadia:event:selected",
          {
            root: card,
            url: link.href,
            game: card.dataset.arcadiaGame,
            type: card.dataset.arcadiaType,
          },
          card,
        );
      }
    };
    root.addEventListener("click", selected);
    root.addEventListener("arcadia:countdown:complete", change);
    root.addEventListener("change", change);
    change();
    return () => {
      stop();
      stopDeselect();
      root.removeEventListener("click", selected);
      root.removeEventListener("arcadia:countdown:complete", change);
      root.removeEventListener("change", change);
      generated.forEach((option) => option.remove());
      cards.forEach((card) => (card.hidden = false));
      filters?.setAttribute("hidden", "");
      if (empty) empty.hidden = true;
    };
  });
})();

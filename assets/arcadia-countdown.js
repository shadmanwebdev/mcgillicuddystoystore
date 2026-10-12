/* Local countdown display only; never writes event/metaobject data. */
(() => {
  const A = window.Arcadia;
  A.modules.register("countdown", (root) => {
    const target = A.utils.date(root.dataset.arcadiaTargetDate);
    if (!target) return;
    const output = root.querySelector("[data-arcadia-countdown-output]"),
      units = root.dataset.arcadiaUnits.split(",");
    let timer,
      done = false;
    const tick = () => {
      const seconds = Math.max(0, Math.floor((target - Date.now()) / 1000));
      root.hidden = false;
      if (seconds === 0) {
        root.hidden = root.dataset.arcadiaCompletionAction === "hide";
        if (root.dataset.arcadiaCompletionAction === "completed") {
          const card = root.closest("[data-arcadia-event]");
          if (card) {
            card.dataset.arcadiaStatus = "completed";
            card.classList.add("arcadia-event-card--completed");
            const label = card.querySelector(
              "[data-arcadia-event-status-label]",
            );
            if (label) {
              const badge = label.querySelector(".arcadia-badge") || label;
              badge.textContent = label.dataset.arcadiaCompletedLabel;
            }
          }
        }
        output.textContent = root.dataset.arcadiaComplete;
        output.removeAttribute("aria-hidden");
        if (!done) {
          done = true;
          A.events.emit("arcadia:countdown:complete", { target, root }, root);
        }
        clearInterval(timer);
        return;
      }
      const values = [
        Math.floor(seconds / 86400),
        Math.floor(seconds / 3600) % 24,
        Math.floor(seconds / 60) % 60,
        seconds % 60,
      ];
      output.textContent = values
        .map((n, i) => String(n).padStart(2, "0") + units[i])
        .join(" : ");
    };
    tick();
    if (!done) timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  });
})();

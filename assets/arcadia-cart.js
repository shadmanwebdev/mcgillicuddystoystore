/* Cart forms. Depends on cart API/rendering/registry. Emits arcadia:cart:updated.
 * Native checkout submits notes/attributes; hooks stay inside server markup.
 */
(() => {
  const A = window.Arcadia;
  A.modules.register("cart", (root) => {
    const form = root.querySelector("[data-arcadia-cart-form]");
    const status = root.querySelector("[data-arcadia-cart-status]");
    if (!status) return;
    const controller = new AbortController();
    let busy = false;
    let refreshVersion = 0;

    const refresh = async (restoreFocus = false) => {
      const version = ++refreshVersion;
      const next = await A.render.section(
        location.href,
        root.dataset.arcadiaCartSection,
        {
          signal: controller.signal,
          selector: "[data-arcadia-cart-section]",
        },
      );
      if (controller.signal.aborted || version !== refreshVersion) return;
      if (!next)
        throw new Error(
          document.documentElement.dataset.error || "Unable to refresh cart.",
        );
      // An external add must not erase notes/attributes still being edited.
      let focusedDraft;
      if (!restoreFocus && form) {
        const replacements = [...(next.querySelector("form")?.elements || [])];
        for (const field of form.elements) {
          if (field.name !== "note" && !field.name?.startsWith("attributes["))
            continue;
          const checkable = field.type === "checkbox" || field.type === "radio";
          const dirty = checkable
            ? field.checked !== field.defaultChecked
            : field.options
              ? [...field.options].some(
                  (option) => option.selected !== option.defaultSelected,
                )
              : field.value !== field.defaultValue;
          const replacement = replacements.find(
            (item) =>
              item.name === field.name &&
              item.type === field.type &&
              (!checkable || item.value === field.value),
          );
          if (!replacement) continue;
          if (dirty) {
            if (checkable) replacement.checked = field.checked;
            else replacement.value = field.value;
          }
          if (field === document.activeElement)
            focusedDraft = {
              replacement,
              start: field.selectionStart,
              end: field.selectionEnd,
            };
        }
      }
      A.modules.destroy(root);
      root.replaceWith(next);
      A.modules.scan(next);
      if (focusedDraft) {
        focusedDraft.replacement.focus({ preventScroll: true });
        if (focusedDraft.start != null)
          focusedDraft.replacement.setSelectionRange(
            focusedDraft.start,
            focusedDraft.end,
          );
      }
      if (restoreFocus)
        next
          .querySelector("[data-arcadia-cart-update], a")
          ?.focus({ preventScroll: true });
    };

    const run = async (payload) => {
      if (busy) return;
      busy = true;
      refreshVersion++;
      status.textContent = "";
      root.setAttribute("aria-busy", "true");
      const controls = [
        ...form.querySelectorAll("button, input, textarea, select"),
      ];
      const originalDisabled = new Map(
        controls.map((control) => [control, control.disabled]),
      );
      controls.forEach((control) => {
        control.disabled = true;
      });
      try {
        await A.cart.request("update", payload);
        const cart = await A.cart.get();
        if (controller.signal.aborted) return;
        A.events.emit("arcadia:cart:updated", { cart, source: root });
        await refresh(true);
      } catch (error) {
        if (!controller.signal.aborted) {
          status.textContent = error.message;
          status.setAttribute("role", "alert");
        }
      } finally {
        busy = false;
        if (!controller.signal.aborted) {
          controls.forEach((control) => {
            control.disabled = originalDisabled.get(control);
          });
          root.removeAttribute("aria-busy");
        }
      }
    };

    const submit = (event) => {
      if (busy) {
        event.preventDefault();
        return;
      }
      if (event.submitter?.name === "checkout") return;
      event.preventDefault();
      if (form.reportValidity()) run(new FormData(form));
    };

    const click = (event) => {
      const remove = event.target.closest("[data-arcadia-remove]");
      if (
        !remove ||
        !root.contains(remove) ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      event.preventDefault();
      if (busy || !form.reportValidity()) return;
      const payload = new FormData(form);
      // Persist draft notes/attributes, staged quantities and removal together.
      payload.delete("updates[]");
      for (const input of form.querySelectorAll("[data-arcadia-cart-key]")) {
        payload.set(`updates[${input.dataset.arcadiaCartKey}]`, input.value);
      }
      payload.set(`updates[${remove.dataset.arcadiaRemove}]`, "0");
      run(payload);
    };

    const stopUpdates = A.events.on("arcadia:cart:updated", (event) => {
      if (event.detail.source === root || busy || controller.signal.aborted)
        return;
      refresh().catch((error) => {
        if (!controller.signal.aborted) status.textContent = error.message;
      });
    });
    form?.addEventListener("submit", submit);
    root.addEventListener("click", click);
    return () => {
      controller.abort();
      stopUpdates();
      form?.removeEventListener("submit", submit);
      root.removeEventListener("click", click);
    };
  });
  A.modules.register("cart-count", (root) =>
    A.events.on("arcadia:cart:updated", (event) => {
      root.textContent = String(event.detail.cart.item_count);
    }),
  );
})();

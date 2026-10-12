/* Product form depends on Arcadia rendering/cart APIs. Variant validation gates
 * purchase; emits variant:changed and product:loaded through Arcadia.events. */
(() => {
  const A = window.Arcadia;
  A.modules.register("product-form", (root) => {
    const form = root.querySelector("form"),
      select = root.querySelector("[data-arcadia-variant]"),
      button = root.querySelector("[data-arcadia-add]"),
      status = root.querySelector("[data-arcadia-form-status]");
    if (!form || !button) return;
    const controller = new AbortController();
    let pending = false,
      validated = true,
      available = !button.disabled,
      busy = false,
      variantController,
      version = 0;
    const plan = root.querySelector("[data-arcadia-selling-plan]");
    const updateButton = () => {
      button.disabled =
        busy ||
        pending ||
        !validated ||
        !available ||
        (root.dataset.arcadiaRequiresPlan === "true" && !plan?.value);
      form.setAttribute("aria-busy", String(busy || pending));
    };
    const refreshVariant = async () => {
      if (!select || !root.dataset.arcadiaProductUrl) return;
      variantController?.abort();
      variantController = new AbortController();
      const current = ++version;
      pending = true;
      validated = false;
      status.replaceChildren();
      updateButton();
      const url = new URL(root.dataset.arcadiaProductUrl, location.origin);
      url.searchParams.set("variant", select.value);
      if (plan?.value) url.searchParams.set("selling_plan", plan.value);
      try {
        const next = await A.render.section(url, "arcadia-variant-details", {
          signal: variantController.signal,
          selector: "[data-arcadia-variant-details]",
        });
        if (current !== version || controller.signal.aborted) return;
        if (!next) throw new Error("Missing variant details");
        for (const hook of ["price", "stock"]) {
          const current = root.querySelector("[data-arcadia-" + hook + "]"),
            replacement = next.querySelector("[data-arcadia-" + hook + "]");
          if (current && replacement) current.replaceWith(replacement);
        }
        const pickup = root
            .closest("[data-arcadia-product-root]")
            ?.querySelector("[data-arcadia-pickup-container]"),
          nextPickup = next.querySelector("[data-arcadia-pickup-container]");
        if (pickup && nextPickup) pickup.replaceWith(nextPickup);
        const rules = JSON.parse(
            next.querySelector("[data-arcadia-variant-rules]").textContent,
          ),
          quantity = root.querySelector("[data-arcadia-quantity]");
        if (quantity) {
          quantity.min = rules.min;
          quantity.step = rules.increment;
          if (rules.max) quantity.max = rules.max;
          else quantity.removeAttribute("max");
        }
        if (plan) {
          [...plan.options].forEach((option) => {
            option.disabled =
              !!option.value && !rules.plans.includes(option.value);
          });
          if (
            !plan.selectedOptions.length ||
            plan.selectedOptions[0]?.disabled
          ) {
            const previousPlan = plan.value;
            plan.value =
              [...plan.options].find((option) => !option.disabled)?.value || "";
            if (plan.value !== previousPlan) return refreshVariant();
          }
        }
        if (quantity) {
          let value = Math.max(rules.min, Number(quantity.value) || rules.min);
          value =
            rules.min +
            Math.floor((value - rules.min) / rules.increment) * rules.increment;
          quantity.value = rules.max ? Math.min(value, rules.max) : value;
        }
        available = rules.available;
        validated = true;
      } catch (error) {
        if (
          error.name !== "AbortError" &&
          current === version &&
          !controller.signal.aborted
        ) {
          const pickup = root
            .closest("[data-arcadia-product-root]")
            ?.querySelector("[data-arcadia-pickup-container]");
          if (pickup) pickup.replaceChildren();
          status.setAttribute("role", "alert");
          status.textContent = document.documentElement.dataset.error + " ";
          const retry = document.createElement("button");
          retry.type = "button";
          retry.className = "arcadia-button arcadia-button--secondary";
          retry.textContent = root.dataset.arcadiaRetryLabel;
          retry.addEventListener("click", refreshVariant, { once: true });
          status.append(retry);
        }
      } finally {
        if (current === version && !controller.signal.aborted) {
          pending = false;
          updateButton();
        }
      }
    };
    const variants = JSON.parse(
      root.querySelector("[data-arcadia-variants]")?.textContent || "[]",
    );
    const change = () => {
      const variant = variants.find((v) => String(v.id) === select?.value);
      if (!variant) return;
      available = variant.available;
      root.querySelectorAll("[data-arcadia-option-index]").forEach((swatch) => {
        swatch.setAttribute(
          "aria-pressed",
          String(
            variant.options[Number(swatch.dataset.arcadiaOptionIndex)] ===
              swatch.dataset.arcadiaOptionValue,
          ),
        );
      });
      updateButton();
      button.textContent = variant.available
        ? root.dataset.arcadiaAddLabel
        : root.dataset.arcadiaSoldLabel;
      const price = root.querySelector("[data-arcadia-price]");
      if (price) price.textContent = A.utils.money(variant.price);
      const stock = root.querySelector("[data-arcadia-stock]");
      if (stock)
        stock.textContent = variant.available
          ? root.dataset.arcadiaInStock
          : root.dataset.arcadiaSoldLabel;
      const quantity = root.querySelector("[data-arcadia-quantity]");
      if (quantity) {
        quantity.min = variant.quantity_rule?.min || 1;
        quantity.step = variant.quantity_rule?.increment || 1;
        quantity.value = quantity.min;
        if (variant.quantity_rule?.max)
          quantity.max = variant.quantity_rule.max;
        else quantity.removeAttribute("max");
      }
      if (root.dataset.arcadiaUpdateUrl === "true") {
        const url = new URL(location.href);
        url.searchParams.set("variant", variant.id);
        history.replaceState({}, "", url);
      }
      A.events.emit(
        "arcadia:variant:changed",
        { productId: root.dataset.arcadiaProductId, variant },
        root,
      );
      refreshVariant();
    };
    const submit = async (e) => {
      if (
        busy ||
        pending ||
        !validated ||
        !available ||
        (root.dataset.arcadiaRequiresPlan === "true" && !plan?.value)
      ) {
        e.preventDefault();
        return;
      }
      if (!A.cart || !form.checkValidity()) return;
      e.preventDefault();
      busy = true;
      updateButton();
      status.textContent = "";
      try {
        const item = await A.cart.request("add", new FormData(form));
        const cart = await A.cart.get();
        if (controller.signal.aborted) return;
        status.textContent = document.documentElement.dataset.added;
        A.events.emit(
          "arcadia:cart:item-added",
          { cart, item, source: root },
          root,
        );
        A.events.emit("arcadia:cart:updated", { cart, source: root }, root);
      } catch (error) {
        if (!controller.signal.aborted) {
          status.textContent = error.message;
          status.setAttribute("role", "alert");
        }
      } finally {
        busy = false;
        if (!controller.signal.aborted) updateButton();
      }
    };
    const swatchClick = (event) => {
      const swatch = event.target.closest("[data-arcadia-option-index]");
      if (!swatch || !select) return;
      const index = Number(swatch.dataset.arcadiaOptionIndex),
        value = swatch.dataset.arcadiaOptionValue,
        currentVariant = variants.find((v) => String(v.id) === select.value);
      const candidates = variants.filter(
        (v) => v.available && v.options[index] === value,
      );
      const next =
        candidates.find((v) =>
          v.options.every(
            (option, i) => i === index || option === currentVariant?.options[i],
          ),
        ) || candidates[0];
      if (next) {
        select.value = String(next.id);
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    };
    root.addEventListener("click", swatchClick);
    form.addEventListener("submit", submit);
    select?.addEventListener("change", change);
    plan?.addEventListener("change", refreshVariant);
    updateButton();
    if (plan) refreshVariant();
    A.events.emit(
      "arcadia:product:loaded",
      { productId: root.dataset.arcadiaProductId, root },
      root,
    );
    return () => {
      controller.abort();
      variantController?.abort();
      root.removeEventListener("click", swatchClick);
      form.removeEventListener("submit", submit);
      select?.removeEventListener("change", change);
      plan?.removeEventListener("change", refreshVariant);
    };
  });
})();

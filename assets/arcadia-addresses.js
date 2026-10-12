(() => {
  window.Arcadia.modules.register("address", (root) => {
    const country = root.querySelector("[data-arcadia-country]"),
      province = root.querySelector("[data-arcadia-province]"),
      container = root.querySelector("[data-arcadia-province-container]");
    if (!country || !province) return;
    if (country.dataset.default) country.value = country.dataset.default;
    const update = () => {
      let values = [];
      try {
        values = JSON.parse(
          country.selectedOptions[0]?.dataset.provinces || "[]",
        );
      } catch (_) {}
      province.replaceChildren();
      values.forEach(([value, label]) => {
        const option = new Option(label, value);
        province.append(option);
      });
      container.hidden = !values.length;
      province.disabled = !values.length;
      if (province.dataset.default) province.value = province.dataset.default;
    };
    country.addEventListener("change", update);
    update();
    return () => country.removeEventListener("change", update);
  });
})();

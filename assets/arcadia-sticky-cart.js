(() => {
  const A = window.Arcadia;
  A.modules.register("sticky-cart", (root) =>
    A.events.on("arcadia:cart:updated", (event) => {
      const cart = event.detail.cart;
      root.hidden = cart.item_count === 0;
      root.querySelector("[data-arcadia-sticky-count]").textContent =
        cart.item_count;
      root.querySelector("[data-arcadia-sticky-total]").textContent =
        A.utils.money(cart.total_price);
    }),
  );
})();

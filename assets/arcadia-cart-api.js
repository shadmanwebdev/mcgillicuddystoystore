/* Serialized mutations prevent quick-buy/cart races. No feature imports. */
(() => {
  const A = window.Arcadia;
  let queue = Promise.resolve();
  A.cart = {
    request(path, body) {
      const work = queue
        .catch(() => {})
        .then(async () => {
          const response = await fetch(
            A.utils.root() + "cart/" + path + ".js",
            {
              method: "POST",
              headers:
                body instanceof FormData
                  ? {}
                  : { "Content-Type": "application/json" },
              body: body instanceof FormData ? body : JSON.stringify(body),
            },
          );
          const data = await response.json();
          if (!response.ok)
            throw new Error(
              data.description || data.message || response.statusText,
            );
          return data;
        });
      queue = work;
      return work;
    },
    async get() {
      const response = await fetch(A.utils.root() + "cart.js");
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    },
  };
})();

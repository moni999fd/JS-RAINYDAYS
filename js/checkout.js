document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    itemElement.innerHTML = `
      <h3>${item.title}</h3>
      <p>Size: ${item.size}</p>
      <p>Price: $${item.price}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemElement);
    total += parseFloat(item.price);
  });

  cartTotalElement.textContent = total.toFixed(2);


  cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const index = event.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    }
  });
});

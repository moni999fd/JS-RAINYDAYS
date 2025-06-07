console.log("🎉 product-detail.js is now loading!");

document.addEventListener("DOMContentLoaded", () => {
  let selectedSize = null;

  
  const sizeOptions = document.querySelectorAll(".size-option");
  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      sizeOptions.forEach((btn) => btn.classList.remove("selected"));
      option.classList.add("selected");
      selectedSize = option.textContent;
      console.log("Selected size:", selectedSize);
    });
  });


  const addToCartBtn = document.getElementById("add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const product = {
      id: "rider-jacket-001",
      title: document.querySelector(".product-title").textContent,
      price: document.querySelector(".product-price").textContent.replace("$", ""),
      size: selectedSize,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
    window.location.href = "../checkout/index.html";

    console.log("Cart:", cart); 
  });
});

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

const productImageContainer = document.querySelector(".product-image");
const productTitle = document.querySelector(".product-title");
const productPrice = document.querySelector(".product-price");
const productDescription = document.querySelector(".product-description");
const colorOptions = document.querySelector(".color-options");

if (!productId) {
  productTitle.textContent = "Oops, product not found 😢";
} else {
  const apiURL = `https://v2.api.noroff.dev/rainy-days/${productId}`;

  async function fetchProductDetails() {
    try {
      const response = await fetch(apiURL);
      const result = await response.json();
      const product = result.data;

      productTitle.textContent = product.title;
      productPrice.textContent = `$${product.price}`;
      productDescription.textContent = product.description;

      productImageContainer.innerHTML = `
        <img src="${product.image.url}" alt="${product.image.alt}" class="jacket-image" />
      `;

      colorOptions.innerHTML = "";
      if (product.colors && product.colors.length > 0) {
        product.colors.forEach((color) => {
          const colorDiv = document.createElement("div");
          colorDiv.classList.add("color-circle");
          colorDiv.style.backgroundColor = color;
          colorOptions.appendChild(colorDiv);
        });
      }

    } catch (error) {
      console.error("Error fetching product:", error);
      productTitle.textContent = "Oops, product not found 😢";
    }
  }

  fetchProductDetails();
}

document.addEventListener("DOMContentLoaded", function () {
  const sizeOptions = document.querySelectorAll(".size");
  const addToCartButton = document.querySelector(".add-to-cart");
  let selectedSize = "L";
  let selectedQuantity = 1;


  sizeOptions.forEach(size => {
      size.addEventListener("click", function () {
          sizeOptions.forEach(s => s.classList.remove("selected"));
          this.classList.add("selected");
          selectedSize = this.textContent;
      });
  });


  addToCartButton.addEventListener("click", function () {
      localStorage.setItem("selectedSize", selectedSize);
      localStorage.setItem("selectedQuantity", selectedQuantity);
      localStorage.setItem("productName", "Rider Jacket");
      localStorage.setItem("productPrice", 75);
  });
});

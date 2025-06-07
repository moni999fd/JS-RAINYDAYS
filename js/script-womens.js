const womensContainer = document.querySelector(".jacket-grid");

async function getWomensJackets() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");
    const data = await response.json();

    const products = data.data;

    const womensJackets = products.filter((item) => item.gender === "Female");

    womensJackets.forEach((jacket) => {
      womensContainer.innerHTML += `
        <div class="jacket-item">
          <a href="../product/index.html?id=${jacket.id}">
            <img src="${jacket.image.url}" alt="${jacket.image.alt}" class="jacket-image">
          </a>
          <div class="jacket-description">
            <h3>${jacket.title}</h3>
            <p>$${jacket.price}</p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    womensContainer.innerHTML = "<p>Failed to load jackets. Try again later.</p>";
    console.error("Error loading jackets:", error);
  }
}

getWomensJackets();

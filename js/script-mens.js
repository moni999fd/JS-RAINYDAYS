const mensJacketContainer = document.querySelector(".jacket-grid");
const apiURL = "https://v2.api.noroff.dev/rainy-days";

async function getMensJackets() {
  try {
    const response = await fetch(apiURL);
    const json = await response.json();
    const products = json.data;

    const mensJackets = products.filter(product => product.gender === "Male");

    mensJacketContainer.innerHTML = "";

    mensJackets.forEach(jacket => {
      mensJacketContainer.innerHTML += `
        <a href="product/index.html?id=${jacket.id}" class="jacket-item">
          <img src="${jacket.image.url}" alt="${jacket.image.alt}" class="jacket-image">
          <div class="jacket-description">
            <h3>${jacket.title}</h3>
            <p>$${jacket.price}</p>
          </div>
        </a>
      `;
    });

  } catch (error) {
    console.error("Failed to fetch men's jackets", error);
    mensJacketContainer.innerHTML = "<p>Sorry, couldn't load jackets right now.</p>";
  }
}

getMensJackets();

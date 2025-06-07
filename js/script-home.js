const apiURL = "https://v2.api.noroff.dev/rainy-days";
const productsContainer = document.querySelector(".jacket-grid");

async function getJackets() {
    try {
        const response = await fetch(apiURL);
        const json = await response.json();
        const jackets = json.data;

        productsContainer.innerHTML = "";

        jackets.forEach((jacket) => {
            productsContainer.innerHTML += `
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
        console.error("Oops, something went wrong:", error);
        productsContainer.innerHTML = "<p>Sorry, jackets could not be loaded 😢</p>";
    }
}

getJackets();

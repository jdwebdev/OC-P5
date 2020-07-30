const url = "http://localhost:3000/api/teddies"
const productId = window.location.search.substr(1);
console.log(`Product ID: ${productId}`);

async function getProducts(url) {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let products = await response.json();
            return products;
        } else {
            console.log("erreur");
        }
    } catch (e) {
        console.log(e);
    }
}

getProducts(url).then (products => {
    console.log("OK");
    displayProduct(products);
}).catch(e => {
    console.log(e);
})


// Faire une boucle et tester quel objet correspond à l'id en question puis l'afficher 
function displayProduct(products) {

    const productDetail = document.querySelector(".productDetail");

    products.forEach ( product => {
        if (product._id === productId) {

            let convertedPrice = (product.price / 100).toFixed(2).replace(".",",");

            productDetail.insertAdjacentHTML("afterbegin", `
                <h2>${product.name}</h2>
                <img src="${product.imageUrl}" alt="Photo Teddy">
                <p>${product.description}</p>
                <div>${convertedPrice}€</div>
                <label for="color-select">Choisir une couleur</label>
                <select class="productDetail__select" name="colors" id="color-select"></select>
                <button>Ajouter au panier</button> 
                `
            );

            let select = document.querySelector(".productDetail__select");
            let colors = product.colors;
            colors.forEach (function (color) {
                let option = document.createElement("option");
                option.value = color;
                option.textContent = color;
                select.appendChild(option);
            })
        }
    })
}
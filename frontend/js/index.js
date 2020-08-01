const url = "http://localhost:3000/api/teddies"

/* Méthode fetch */ 
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

getProducts(url).then( products => {
    console.log("OK");
    displayAllProducts(products);
}).catch( e => {
    console.log(e);
})

function displayAllProducts(products) {

    const productList = document.getElementById("productList"); 

    products.forEach( product => {

        let convertedPrice = (product.price / 100).toFixed(2).replace(".",",");

        productList.insertAdjacentHTML("beforeend",`
            <li class="product">
                <h2 class="product__name">${product.name}</h2>
                <img class="product__img" src="${product.imageUrl}" alt="Photo Teddy">
                <div class="product__price">${convertedPrice}€</div>
                <a class="product__btn" href="./product.html?${product._id}">Voir l'offre</a>
            </li>
            `
        )
    })
}
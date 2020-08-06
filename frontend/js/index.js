const url = "http://localhost:3000/api/teddies"

/* Permet de récupérer les produits depuis le serveur sous la forme d'un tableau d'objets */ 
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
    displayAllProducts(products);
}).catch( e => {
    console.log("catch du thencatch");
    displayError();
    console.log(e);
})

/* 
    Affichage de tous les produits sous forme de liste 
    À l'aide de la balise <a> : envoi de l'id du produit sélectionné vers la page product.html
*/
function displayAllProducts(products) {

    const productList = document.getElementById("productList"); 

    products.forEach( product => {

        productList.insertAdjacentHTML("beforeend",`
            <li class="product">
                <h2 class="product__name">${product.name}</h2>
                <img class="product__img" src="${product.imageUrl}" alt="Photo Teddy">
                <div class="product__price">${(product.price/100).toFixed(2).replace(".",",")}€</div>
                <a class="product__btn" href="./product.html?${product._id}">Voir l'offre</a>
            </li>
            `
        )
    })
}
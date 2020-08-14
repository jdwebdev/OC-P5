const url = "http://localhost:3000/api/teddies"

/* Permet de récupérer les produits depuis le serveur sous la forme d'un tableau d'objets */ 

fetch(url)
    .then((response) => response.json())
    .then(products => {
        console.log(products)
        displayAllProducts(products);
    })
    .catch(e => displayError());

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
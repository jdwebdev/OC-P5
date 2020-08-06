/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1); 

const url = `http://localhost:3000/api/teddies/${productId}`;

/* Récupération du produit avec l'id associé depuis le serveur */ 
async function getOneProduct(url) {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let product = await response.json();
            return product;
        } else {
            console.log("erreur");
        }
    } catch (e) {
        console.log(e);
    }
}

getOneProduct(url).then (product => {
    displayProduct(product);
}).catch(e => {
    displayError();
    console.log(e);
})

/* 
    Fonction d'affichage du produit
*/
function displayProduct(product) {

    const productSection = document.querySelector(".product-section");

    productSection.insertAdjacentHTML("afterbegin", `
        <h2>${product.name}</h2>
        <img src="${product.imageUrl}" alt="Photo Teddy">
        <p>${product.description}</p>
        <div>${(product.price/100).toFixed(2).replace(".",",")}€</div>
        <label for="color-select">Choisir une couleur</label>
        <select class="product-section__select" name="colors" id="color-select"></select>
        <button class="addToCart">Ajouter au panier <i class="fas fa-shopping-cart"></i></button> 
        `
    );

    let addToCartBtn = document.querySelector(".addToCart");

    /* Évènement "click" : lance la fonction d'ajout du produit au panier */
    addToCartBtn.addEventListener('click', () => {

        let select = document.querySelector(".product-section__select");
        product.selectedColor = select.options[select.selectedIndex].value;

        addToCart(product);
    })

    let select = document.querySelector(".product-section__select");
    let colors = product.colors;
    colors.forEach (function (color) {
        let option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        select.appendChild(option);
    })
}

/* 
    Ajout du produit au panier. 
    Si le localStorage est vide elle crée un nouveau tableau cartProducts et l'enregistre dans le localStorage
    Sinon elle récupère le tableau du localStorage, ajoute le nouveau produit, et enregistre le nouveau tableau
*/
function addToCart (product) {

    if (localStorage.getItem('cartProducts') === null) {
        let cartProducts = [];
        cartProducts.push(product);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        checkCart();
    }
    else {
        let cp = JSON.parse(localStorage.getItem('cartProducts'));
        cp.push(product);
        localStorage.setItem('cartProducts', JSON.stringify(cp));
        refreshCart(cp);
    }
}
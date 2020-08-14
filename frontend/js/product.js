/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1); 

const url = `http://localhost:3000/api/teddies/${productId}`;

/* Récupération du produit avec l'id associé depuis le serveur */ 

fetch(url)
    .then((response) => response.json())
    .then(product => {
        displayProduct(product);
    })
    .catch(e => {
        displayError();
        console.log(e);
    });

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
    product.colors.forEach (function (color) {
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

    let cartProducts = []

    let saveToCartProduct = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        selectedColor: product.selectedColor
    }

    let newDifferentProduct = true;

    if (localStorage.getItem('cartProducts') === null) {

        cartProducts.push(saveToCartProduct);
        // cartProducts.push(product);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
    else {
        cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

        cartProducts.forEach((prod) => {
            if (product._id === prod._id && product.selectedColor === prod.selectedColor) {
                // console.log(`${product.name} = ${prod.name}`);
                prod.quantity++;
                newDifferentProduct = false;
            }
        })

        if (newDifferentProduct) cartProducts.push(saveToCartProduct);

        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }

    checkCart();
}
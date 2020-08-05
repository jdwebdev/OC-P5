const url = "http://localhost:3000/api/teddies"
const productId = window.location.search.substr(1);

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
                <button class="addToCart">Ajouter au panier <i class="fas fa-shopping-cart"></i></button> 
                `
            );

            let addToCartBtn = document.querySelector(".addToCart");

            addToCartBtn.addEventListener('click', () => {

                let select = document.querySelector(".productDetail__select");
                product.selectedColor = select.options[select.selectedIndex].value;

                addToCart(product);
            })

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
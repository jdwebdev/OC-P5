function displayCart() {

    let section = document.querySelector(".cart-section");

    if (localStorage.getItem('cartProducts') !== null) {
        let products = JSON.parse(localStorage.getItem('cartProducts'));
        let total = 0;
        let index = 0;

        section.insertAdjacentHTML("afterbegin", `
            <h2>Panier</h2>
            <table class="cart-section__table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Couleur</th>
                        <th>Prix</th>
                        <th>Suppr.</th>
                    </tr>
                </thead>
                <tbody class="cart-section__tbody">
                </tbody>
            </table>
        `);

        let tbody = document.querySelector(".cart-section__tbody");

        products.forEach( (product) => {
            
            let convertedPrice = (product.price / 100).toFixed(2).replace(".",",");
            total = total + product.price;
            
            tbody.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.selectedColor}</td>
                    <td>${convertedPrice} €</td>
                    <td><button class="cart-section__delete product-${index}">X</button></td>
                </tr>
            `)

            if (index >= products.length -1) {
                index=0;
            } else {
                index++;
            }
        })

        section.insertAdjacentHTML("beforeend", `
            <p class="cart-section__total">Total : ${(total/100).toFixed(2).replace(".",",")} €</p>
        `)

        let deleteBtn = document.querySelectorAll(`.cart-section__delete`);
        deleteBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                deleteProduct(e, products, section);
            })
        })

    } else {
        section.insertAdjacentHTML("afterbegin", `
            <h2>Panier</h2>
            <p class="cart-section__empty">Votre panier est vide ! 
                <br/>
                <a href="./index.html">Revenir à la page d'accueil</a>
            </p>
        `)
    }
}

function deleteProduct(e, products, section) {
    let index = e.target.classList[1].slice(-1);
    products.splice(index, 1);
    localStorage.setItem('cartProducts', JSON.stringify(products));
    if (products.length === 0) {
        localStorage.removeItem('cartProducts');
    }
    section.innerHTML = "";
    displayCart();
    refreshCart(products);
}

displayCart();
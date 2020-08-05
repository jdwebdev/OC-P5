let total = 0;

function displayCart() {

    let section = document.querySelector(".cart-section");

    if (localStorage.getItem('cartProducts') !== null) {
        let products = JSON.parse(localStorage.getItem('cartProducts'));
        // let total = 0;
        let index = 0;

        section.insertAdjacentHTML("afterbegin", `
            <h2>Panier</h2>
            <table class="cart-section__table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Couleur</th>
                        <th>Prix</th>
                        <th>Supprimer</th>
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
            `);

            if (index >= products.length -1) {
                index=0;
            } else {
                index++;
            }
        })

        section.insertAdjacentHTML("beforeend", `
            <p class="cart-section__total">Total : ${(total/100).toFixed(2).replace(".",",")} €</p>
        `);


        section.insertAdjacentHTML("beforeend", `
            <p class="">Veuillez remplir le formulaire suivant afin de valider la commande : </p>
            <form class="cart-form" action="post" type="submit">
                <div class="cart-form__group">
                    <label for="firstname">Prénom : </label>
                    <input id="firstname" type="text" placeholder="Votre prénom" maxlength="30" pattern="[A-Za-z]{2,}" required />
                </div>
                <div class="cart-form__group">
                    <label for="name">Nom : </label>
                    <input id="name" type="text" placeholder="Votre nom" maxlength="50" pattern="[A-Za-z]{2,}" required />
                </div>
                <div class="cart-form__group">
                    <label for="address">Adresse  : </label>
                    <input id="address" type="text" placeholder="Votre adresse" maxlength="200" required />
                </div>
                <div class="cart-form__group">
                    <label for="city">Ville : </label>
                    <input id="city" type="text" placeholder="Votre ville" maxlength="30" required />
                </div>
                <div class="cart-form__group">
                    <label for="email">Email : </label>
                    <input id="email" type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" placeholder="exemple@email.com" maxlength="30" required />
                </div>
                <button id="submit-btn">Valider le panier</button>
            </form>
        `);

        let deleteBtn = document.querySelectorAll(`.cart-section__delete`);
        deleteBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                deleteProduct(e, products, section);
            });
        });

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

const validateBtn = document.getElementById("submit-btn");
const form = document.querySelector(".cart-form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("submit !");

    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    };

    let products = [];
    if (localStorage.getItem('cartProducts') !== null) {
        let productObj = JSON.parse(localStorage.getItem('cartProducts'));
        
        productObj.forEach( p => {
            products.push(p._id);
        })
    }

    let contactProducts = JSON.stringify({
        contact, 
        products
    })

    postTest(contactProducts);

});

function postTest(contactProducts){

    fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body: contactProducts
    }).then(response => {
        return response.json();
    }).then( r => {
        console.log(r.contact);
        console.log(r.orderId);
        localStorage.setItem('contact', JSON.stringify(r.contact));
        localStorage.setItem('orderId', JSON.stringify(r.orderId));
        localStorage.setItem('total', JSON.stringify(total));
        localStorage.removeItem('cartProducts');
        window.location.replace("./confirmation.html");
    }).catch((e) => {
        alert('fetch POST error : ' + e);
    })

}

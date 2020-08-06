let total = 0;

/* Affichage du contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact */

function displayCart() {

    const section = document.querySelector(".cart-section");

    if (localStorage.getItem('cartProducts') !== null) {
        let products = JSON.parse(localStorage.getItem('cartProducts'));
        total = 0;
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
            
            total = total + product.price;

            /* La classe product-index nous permet de garder la valeur de l'index du produit. Il sera récupéré dans la fonction deleteProduct */
            tbody.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.selectedColor}</td>
                    <td>${(product.price/100).toFixed(2).replace(".",",")} €</td>
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
            <button class="cart-section__cancelCart">Annuler le panier</button>
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
                    <input id="email" type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" placeholder="exemple@email.com" maxlength="30" required />
                </div>
                <button id="submit-btn">Valider le panier</button>
            </form>
        `);
        
        const deleteBtn = document.querySelectorAll(".cart-section__delete");
        deleteBtn.forEach((btn) => {
            btn.addEventListener('click', e => {
                deleteProduct(e, products, section);
            });
        });

        const cancelCartBtn = document.querySelector(".cart-section__cancelCart");
        cancelCartBtn.addEventListener('click', () => {
            cancelCart(section);
        });

        const form = document.querySelector(".cart-form");
        form.addEventListener('submit', e => {
            e.preventDefault();
            submitForm();
        });


    } else {
        section.insertAdjacentHTML("afterbegin", `
            <h2>Panier</h2>
            <p class="cart-section__empty">
                Votre panier est vide ! 
                <br/>
                <a href="./index.html">Revenir à la page d'accueil</a>
            </p>
        `)
    }
}

displayCart();

/* 
    Permet de supprimer le produit sélectionné. 
    On récupère l'index correspondant grâce au dernier caractère du nom de la classe.
    On se sert ensuite de cet index pour supprimer le bon produit dans le tableau products du localStoragef
 */
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

/* Annulation de tout le panier */
function cancelCart(section) {
    localStorage.removeItem('cartProducts');
    section.innerHTML = "";
    displayCart();
    refreshCart();
}

/* 
    Récupération des valeurs de l'input dans l'objet contact
    Récupération des id des produits du panier dans le tableau products
    L'objet contact et le tableau products sont formattés en string avant d'être envoyé dans la fonction postOrder
*/
function submitForm() {

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

    postOrder(contactProducts);
};

/* 
    Requête POST
    Envoi au server l'objet contact et le tableau d'id products au format string
    Enregistrement de l'objet contact et l'orderId reçus du serveur, ainsi que le total de la commande sur le localStorage.
    Changement de page -> confirmation.html
 */
function postOrder(contactProducts){

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
        localStorage.setItem('contact', JSON.stringify(r.contact));
        localStorage.setItem('orderId', JSON.stringify(r.orderId));
        localStorage.setItem('total', JSON.stringify(total));
        localStorage.removeItem('cartProducts');
        window.location.replace("./confirmation.html");
    }).catch((e) => {
        alert('fetch POST error : ' + e);
    })

}
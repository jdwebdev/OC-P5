let cart = document.querySelector(".cart");

/* Vérifie s'il y a un produit dans le panier, notamment au chargement chaque page, s'il y a quelque chose, affiche une div contenant le nombre de produits dans le panier */
function checkCart() {
    if (localStorage.length !== 0) {
        let cp = JSON.parse(localStorage.getItem("cartProducts"));
        let div = document.createElement("div");
        div.className = "cart__nb";
        div.textContent = cp.length;
        cart.appendChild(div);
    }
}

/* Permet de rafraîchir la div contenant le nombre d'éléments dans le panier près du logo "panier" */
function refreshCart(cp) {
    let nb = document.querySelector(".cart__nb");
    if (localStorage.length !== 0) {
        nb.textContent = cp.length;
    } else {
        nb.parentNode.removeChild(nb);
    }
}

checkCart();
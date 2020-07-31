let cart = document.querySelector(".cart");

function checkCart() {

    if (localStorage.length !== 0) {
        let cp = JSON.parse(localStorage.getItem("cartProducts"));
        let div = document.createElement("div");
        div.className = "cart__nb";
        div.textContent = cp.length;
        cart.appendChild(div);
    } else {
        
    }
}

checkCart();

function refreshCart(cp) {
    let nb = document.querySelector(".cart__nb");
    if (localStorage.length !== 0) {
        nb.textContent = cp.length;
    } else {
        nb.parentNode.removeChild(nb);
    }
}
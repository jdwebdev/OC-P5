let cart = document.querySelector(".cart");

function checkCart() {
    if (localStorage.length !== 0) {
        console.log("blaj")
        let cp = JSON.parse(localStorage.getItem("cartProducts"));
        let div = document.createElement("div");
        div.className = "cart__nb";
        div.textContent = cp.length;
        cart.appendChild(div);
        

    } else {

    }
}

checkCart();
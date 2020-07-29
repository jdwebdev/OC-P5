const listeProduits = document.getElementById("listeProduits");
const productList = document.getElementById("productList");

let request = new XMLHttpRequest();
request.onreadystatechange= function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);

        for (let i=0; i < response.length; i++) {
            let li = document.createElement("li");
            let name = document.createElement("h2");
            let img = document.createElement("img");
            let price = document.createElement("div");
            let btn = document.createElement("a");
            let nb = response[i].price / 100;

            li.className = "product";
            name.className = "product__name";
            img.className = "product__img";
            price.className = "product__price"
            btn.className = "product__btn";

            name.textContent = response[i].name;
            img.setAttribute("src", response[i].imageUrl);
            price.textContent = nb.toFixed(2).replace(".",",") + "€";
            btn.textContent = "Voir l'offre";
            btn.href = "./product.html";
            

            li.appendChild(name);
            li.appendChild(img);
            li.appendChild(price);
            li.appendChild(btn);

            productList.appendChild(li);
        }
    }
}


request.open("GET", "http://localhost:3000/api/teddies");
request.send();
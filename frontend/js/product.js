const productId = window.location.search.substr(1);
console.log(`Product ID: ${productId}`);

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log("OK");
        // console.log(this.readyState);
        // console.log(this.status);
        // console.log(response);
        displayProduct(response);
    }
    else {
        console.log("ERROR");
        // console.log(this.readyState);
        // console.log(this.status);
    }
}

request.open("GET", "http://localhost:3000/api/teddies");
request.send();

// Faire une boucle et tester quel objet correspond à l'id en question puis l'afficher 

function displayProduct(products) {
    products.forEach ( product => {
        if (product._id === productId) {
            console.log(product.name);

            let name = document.createElement("h2");
            let img = document.createElement("img");
            let description = document.createElement("p");
            let price = document.createElement("div");
            let label = document.createElement("label");
            let select = document.createElement("select");
            let btn = document.createElement("button");
            let nb = product.price / 100;

            name.className = "productDetail__name";
            img.className = "productDetail__img";
            description.className = "productDetail__description";
            price.className = "productDetail__price";
            label.className = "productDetail__label";
            select.className = "productDetail__select";
            btn.className = "productDetail__btn";

            name.textContent = product.name;
            img.setAttribute("src", product.imageUrl);
            description.textContent = product.description;
            price.textContent = nb.toFixed(2).replace(".",",") + "€";
            label.textContent = "Choisir une couleur";
            btn.textContent = "Ajouter au panier";

            let section = document.querySelector(".productDetail");

            section.appendChild(name);
            section.appendChild(img);
            section.appendChild(description);
            section.appendChild(price);
            section.appendChild(label);

            let colors = product.colors;
            colors.forEach (function (color) {
                let option = document.createElement("option");
                console.log(color);
                option.value = color;
                option.textContent = color;
                select.appendChild(option);
            })
            section.appendChild(select);
            section.appendChild(btn);

        }
    })
}


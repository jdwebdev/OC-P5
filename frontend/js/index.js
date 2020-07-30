const url = "http://localhost:3000/api/teddies"



/* Méthode xhr basique */

// let request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//         let response = JSON.parse(this.responseText);
//         console.log(response);

//         displayAllProducts(response);

//     } else {
//         console.log("error");
//     }
// }

// request.open("GET", url);
// request.send();
// ----------------------------------------------


/* Méthode Promise */

// function getProducts (url) {

//     return new Promise (resolve => {

//         let request = new XMLHttpRequest();
//         request.onreadystatechange = function() {

//             // 4 <=> XMLHttpRequest.DONE
//             if (this.readyState === 4) {
//                 if (this.status === 200) {
//                     let response = JSON.parse(this.responseText);
//                     resolve(response);
//                 }
//             }
//             else {
//                 console.log(`this.readyState : ${this.readyState}`);
//             }
//         }
//         request.open("GET", url);
//         request.send();
//     })
// }

// getProducts(url).then( response => {
//     console.log("OK");
//     displayAllProducts(response);

// }).catch(e => {
//     console.log(`Error: ${e}`);
// })
//----------------------------------------------


/* Méthode fetch */ 

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

getProducts(url).then( products => {
    console.log("ok");
    displayAllProducts(products);
}).catch( e => {
    console.log(e);
})
// ----------------------------------------------------------




function displayAllProducts(products) {

    const productList = document.getElementById("productList"); 

    products.forEach( product => {
        let li = document.createElement("li");
        let name = document.createElement("h2");
        let img = document.createElement("img");
        let price = document.createElement("div");
        let btn = document.createElement("a");
        let nb = product.price / 100;

        li.className = "product";
        name.className = "product__name";
        img.className = "product__img";
        price.className = "product__price"
        btn.className = "product__btn";

        name.textContent = product.name;
        img.setAttribute("src", product.imageUrl);
        price.textContent = nb.toFixed(2).replace(".",",") + "€";
        btn.textContent = "Voir l'offre";
        btn.href = `./product.html?${product._id}`;
        

        li.appendChild(name);
        li.appendChild(img);
        li.appendChild(price);
        li.appendChild(btn);

        /* Test transfert ID */
        let testid = document.createElement("p");
        testid.textContent = `id: ${product._id}`;
        li.appendChild(testid);


        productList.appendChild(li);
    })
}
const url = "http://localhost:3000/api/teddies"

/* Méthode xhr basique */

// let request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//         let response = JSON.parse(this.responseText);
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
    console.log("OK");
    displayAllProducts(products);
}).catch( e => {
    console.log(e);
})
// ----------------------------------------------------------


function displayAllProducts(products) {

    const productList = document.getElementById("productList"); 

    products.forEach( product => {

        let convertedPrice = (product.price / 100).toFixed(2).replace(".",",");

        productList.insertAdjacentHTML("beforeend",`
            <li class="product">
                <h2 class="product__name">${product.name}</h2>
                <img class="product__img" src="${product.imageUrl}" alt="Photo Teddy">
                <div class="product__price">${convertedPrice}€</div>
                <a class="product__btn" href="./product.html?${product._id}">Voir l'offre</a>
            </li>
            `
        )
    })
}
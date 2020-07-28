const listeProduits = document.getElementById("listeProduits");


let request = new XMLHttpRequest();
request.onreadystatechange= function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);

        for (let i=0; i < response.length; i++) {
            let li = document.createElement("li");
            
            let title = document.createElement("p");
            let img = document.createElement("img");
            let price = document.createElement("p");
            let nb = response[i].price / 100;
            
            title.textContent = response[i].name;
            li.className = "liste";
            li.appendChild(title);
            li.appendChild(img);
            li.appendChild(price);
            
            img.setAttribute("src", response[i].imageUrl);
            price.textContent = nb.toFixed(2).replace(".",",");
            
            listeProduits.appendChild(li);
        }
        
    }
}


request.open("GET", "http://localhost:3000/api/teddies");

request.send();
const divtest = document.getElementById("test");
const listeProduits = document.getElementById("listeProduits");


let request = new XMLHttpRequest();
request.onreadystatechange= function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);

        for (let i=0; i < response.length; i++) {
            let li = document.createElement("li");
            li.className = "liste";
            let title = document.createElement("p");
            let img = document.createElement("img");
            
            title.textContent = response[i].name;
            li.appendChild(title);
            li.appendChild(img);
            
            img.setAttribute("src", response[i].imageUrl);
            listeProduits.appendChild(li);
        }
        
    }
}


request.open("GET", "http://localhost:3000/api/teddies");

request.send();
let confirmation = document.querySelector(".confirmation-section");

let contact = JSON.parse(localStorage.getItem("contact"));
let orderId = JSON.parse(localStorage.getItem("orderId"));
let total = JSON.parse(localStorage.getItem('total'));

confirmation.insertAdjacentHTML("beforeend",`
    <h2>Confirmation de la commande : </h2>
    
    <ul>
        <li class="confirmation-section__coord">Vos coordonnées : </li>
        <li>Nom : ${contact.lastName}</li>
        <li>Prénom : ${contact.firstName}</li>
        <li>Adresse : ${contact.address}</li>
        <li>Ville : ${contact.city}</li>
        <li>Email : ${contact.email}</li>
    </ul>
    <h3>Total : ${(total/100).toFixed(2).replace(".",",")} €</h3>
    <h3>Numéro de la commande : </br> ${orderId}</h3>
    <p>Ce numéro fait office de <strong>preuve d'achat</strong>. Veuillez-le conserver précieusement.</p>
`);
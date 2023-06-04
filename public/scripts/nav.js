/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
// Haal het huidige pad op
const currentPath = window.location.pathname;

// Zoek de link die overeenkomt met het huidige pad
const links = document.getElementsByClassName('item_link');
for (let i = 0; i < links.length; i++) {
  const linkPath = links[i].getAttribute('href');
  if (linkPath === currentPath) {
    const listItem = links[i].closest('.nav_item');
    listItem.classList.add('active'); // Voeg de "active" klasse toe aan de gevonden li
    break;
  }
}

// Voeg een event listener toe aan de item_link elementen
var itemLinks = document.getElementsByClassName("item_link");
for (var i = 0; i < itemLinks.length; i++) {
    itemLinks[i].addEventListener("click", function() {
        var menu = this.nextElementSibling;
        toggleMenu(menu);
    });
}

// Functie om het menu te openen/sluiten
function toggleMenu(menu) {
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}


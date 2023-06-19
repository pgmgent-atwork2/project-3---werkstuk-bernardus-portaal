/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
// Haal het huidige pad op
const currentPath = window.location.pathname;

const links = document.getElementsByClassName('item_link');
for (let i = 0; i < links.length; i++) {
  const linkPath = links[i].getAttribute('href');
  if (linkPath === currentPath) {
    const listItem = links[i].closest('.nav_item');
    listItem.classList.add('active'); // Voeg de "active" klasse toe aan de gevonden li
    break;
  }
}

var itemLinks = document.getElementsByClassName("item_link");
for (var i = 0; i < itemLinks.length; i++) {
    itemLinks[i].addEventListener("click", function() {
        var menu = this.nextElementSibling;
        toggleMenu(menu);
    });
}

function toggleMenu(menu) {
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}


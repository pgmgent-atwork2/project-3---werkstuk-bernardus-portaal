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

    // JavaScript function to handle the user item click
    function handleUserItemClick(event) {
        // Prevent the default anchor tag behavior
        event.preventDefault();

        // Get the selected user's details
        const user = event.currentTarget.querySelector('.profile-content');
        const userName = user.querySelector('.user_name').textContent;
        const username = user.querySelector('.username').textContent;
        const userImgSrc = event.currentTarget.querySelector('.profile-img-user img').src;

        // Update the user bar with the selected user's details
        const selectedUser = document.getElementById('selected-user');
        selectedUser.querySelector('.profile-img-user img').src = userImgSrc;
        selectedUser.querySelector('.user_name').textContent = userName;
        selectedUser.querySelector('.username').textContent = username;
        selectedUser.querySelector('.subject').textContent = userName;
    }

    // Add event listeners to the user items
    const userLinks = document.querySelectorAll('.user-link');
    userLinks.forEach((link) => {
        link.addEventListener('click', handleUserItemClick);
    });



document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.querySelector(".chat-container");
  const emailContainer = document.querySelector(".email-container");
  const toggleButton = document.getElementById("toggle-button");
  const icon = document.getElementById("icon");

  toggleButton.addEventListener("click", () => {
    chatContainer.classList.toggle("hidden");
    emailContainer.classList.toggle("hidden");
    toggleButton.classList.toggle("active");
    
    // Wissel tussen de chat- en e-mailiconen
    if (icon.classList.contains("fa-comments")) {
      icon.classList.remove("fa-comments");
      icon.classList.add("fa-envelope");
    } else {
      icon.classList.remove("fa-envelope");
      icon.classList.add("fa-comments");
    }
  });
});

const mailChatArticle = document.querySelector('.inbox_side');
const inboxReceivedArticle = document.querySelector('.inbox-received');
const inboxContainer = document.querySelector('.scrollable-container');

// Vind het toggle-knop element
const toggleButton = document.getElementById('toggle-inbox');
const iconInbox = document.getElementById('icon-inbox');
const buttonText = document.querySelector('.button-mail p');

// Voeg een event listener toe aan het toggle-knop element
toggleButton.addEventListener('click', () => {
  // Toggle de zichtbaarheid van de artikelen
  mailChatArticle.classList.toggle('hidden');
  inboxReceivedArticle.classList.toggle('hidden');
  inboxContainer.classList.toggle('hidden');
  
  // Verander de icoon naar 'chat' als chat stukje niet actief is, anders verander naar 'envelope'
  if (mailChatArticle.classList.contains('hidden')) {
    iconInbox.classList.remove('fa-envelope');
    iconInbox.classList.add('fa-comment');
    buttonText.textContent = 'Stuur Chat/E-mail';
  } else {
    iconInbox.classList.remove('fa-comment');
    iconInbox.classList.add('fa-envelope');
    buttonText.textContent = 'Zie mails';
  }
});












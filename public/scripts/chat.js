/* eslint-disable prettier/prettier */
const handleUserItemClick = (event) => {
    const user = event.currentTarget.querySelector('.profile-content');
    const userName = user.querySelector('.user_name').textContent;
    const username = user.querySelector('.username').textContent;
    const userImgSrc = event.currentTarget.querySelector('.profile-img-user img').src;
    const selectedUser = document.getElementById('selected-user');
    selectedUser.querySelector('.profile-img-user img').src = userImgSrc;
    selectedUser.querySelector('.user_name').textContent = userName;
    selectedUser.querySelector('.username').textContent = username;
    selectedUser.querySelector('.subject').textContent = userName;
};

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

    if (icon.classList.contains("fa-comments")) {
        icon.classList.remove("fa-comments");
        icon.classList.add("fa-envelope");
        } else {
        icon.classList.remove("fa-envelope");
        icon.classList.add("fa-comments");
        }
    });
});

const mailChatArticle = document.querySelector('.inbox_inner');
const inboxReceivedArticle = document.querySelector('.inbox-received');
const inboxContainer = document.querySelector('.scrollable-container');

const toggleButton = document.getElementById('toggle-inbox');
const iconInbox = document.getElementById('icon-inbox');
const buttonText = document.querySelector('.button-mail p');

toggleButton.addEventListener('click', () => {
    mailChatArticle.classList.toggle('hidden');
    inboxReceivedArticle.classList.toggle('hidden');
    inboxContainer.classList.toggle('hidden');

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

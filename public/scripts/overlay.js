const btnOverlay = document.querySelector(".add-feedback");
const btnClose = document.querySelector(".close");
const overlay = document.querySelector(".overlay");

btnOverlay.addEventListener('click', (e) => {
    overlay.style.display = "block";
});

btnClose.addEventListener('click', (e) => {
    overlay.style.display = "none";
});
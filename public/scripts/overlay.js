const btnFeedback = document.querySelectorAll(".add--overlay");
const btnClose = document.querySelectorAll(".close");
const overlay = document.querySelectorAll(".overlay");

btnFeedback.forEach(btn => {
  btn.addEventListener('click', (e) => {
    overlay.forEach(element => {
      element.style.display = "block";
    });
  });
});

btnClose.forEach(btn => {
  btn.addEventListener('click', (e) => {
    overlay.forEach(element => {
      element.style.display = "none";
    });
    console.log("Dicht");
  });
});

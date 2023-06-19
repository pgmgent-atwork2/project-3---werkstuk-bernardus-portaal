const images = [
  '/images/Login-bg2.jpg',
  '/images/Login-bg3.jpg',
  '/images/Login-bg4.jpg'
];

const bgImage = document.querySelector('.bg-img');
let currentIndex = 0;

function changeBackgroundImage() {
  bgImage.src = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

bgImage.src = images[currentIndex];

setInterval(changeBackgroundImage, 3000); // Verander de afbeelding elke 3 seconden

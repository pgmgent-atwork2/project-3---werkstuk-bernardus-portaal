
const btnPoints = document.querySelector(".btn--point");
const btnDocuments= document.querySelector(".btn--document");
const pointsSection = document.querySelector(".documenten--points");
const documentsSection = document.querySelector(".documenten--docu");

btnPoints.addEventListener('click', (e) => {
    pointsSection.classList.remove('hidden');
    documentsSection.classList.add('hidden');
});

btnDocuments.addEventListener('click', (e) => {
    pointsSection.classList.add('hidden');
    documentsSection.classList.remove('hidden');
});

const pointElements = document.querySelectorAll('.documenten-text');

pointElements.forEach(element => {
  const score = parseInt(element.querySelector('p#point').textContent);

  if (score < 10) {
    element.style.borderColor = 'red';
    element.style.backgroundColor = 'LightCoral';
  } else if (score >= 10 && score <= 13) {
    element.style.borderColor = 'orange';
    element.style.backgroundColor = 'LightSalmon';
  } else {
    element.style.borderColor = 'green';
    element.style.backgroundColor = 'MediumAquaMarine';
  }
});

const scores = Array.from(document.querySelectorAll('.documenten-text p#point')).map(element => parseInt(element.textContent));
const totalScore = scores.reduce((accumulator, score) => accumulator + score, 0);
const averageScore = totalScore / scores.length;
const percentage = Math.floor((averageScore / 20) * 100).toString().slice(0, 2);

const gemiddeldeElement = document.createElement('p');
gemiddeldeElement.textContent = `Jaar Totaal: ${percentage}%`;

const gemiddeldeDiv = document.querySelector('.gemiddelde');
gemiddeldeDiv.appendChild(gemiddeldeElement);

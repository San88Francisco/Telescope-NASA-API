const numPlanets = 13;
const ovalWidths = generateRandomArray(numPlanets, 550, 450);
const ovalHeights = generateRandomArray(numPlanets, 130, 80);

//* передаємо створений масив планет
export let planets = createPlanets(numPlanets);
function createPlanets(num) {
   return Array.from({ length: num }, () => {
      const planet = document.createElement("div");
      planet.className = "planet";
      document.body.appendChild(planet);

      planet.insertAdjacentHTML(
         'afterbegin',
         `<img class="imgPl" src="" alt=""></img>`
      )
      return planet;
   });
}

//* фінції створення планет та корегування
function generateRandomArray(length, min, max) {
   return Array.from({ length }, () => Math.random() * (max - min) + min);
}
function updatePositions() {
   const centerX = window.innerWidth / 2;
   const centerY = window.innerHeight / 2;
   const time = Date.now() * 0.00008;

   for (const [i, planet] of planets.entries()) {
      const angle = (i / numPlanets) * Math.PI * 2;
      const x = centerX + ovalWidths[i] * Math.cos(angle + time);
      const y = centerY + ovalHeights[i] * Math.sin(angle + time);

      const distanceToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const scaleFactor = 1 + distanceToCenter / (window.innerWidth / 2);

      planet.style.transform = `translate(${x}px, ${y}px) scale(${scaleFactor})`;
   }
   requestAnimationFrame(updatePositions);
}
document.addEventListener("DOMContentLoaded", () => {
   updatePositions();
});



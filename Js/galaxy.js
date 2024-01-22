//* передаємо створений масив планет
import { planets } from './createPlanets';
const sun = document.getElementById('sun')
const galaxy = document.getElementById('galaxy');
//! Масив планет
const planetArray = Array.from(planets)
// console.log('✌️planetArray --->', planetArray);


async function fetchData() {
   try {
      const planetResponse = await fetch(
         'https://65a9501b219bfa37186902fa.mockapi.io/Planets'
      );

      //* Перетворення в JSON
      let planetsData = await planetResponse.json();

      add(planetsData)
   } catch (error) {
      console.error(error);
   }
}
fetchData()


function add(planetsData) {
   const imgPlanet = document.querySelectorAll('.imgPl')
   planetsData.forEach((item, index) => {
      imgPlanet[index].src = item.img_url;
   })

   //* Створення контейнера та перекладання планет в нього



   for (const planetEl of planetArray) {
      galaxy.appendChild(planetEl);
   }

   //* Виводимо в ДОМ
   document.body.appendChild(galaxy);

   searchPlanet(planetArray, planetsData)
}


//* Перебираємо масив планет та відслідковуємо подію
function searchPlanet(planetArray, planetsData) {
   planetArray.forEach((planetElement) => {
      planetElement.addEventListener('click', (event) => {
         const targetPlanet = planetArray.find((planet) => planet.contains(event.target));
         console.log('✌️targetPlanet --->', targetPlanet);

         opacityGalaxyOffOrOn(sun, 0, 'none', 1000);

         if (targetPlanet) {
            const imgElement = targetPlanet.querySelector('img');
            if (imgElement) {
               const srcValue = imgElement.getAttribute('src');
               console.log('src:', srcValue);

               const infoMenu = document.getElementById('info-menu');


               opacityGalaxyOffOrOn1(infoMenu)
               const planetIndex = planetArray.indexOf(targetPlanet);
               console.log('✌️planetIndex --->', planetIndex);

               if (planetIndex !== -1) {
                  const planetData = planetsData[planetIndex];
                  console.log('✌️planetsData --->', planetData);

                  infoMenu.innerHTML = '';

                  infoMenu.insertAdjacentHTML(
                     'beforeend',
                     `
                     <div class="box-planet">
                        <img class="img-nfo-planet" src="${srcValue}" alt="planet">
                     </div>
                     <div class="box-info">
                        <h1>${planetData.name}</h1>
                        <h2>Тип планети: ${planetData.type}</h2>
                        <h3>Придатність для життя: ${planetData.suitable_for_life ? 'Так' : 'Ні'}</h3>
                        <p>${planetData.description}</p>
                        <h4>Діаметр: ${planetData.diameter} км</h4>
                        <i id="exit" class="fa-solid fa-arrow-right-from-bracket"> Exit</i>
                     </div>
                     `
                  );

                  const exit = document.getElementById('exit')
                  exit.addEventListener('click', () => {
                     console.log(infoMenu);
                     infoMenu.classList.toggle('hidden')
                     setTimeout(() => {
                        infoMenu.classList.toggle('hiddenNone')
                        opacityGalaxyOffOrOn(sun, 1, 'flex', 0)
                     }, 1000);
                  })
               } else {
                  console.error('Планета не знайдена в масиві');
               }
            } else {
               console.error('src не знайдено');
            }
         }
      });
   });
}


//* off/on планет при кліку
function opacityGalaxyOffOrOn1(infoMenu) {
   planetArray.forEach((el) => {
      el.style.opacity = 0;
   });

   setTimeout(() => {
      planetArray.forEach((el) => {
         el.style.display = 'none';
      });
   }, 200);
   sun.style.opacity = 0;

   setTimeout(() => {
      infoMenu.classList.toggle('hiddenNone')
      setTimeout(() => {
         infoMenu.classList.toggle('hidden')
      }, 200);
   }, 500);
}

function opacityGalaxyOffOrOn(sunStar, num, noneOrFlex, setTime) {
   planetArray.forEach((el) => {
      el.style.opacity = num;
   });

   setTimeout(() => {
      planetArray.forEach((el) => {
         el.style.display = noneOrFlex;
      });
   }, setTime);

   sunStar.style.opacity = num;
}







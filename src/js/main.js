"use strict";

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const des = data.slice(1, 99);
    console.log(des);

    const container = document.querySelector(".country-cards");

    des.forEach(element => {
      const card = document.createElement("div");
      card.classList.add("country-cards__card");

      const img = document.createElement("img");
      img.classList.add("country-cards__card__img");
      img.src = element.flags.svg;

      const div = document.createElement("div");
      div.classList.add("country-cards__card__info");

      const titleCard = document.createElement("h3");
      titleCard.classList.add("country-cards__card__title");
      titleCard.textContent = element.name;

      const textPopulation = document.createElement("p");
      textPopulation.classList.add("country-cards__card__text");
      textPopulation.innerHTML = `<strong>Population:</strong> ${element.population}`;

      const textRegion = document.createElement("p");
      textRegion.classList.add("country-cards__card__text");
      textRegion.innerHTML = `<strong>Region:</strong>  ${element.region}`;

      const textCapital = document.createElement("p");
      textCapital.classList.add("country-cards__card__text");
      textCapital.innerHTML = `<strong>Capital:</strong> ${element.capital}`;

      div.append(titleCard, textPopulation, textRegion, textCapital);

      card.append(img, div);
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error al obtener los datos:', error));

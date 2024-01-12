"use strict";

const itemsRegion = document.querySelectorAll(".header__more__filter__list__item");

const searchInput = document.querySelector(".header__more__search__input");

let res;
let data;

const changePosition = (region) => {
  if (region === "All") {
    res = data;
  } else {
    res = data.filter(item => item.region === region);
  }
}

fetch("data.json")
  .then(response => response.json())
  .then(initialData => {
    data = initialData;
    res = data;
    console.log(res);

    itemsRegion.forEach(item => {
      item.addEventListener("click", () => {
        let region = item.textContent;
        changePosition(region);
        updateDOM();
      });
    });

    searchInput.addEventListener("input", () => {
      const value = searchInput.value;
      res = data.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      })

      updateDOM();
    })

    const updateDOM = () => {
      const container = document.querySelector(".country-cards");
      const cardFragment = document.createDocumentFragment();

      res.forEach(element => {
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

        cardFragment.appendChild(card);

        div.append(titleCard, textPopulation, textRegion, textCapital);

        card.append(img, div);
      });

      container.innerHTML = "";
      container.appendChild(cardFragment);
    }
    updateDOM();
  })
  .catch(error => console.error('Error to fetching data:', error));

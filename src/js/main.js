"use strict";

const bodyDark = document.body;
const mainContainer = document.querySelector(".main");
const searchContainer = document.querySelector(".header__more__search");
const filterContainer = document.querySelector(".header__more__filter");

const containerCards = document.querySelector(".country-cards");

const itemsRegion = document.querySelectorAll(".header__more__filter__list__item");

const searchInput = document.querySelector(".header__more__search__input");

const buttonTheme = document.querySelector(".header__present__theme");

let res;
let data;

const changePosition = (region) => {
  if (region === "All") {
    res = data;
  } else {
    res = data.filter(item => item.region === region);
  }

  searchInput.value = "";
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
    });


    const addDotsEveryThreeDigits = (num) => {
      let numberToText = num.toString();

      let groups = [];
      for (let i = numberToText.length; i > 0; i -= 3) {
        groups.unshift(numberToText.slice(Math.max(0, i - 3), i));
      }

      let result = groups.join('.');

      return result;
    }

    const createSpecificationSection = (element) => {
      window.scrollTo(0, 0);

      searchContainer.classList.add("hidden");
      filterContainer.classList.add("hidden");
      containerCards.classList.add("hidden");

      const specificationSection = document.createElement("section");
      specificationSection.classList.add("specification-section");

      specificationSection.style.display = "flex";

      const containerBack = document.createElement("div");
      containerBack.classList.add("specification-section__back");

      const backIcon = document.createElement("i");
      backIcon.classList.add("fa-solid", "fa-arrow-left");

      const paragraphBack = document.createElement("p");
      paragraphBack.textContent = "Back";

      containerBack.addEventListener("click", () => {
        containerCards.classList.remove("hidden");
        searchContainer.classList.remove("hidden");
        filterContainer.classList.remove("hidden");
        specificationSection.remove();
      })

      const imageSpecification = document.createElement("img");
      imageSpecification.classList.add("specification-section__img");

      const titleSpecification = document.createElement("h2");
      titleSpecification.classList.add("specification-section__title");

      const textSpecification = document.createElement("div");
      textSpecification.classList.add("specification-section__text");

      const textSpecificationDate1 = document.createElement("div");

      const moreInfo = document.createElement("div");

      const moreTexts = document.createElement("div");
      moreTexts.classList.add("specification-section__text__more");

      const NativeName = document.createElement("p");
      const Population = document.createElement("p");
      const Region = document.createElement("p");
      const Subregion = document.createElement("p");
      const Capital = document.createElement("p");

      const textSpecificationDate2 = document.createElement("div");

      const TopLevelDomain = document.createElement("p");
      const Currencies = document.createElement("p");
      const Languages = document.createElement("p");

      const borderCountries = document.createElement("div");
      borderCountries.classList.add("specification-section__border-countries");

      const borderCountriesContainer = document.createElement("div");
      borderCountriesContainer.classList.add("specification-section__border-countries__content");

      const borderCountriesTitle = document.createElement("strong");
      borderCountriesTitle.classList.add("specification-section__border-countries__title");

      if (element.borders === undefined) {
        const borderCountriesItem = document.createElement("div");
        borderCountriesItem.classList.add("specification-section__border-countries__item");
        borderCountriesItem.textContent = "No border countries";
        borderCountriesContainer.appendChild(borderCountriesItem);
        borderCountries.appendChild(borderCountriesContainer);
      } else {
        element.borders.forEach(border => {
          const borderCountriesItem = document.createElement("div");
          borderCountriesItem.classList.add("specification-section__border-countries__item");
          borderCountriesItem.textContent = border;
          borderCountriesContainer.appendChild(borderCountriesItem);
        });
        borderCountries.appendChild(borderCountriesContainer);
      }

      imageSpecification.src = element.flags.svg;
      titleSpecification.textContent = element.name;

      NativeName.innerHTML = `<strong>Native Name:</strong> ${element.nativeName}`;

      const populationSpecificSection = addDotsEveryThreeDigits(element.population);

      Population.innerHTML = `<strong>Population:</strong> ${populationSpecificSection}`;
      Region.innerHTML = `<strong>Region:</strong> ${element.region}`;
      Subregion.innerHTML = `<strong>Sub Region:</strong> ${element.subregion}`;
      Capital.innerHTML = `<strong>Capital:</strong> ${element.capital}`;

      TopLevelDomain.innerHTML = `<strong>Top Level Domain:</strong> ${element.topLevelDomain}`;
      Currencies.innerHTML = `<strong>Currencies:</strong> ${element.currencies.map(cur => cur.name).join(", ")}`;
      Languages.innerHTML = `<strong>Languages:</strong> ${element.languages.map(lang => lang.name).join(", ")}`;

      borderCountriesTitle.textContent = "Border Countries:"

      mainContainer.appendChild(specificationSection);
      specificationSection.append(containerBack, textSpecification);

      containerBack.append(backIcon, paragraphBack);

      moreTexts.append(textSpecificationDate1, textSpecificationDate2);

      moreInfo.append(titleSpecification, moreTexts, borderCountries);
      moreInfo.classList.add("specification-section__text__more-info");

      textSpecification.append(imageSpecification, moreInfo);

      textSpecificationDate1.append(NativeName, Population, Region, Subregion, Capital);

      textSpecificationDate2.append(TopLevelDomain, Currencies, Languages);

      borderCountries.append(borderCountriesTitle, borderCountriesContainer);

      const borderItem = document.querySelectorAll(".specification-section__border-countries__item");

      const darkModeSpecificationSection = () => {
        if (bodyDark.classList.contains("body-dark")) {
          specificationSection.classList.toggle("specification-section-dark");
          containerBack.classList.toggle("specification-section__back-dark");

          borderItem.forEach(item => {
            item.classList.add("specification-section__border-countries__item-dark");
          })
        } else {
          specificationSection.classList.remove("specification-section-dark");
          containerBack.classList.remove("specification-section__back-dark");

          borderItem.forEach(item => {
            item.classList.remove("specification-section__border-countries__item-dark");
          })
        }
      }

      darkModeSpecificationSection();

      buttonTheme.addEventListener("click", () => {
        darkModeSpecificationSection();
      })
    }

    const updateDOM = () => {
      const cardFragment = document.createDocumentFragment();

      res.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("country-cards__card");

        if (bodyDark.classList.contains("body-dark")) {
          card.classList.add("country-cards__card-dark");
        } else {
          card.classList.remove("country-cards__card-dark");
        }

        card.addEventListener("click", () => createSpecificationSection(element));

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
        const populationMainCard = addDotsEveryThreeDigits(element.population);
        textPopulation.innerHTML = `<strong>Population:</strong> ${populationMainCard}`;

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

      containerCards.innerHTML = "";
      containerCards.appendChild(cardFragment);
    }
    updateDOM();
  })
  .catch(error => console.error('Error to fetching data:', error));

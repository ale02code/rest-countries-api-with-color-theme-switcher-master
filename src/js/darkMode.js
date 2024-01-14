"use strict";

const body = document.querySelector(".body");
const darkModeButton = document.querySelector(".header__present__theme");

const header = document.querySelector(".header");
const headerPresent = document.querySelector(".header__present");

const headerSearch = document.querySelector(".header__more__search");
const headerSearchInput = document.querySelector(".header__more__search__input");
const headerFilter = document.querySelector(".header__more__filter");
const containerRegionCard = document.querySelector(".header__more__filter__list");

const main = document.querySelector(".main");

const iconMoon = document.querySelector(".fa-moon");
iconMoon.classList.add("fa-regular");

darkModeButton.addEventListener("click", () => {
  iconMoon.classList.replace("fa-regular", "fa-solid");

  body.classList.toggle("body-dark");
  header.classList.toggle("header-dark");
  headerPresent.classList.toggle("header__present-dark");
  headerSearch.classList.toggle("header__more__search-dark");
  headerSearchInput.classList.toggle("header__more__search__input-dark");
  headerFilter.classList.toggle("header__more__filter-dark");

  main.classList.toggle("main-dark");

  const containerCardsToggleTheme = document.querySelectorAll(".country-cards__card");

  containerCardsToggleTheme.forEach(card => {
    card.classList.toggle("country-cards__card-dark");
  });

  containerRegionCard.classList.toggle("header__more__filter__list-active-dark");
});
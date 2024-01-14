"use strict";

const body = document.querySelector(".body");
const darkModeButton = document.querySelector(".header__present__theme");

const header = document.querySelector(".header");
const headerPresent = document.querySelector(".header__present");

const headerSearch = document.querySelector(".header__more__search");
const headerSearchInput = document.querySelector(".header__more__search__input");
const headerFilter = document.querySelector(".header__more__filter");

const main = document.querySelector(".main");

const changeThemeCards = () => {
  console.log(containerCardsToggleTheme);
  containerCardsToggleTheme.forEach(card => {
    card.classList.toggle("country-cards__card-dark");
  });
}

darkModeButton.addEventListener("click", () => {
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

  // changeThemeCards();
});
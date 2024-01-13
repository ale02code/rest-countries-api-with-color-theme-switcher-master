const containerRegion = document.querySelector(".header__more__filter");
const regionList = document.querySelector(".header__more__filter__list");

const changeVisibility = () => {
  regionList.classList.toggle("header__more__filter__list-active");
}

containerRegion.addEventListener('click', changeVisibility)
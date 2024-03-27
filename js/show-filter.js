import { filterInactiveClass, filterButtonActiveClass, filtersContainerElement, filterButtonElements } from './elements.js';

const getOnButtonClick = (onChangeFilter) => (evt) => {
  const buttonElement = evt.currentTarget;
  // проверка на активный фильтр
  if (!buttonElement.classList.contains(filterButtonActiveClass)) {
    // переместим выделение на нужную кнопку-фильтр
    filterButtonElements.forEach((element) => {
      element.classList.remove(filterButtonActiveClass);
    });
    buttonElement.classList.add(filterButtonActiveClass);
    // вызовем нужную загрузку
    onChangeFilter?.(buttonElement.id);
  }
};

const showFilter = (onChangeFilter) => {
  filtersContainerElement.classList.remove(filterInactiveClass);

  filterButtonElements.forEach(
    (element) => {
      element.addEventListener('click', getOnButtonClick(onChangeFilter));
    }
  );
};

export { showFilter };

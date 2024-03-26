import { filterInactiveClass, filterButtonActiveClass, filtersContainerElement, filterButtonElements } from './elements.js';

const applyFilter = (onApplyFilter) =>
  (evt) => {
    const buttonElement = evt.currentTarget;
    // проверка на активный фильтр
    if (!buttonElement.classList.contains(filterButtonActiveClass)) {
      // переместим выделение на нужную кнопку-фильтр
      filterButtonElements.forEach((element) => {
        element.classList.remove(filterButtonActiveClass);
      });
      buttonElement.classList.add(filterButtonActiveClass);
      // вызовем нужную загрузку
      if (onApplyFilter) {
        onApplyFilter(buttonElement.id);
      }
    }
  };

const showFilter = (onChangeFilter) => {
  filtersContainerElement.classList.remove(filterInactiveClass);

  filterButtonElements.forEach(
    (element) => {
      element.addEventListener('click', applyFilter(onChangeFilter));
    }
  );
};

export { showFilter };

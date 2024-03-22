import {
  filterInactiveClass, filterButtonActiveClass, filtersContainerElement, filtersFormElement
} from './elements.js';

const applyFilter = (evt) => {
  const buttonElement = evt.currentTarget;
  const id = buttonElement.id;
  //!!
  console.log(id);

  // переместим выделение на нужную фильтр-кнопку
  [...(filtersFormElement.children)].forEach((element) => element.classList.remove(filterButtonActiveClass));
  buttonElement.classList.add(filterButtonActiveClass);

  // вызовем нужную загрузку
};

const showFilter = () => {
  //debugger;
  filtersContainerElement.classList.remove(filterInactiveClass);
  //!!debugger;
  filtersFormElement.querySelectorAll('.img-filters__button').forEach(
    //!! filtersFormElement.querySelectorAll('.img-filters__button input[type=button]').forEach( // не выбирает
    //!! Только на кнопки -    filtersFormElement.querySelectorAll('.img-filters__button')
    (element) => element.addEventListener('click', applyFilter)
    /*
    (element) => {
      if (element) {
        element.addEventListener('click', applyFilter);
      }
    }
    */
  );
  /*
  Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:

По умолчанию — фотографии в изначальном порядке с сервера.
Случайные — 10 случайных, не повторяющихся фотографий.
Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
При переключении фильтра все фотографии,
отрисованные ранее, нужно убрать и вместо них показать те,
которые подходят под новые условия.
 */
};

export { showFilter };

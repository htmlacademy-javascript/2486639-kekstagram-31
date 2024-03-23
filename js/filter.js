import { throwError, getRandomArray } from './util/util.js';
import {
  filterInactiveClass, filterButtonActiveClass, filterButtonSelector, filterDefaultId,
  filterRandomId, filterDiscussedId, filtersContainerElement, filtersFormElement
} from './elements.js';

const filterOption = {
  'filter-default': { onAfterApplyFilter: null },
  'filter-random': { onAfterApplyFilter: null },
  'filter-discussed': { onAfterApplyFilter: null },
};

const applyFilter = (evt) => {
  const buttonElement = evt.currentTarget;
  // проверка на активный фильтр
  if (!buttonElement.classList.contains(filterButtonActiveClass)) {
    // переместим выделение на нужную фильтр-кнопку
    [...(filtersFormElement.children)].forEach((element) => element.classList.remove(filterButtonActiveClass));
    buttonElement.classList.add(filterButtonActiveClass);
    // вызовем нужную загрузку
    const onAfterApplyFilter = filterOption[buttonElement.id].onAfterApplyFilter;
    if (onAfterApplyFilter) {
      onAfterApplyFilter();
    } else {
      throwError(`Тип фильтра ${buttonElement.id} не настроен!`);
    }
  }
};

const showFilter = (onFilterDefalut, onFilterRandom, onFilterDiscussed) => {
  filterOption[filterDefaultId].onAfterApplyFilter = onFilterDefalut;
  filterOption[filterRandomId].onAfterApplyFilter = onFilterRandom;
  filterOption[filterDiscussedId].onAfterApplyFilter = onFilterDiscussed;

  //
  /*
  Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
  выкинуть нули!
   */
  // т.к. с сервера загружаеться один раз, то и обсуждаемые подготовим один раз
  /*
  const discussedPosts = posts.slice(0, 11);

  filterOption[filterDefaultId] = () => posts;
  filterOption[filterRandomId] = () => getRandomArray(posts, 10);
  filterOption[filterDiscussedId] = () => discussedPosts;
*/
  filtersContainerElement.classList.remove(filterInactiveClass);

  filtersFormElement.querySelectorAll(filterButtonSelector).forEach(
    (element) => element.addEventListener('click', applyFilter)
  );
};

export { showFilter };

import { getRandomArray, throwError } from './util/util.js';
import { filterDefaultId, filterRandomId, filterDiscussedId } from './elements.js';
import { showFilter } from './show-filter.js';
import { debounce } from './util/render-tune.js';
import { drawPictures } from './draw-pictures.js';

//const DEBOUNCE_DELAY = 500;
//!! для демонтсрации
const DEBOUNCE_DELAY = 2000;
const RANDOM_POST_COUNT = 10;

//const getRandomPosts = (posts) => getRandomArray(posts, RANDOM_POST_COUNT);
//!! для демонтсрации - фильтруются непосредственно перед отрисовкой, т.е. после задержки
const getRandomPosts = (posts) => {
  const filteredPosts = getRandomArray(posts, RANDOM_POST_COUNT);
  // eslint-disable-next-line no-console
  console.log(filteredPosts);
  return filteredPosts;
};

const getDiscussedPosts = (posts) => posts.slice().sort(
  (firstElement, secondElement) => (secondElement.comments.length - firstElement.comments.length)
);

const debounceDrawPictures =
  debounce(
    (posts, filterHandler) => {
      drawPictures(filterHandler(posts));
    },
    DEBOUNCE_DELAY);

const initFilterPosts = (posts) => {
  const filterHandlerOption = {};
  filterHandlerOption[filterDefaultId] = (value) => value;
  filterHandlerOption[filterRandomId] = getRandomPosts;
  filterHandlerOption[filterDiscussedId] = getDiscussedPosts;

  showFilter((filterId) => {
    const filterHandler = filterHandlerOption[filterId];
    if (!filterHandler) {
      throwError(`Тип фильтра ${filterId} не настроен!`);
    }

    debounceDrawPictures(posts, filterHandler);
  });
};

export { initFilterPosts };

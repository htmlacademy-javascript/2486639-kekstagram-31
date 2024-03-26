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
    (posts, onFilter) => {
      drawPictures(onFilter(posts));
    },
    DEBOUNCE_DELAY);

const initFilterPosts = (posts) => {
  const onFilterOption = {};
  onFilterOption[filterDefaultId] = (value) => value;
  onFilterOption[filterRandomId] = getRandomPosts;
  onFilterOption[filterDiscussedId] = getDiscussedPosts;

  showFilter((filterId) => {
    const onFilter = onFilterOption[filterId];
    if (!onFilter) {
      throwError(`Тип фильтра ${filterId} не настроен!`);
    }

    debounceDrawPictures(posts, onFilter);
  });
};

export { initFilterPosts };

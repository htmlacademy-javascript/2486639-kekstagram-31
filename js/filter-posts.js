import { getRandomArray } from './util/util.js';
import { filterDefaultId, filterRandomId, filterDiscussedId } from './elements.js';
import { showFilter } from './show-filter.js';
import { debounce } from './util/render-tune.js';
import { drawPictures } from './draw-pictures.js';

const DEBOUNCE_DELAY = 500;
const RANDOM_POST_COUNT = 10;

const filterHandlerOption = {};
let currentPosts = [];

const getRandomPosts = (posts) => getRandomArray(posts, RANDOM_POST_COUNT);

const getDiscussedPosts = (posts) => posts.slice().sort(
  (firstElement, secondElement) => (secondElement.comments.length - firstElement.comments.length)
);

const changeFilter = (filterId) => {
  const filterHandler = filterHandlerOption[filterId];
  if (!filterHandler) {
    throw new Error(`Тип фильтра ${filterId} не настроен!`);
  }
  drawPictures(filterHandler(currentPosts));
};

const debounceChangeFilter = debounce(changeFilter, DEBOUNCE_DELAY);

const initFilterPosts = (posts) => {
  currentPosts = posts;
  filterHandlerOption[filterDefaultId] = (value) => value;
  filterHandlerOption[filterRandomId] = getRandomPosts;
  filterHandlerOption[filterDiscussedId] = getDiscussedPosts;

  showFilter(debounceChangeFilter);
};

export { initFilterPosts };

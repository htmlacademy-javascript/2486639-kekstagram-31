import { getRandomArray } from './util/util.js';
import { showFilter } from './show-filter.js';
import { drawPictures } from './draw-pictures.js';

const RANDOM_POST_COUNT = 10;

const getRandomPosts = (posts) => getRandomArray(posts, RANDOM_POST_COUNT);

const getDiscussedPosts = (posts) => posts.slice().sort(
  (firstElement, secondElement) => (secondElement.comments.length - firstElement.comments.length)
);

const initFilter = (posts) => {
  // т.к. с сервера загружаеться один раз, то и обсуждаемые подготовим сразу
  const discussedPosts = getDiscussedPosts(posts);

  showFilter(
    () => drawPictures(posts),
    () => drawPictures(getRandomPosts(posts)),
    () => drawPictures(discussedPosts)
  );
};

export { initFilter };

import { getRandomArray } from './util/util.js';
import { showFilter } from './show-filter.js';
import { drawPictures } from './draw-pictures.js';
import { openBigPictureModal } from './view-post/index.js';

const RANDOM_POST_COUNT = 10;

const getRandomPosts = (posts) => getRandomArray(posts, RANDOM_POST_COUNT);

const getDiscussedPosts = (posts) => posts.slice().sort(
  (firstElement, secondElement) => (secondElement.comments.length - firstElement.comments.length)
);

const initFilter = (posts) => {
  // т.к. с сервера загружаеться один раз, то и обсуждаемые подготовим сразу
  const discussedPosts = getDiscussedPosts(posts);

  //!! немного передеалать чтоб функции возвращали значения .....
  showFilter(
    () => {
      drawPictures(posts, openBigPictureModal);
    },
    () => {
      drawPictures(getRandomPosts(posts), openBigPictureModal);
    },
    () => {
      drawPictures(discussedPosts, openBigPictureModal);
    }
  );
};

export { initFilter };

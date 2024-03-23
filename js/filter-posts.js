import { getRandomArray } from './util/util.js';
import { showFilter } from './show-filter.js';
import { drawPictures } from './draw-pictures.js';

const RANDOM_POST_COUNT = 10;

const getRandomPosts = (posts) => getRandomArray(posts, RANDOM_POST_COUNT);

const getDiscussedPosts = (posts) => {
  /*
  Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
  выкинуть нули!
   */
  // т.к. с сервера загружаеться один раз, то и обсуждаемые подготовим один раз
  const discussedPosts = posts.slice(0, 11);
  console.log('getDiscussedPosts');
  return discussedPosts;
};

const initFilter = (posts) => {
  // обсуждаемые определяем сразу, т.к. приходят с сервера
  const discussedPosts = getDiscussedPosts(posts);
  showFilter(
    () => drawPictures(posts),
    () => drawPictures(getRandomPosts(posts)),
    () => drawPictures(discussedPosts)
  );
};

export { initFilter };

import { drawPictures } from './draw-pictures.js';

let currentPosts;

const setPosts = (posts) => {
  currentPosts = posts;
};

const onAfterSuccessSendPost = (newPost) => {
  currentPosts.unshift(newPost);
  // нарисовать бы одну, но добавляю в начало и все картинки сдвигаються
  drawPictures(currentPosts);
};

export { setPosts, onAfterSuccessSendPost };

import { drawPictures } from './draw-pictures.js';

let currentPosts;

const setPosts = (posts) => {
  currentPosts = posts;
};

const onAfterSuccessSendPost = (newPost) => {
  currentPosts.unshift(newPost);
  drawPictures(currentPosts);
};

export { setPosts, onAfterSuccessSendPost };

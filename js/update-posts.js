import { drawPictures } from './draw-pictures.js';

let currentPosts;

const createComment = (id, avatar, message, name) => ({
  id,
  avatar,
  message,
  name
});

const createPost = (id, url = '', description = '', hashtags = '', likes = 0, comments = []) => ({
  id: (!id || (id === -1)) ? Math.max(...currentPosts.map((element) => element.id)) + 1 : id,
  url,
  description: `${description.trim()} ${hashtags.trim()}`,
  likes,
  comments
});

const onAfterSuccessSendPost = (newPost) => {
  currentPosts.unshift(newPost);
  // нарисовать бы одну, но добавляю в начало и все картинки сдвигаються
  drawPictures(currentPosts);
};

const setPosts = (posts) => {
  currentPosts = posts;
};

export { setPosts, onAfterSuccessSendPost, createPost, createComment };

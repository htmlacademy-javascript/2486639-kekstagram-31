import { loadComments, clearComments } from './view-post-comments.js';

const bigPicturePreviewElement = document.querySelector('.big-picture__preview');
const imageElement = bigPicturePreviewElement.querySelector('.big-picture__img').querySelector('img');
const socialElement = bigPicturePreviewElement.querySelector('.big-picture__social');
const likesCountElement = socialElement.querySelector('.likes-count');
const commentShowCountElement = socialElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = socialElement.querySelector('.social__comment-total-count');
const captionElement = socialElement.querySelector('.social__caption');

const loadPost = ({ url, description, likes, comments }, commentsCount) => {
  imageElement.src = url;
  imageElement.alt = description;
  likesCountElement.textContent = likes;
  commentShowCountElement.textContent = commentsCount;
  commentTotalCountElement.textContent = comments.length;
  loadComments(comments, commentsCount);
  captionElement.textContent = description;
};

const clearPost = () => {
  imageElement.src = '';
  imageElement.alt = '';
  likesCountElement.textContent = '';
  commentShowCountElement.textContent = '';
  commentTotalCountElement.textContent = '';
  clearComments();
  captionElement.textContent = '';
};

export { clearPost, loadPost };

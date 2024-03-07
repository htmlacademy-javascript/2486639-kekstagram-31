import { fillCommentsData, clearCommentsData } from './view-post-comments-data';

const bigPicturePreviewElement = document.querySelector('.big-picture__preview');
const imageElement = bigPicturePreviewElement.querySelector('.big-picture__img').querySelector('img');
const socialElement = bigPicturePreviewElement.querySelector('.big-picture__social');
const likesCountElement = socialElement.querySelector('.likes-count');
const commentShowCountElement = socialElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = socialElement.querySelector('.social__comment-total-count');
const captionElement = socialElement.querySelector('.social__caption');

const fillPostData = (post, commentsCount) => {
  imageElement.src = post.url;
  imageElement.alt = post.description;
  likesCountElement.textContent = post.likes;
  commentShowCountElement.textContent = commentsCount;
  commentTotalCountElement.textContent = post.comments.length;
  fillCommentsData(post.comments, commentsCount);
  captionElement.textContent = post.description;
};

const clearPostData = () => {
  imageElement.src = '';
  imageElement.alt = '';
  likesCountElement.textContent = '';
  commentShowCountElement.textContent = '';
  commentTotalCountElement.textContent = '';
  clearCommentsData();
  captionElement.textContent = '';
};

export { clearPostData, fillPostData };

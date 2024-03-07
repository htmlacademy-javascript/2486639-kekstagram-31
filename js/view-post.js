import { loadComments, clearComments } from './view-post-comments.js';

const CommentsCount = {
  ON_START: 30,
  LOAD_MORE: 5,
};

const bigPicturePreviewElement = document.querySelector('.big-picture__preview');
const imageElement = bigPicturePreviewElement.querySelector('.big-picture__img').querySelector('img');
const socialElement = bigPicturePreviewElement.querySelector('.big-picture__social');
const likesCountElement = socialElement.querySelector('.likes-count');
const commentShowCountElement = socialElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = socialElement.querySelector('.social__comment-total-count');
const captionElement = socialElement.querySelector('.social__caption');
const commentsLoaderElement = document.querySelector('.comments-loader');

//let currentComments;

const onCommentsLoader = (/*evt*/) => {
  //console.log(currentComments);
};

const loadPost = ({ url, description, likes, comments }) => {
  //currentComments = comments;
  imageElement.src = url;
  imageElement.alt = description;
  likesCountElement.textContent = likes;
  commentTotalCountElement.textContent = comments.length;
  captionElement.textContent = description;

  const commentsStartCount = (CommentsCount.ON_START > comments.length) ? comments.length : CommentsCount.ON_START;
  commentShowCountElement.textContent = commentsStartCount;
  loadComments(comments, commentsStartCount);

  if ((commentsStartCount >= 0) && (commentsStartCount < comments.length)) {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', onCommentsLoader);
  } else {
    if (!commentsLoaderElement.classList.contains('hidden')) {
      commentsLoaderElement.classList.add('hidden');
    }
  }
};

const clearPost = () => {
  imageElement.src = '';
  imageElement.alt = '';
  likesCountElement.textContent = '';
  commentShowCountElement.textContent = '';
  commentTotalCountElement.textContent = '';
  captionElement.textContent = '';

  clearComments();

  if (!commentsLoaderElement.classList.contains('hidden')) {
    commentsLoaderElement.classList.add('hidden');
    commentsLoaderElement.removeEventListener('click', onCommentsLoader);
  }
};

export { clearPost, loadPost };

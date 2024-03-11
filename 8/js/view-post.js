import { isEscapeKey } from './util.js';
import { drawPost, clearPost, commentShowCountElement } from './draw-post.js';
import { initDrawPostComments, clearPostComments, drawPostComments } from './draw-post-comments.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5,
};

const bigPictureElement = document.querySelector('.big-picture');
const closePictureElement = document.querySelector('.big-picture__cancel');
const commentsLoaderElement = document.querySelector('.comments-loader');

let comments;
let commentsShowCount;

const closePostModal = () => {
  comments = null;
  commentsShowCount = 0;

  clearPost();
  clearPostComments();

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
};

const updateVisibleCommentsLoaderElement = () => {
  if ((commentsShowCount === 0) || (commentsShowCount === comments.length)) {
    // ? т.к. обеденил вызовы, то нужно проверять - commentsLoaderElement.classList.contains('hidden') ?
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const drawComments = (newShowCommentsCount) => {
  commentsShowCount = Math.min(newShowCommentsCount, comments.length);
  drawPostComments(comments, commentsShowCount, commentShowCountElement);
  updateVisibleCommentsLoaderElement();
};

const initViewPost = () => {
  clearPost();
  initDrawPostComments();

  closePictureElement.addEventListener('click', closePostModal);

  commentsLoaderElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    drawComments(commentsShowCount + CommentsCount.LOAD_MORE);
  });
};

const openPostModal = (post) => {
  comments = post.comments;
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);

  drawPost(post);
  drawComments(CommentsCount.ON_START);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePostModal();
  }
}

export { initViewPost, openPostModal };

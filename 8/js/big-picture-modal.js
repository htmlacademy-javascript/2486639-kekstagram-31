import { isEscapeKey } from './util/util.js';
import { drawBigPicture, clearBigPicture, commentShowCountElement } from './draw-big-picture.js';
import { initDrawBigPictureComments, clearBigPictureComments, drawBigPictureComments } from './draw-big-picture-comments.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5,
};

const bigPictureElement = document.querySelector('.big-picture');
const closePictureElement = document.querySelector('.big-picture__cancel');
const commentsLoaderElement = document.querySelector('.comments-loader');

let comments;
let commentsShowCount;

const closeModal = () => {
  comments = null;
  commentsShowCount = 0;

  clearBigPicture();
  clearBigPictureComments();

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
  drawBigPictureComments(comments, commentsShowCount, commentShowCountElement);
  updateVisibleCommentsLoaderElement();
};

const init = () => {
  clearBigPicture();
  initDrawBigPictureComments();

  closePictureElement.addEventListener('click', closeModal);

  commentsLoaderElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    drawComments(commentsShowCount + CommentsCount.LOAD_MORE);
  });
};

const openModal = (post) => {
  comments = post.comments;
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);

  drawBigPicture(post);
  drawComments(CommentsCount.ON_START);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

export { init as initBigPictureModal, openModal as openBigPictureModal };

import { updateClassList } from './util/dom.js';
import { openBasicModal } from './basic-modal.js';
import { drawBigPicture, clearBigPicture } from './draw-big-picture.js';
import { initDrawComments, clearComments, drawStartComments, drawMoreComments, isAllCommentsShow } from './draw-big-picture-comments.js';

const bigPictureElement = document.querySelector('.big-picture');
const closePictureElement = document.querySelector('.big-picture__cancel');
const commentsLoaderElement = document.querySelector('.comments-loader');

const closeBigPictureModal = () => {
  clearBigPicture();
  clearComments();
};

const updateCommentsLoaderVisible = () => updateClassList(commentsLoaderElement, 'hidden', isAllCommentsShow());

const initBigPictureModal = () => {
  clearBigPicture();
  initDrawComments();

  commentsLoaderElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    drawMoreComments();
    updateCommentsLoaderVisible();
  });
};

const openBigPictureModal = (post) => {
  openBasicModal(bigPictureElement, closePictureElement, closeBigPictureModal);

  drawBigPicture(post);
  drawStartComments(post.comments);
  updateCommentsLoaderVisible();
};

export { initBigPictureModal, openBigPictureModal };

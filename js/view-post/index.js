import { updateClassList } from './../util/dom.js';
import { openBasicModal } from './../basic-modal.js';
import { bigPictureElement, closePictureElement, commentsLoaderElement } from './elements.js';
import { initDrawBigPicture, drawBigPicture, clearBigPicture, drawMoreBigPictureComments, isAllBigPictureCommentsShow } from './big-picture.js';

const closeBigPictureModal = () => {
  clearBigPicture();
};

const updateCommentsLoaderVisible = () => updateClassList(commentsLoaderElement, 'hidden', isAllBigPictureCommentsShow());

const initBigPictureModal = () => {
  initDrawBigPicture();

  commentsLoaderElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    drawMoreBigPictureComments();
    updateCommentsLoaderVisible();
  });
};

const openBigPictureModal = (post) => {
  openBasicModal(bigPictureElement, closePictureElement, closeBigPictureModal);

  drawBigPicture(post);
  updateCommentsLoaderVisible();
};

export { initBigPictureModal, openBigPictureModal };

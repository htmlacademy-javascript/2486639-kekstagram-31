import { updateClassList } from './../util/dom.js';
import { openBasicModal } from './../basic-modal.js';
import { bigPictureElement, closePictureElement, commentCountElement, commentsLoaderElement } from './elements.js';
import { initDrawBigPicture, drawBigPicture, clearBigPicture, drawMoreBigPictureComments, isAllBigPictureCommentsShow } from './big-picture.js';

const updateCommentsLoaderVisible = () => {
  const isAllCommentsShow = isAllBigPictureCommentsShow();
  // Скроем надпись и ссылку, т.к. все комментарии загружены
  updateClassList(commentCountElement, 'hidden', isAllCommentsShow);
  updateClassList(commentsLoaderElement, 'hidden', isAllCommentsShow);
};

const initBigPictureModal = () => {
  initDrawBigPicture();

  commentsLoaderElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    drawMoreBigPictureComments();
    updateCommentsLoaderVisible();
  });
};

const openBigPictureModal = (post) => {
  openBasicModal(bigPictureElement, closePictureElement, clearBigPicture);

  drawBigPicture(post);
  updateCommentsLoaderVisible();
};

export { initBigPictureModal, openBigPictureModal };

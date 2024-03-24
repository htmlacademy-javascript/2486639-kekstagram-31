import { updateClassList } from './../util/dom.js';
import { openBasicModal } from './../basic-modal.js';
import { hiddenClass } from './../elements.js';
import { bigPictureElement, closePictureElement, commentCountElement, commentsLoaderElement } from './elements.js';
import { initDrawBigPicture, drawBigPicture, clearBigPicture, drawMoreBigPictureComments, isAllBigPictureCommentsShow } from './big-picture.js';

const updateCommentsLoaderVisible = () => {
  const isAllCommentsShow = isAllBigPictureCommentsShow();
  // Скроем надпись и ссылку, т.к. все комментарии загружены
  updateClassList(commentCountElement, hiddenClass, isAllCommentsShow);
  updateClassList(commentsLoaderElement, hiddenClass, isAllCommentsShow);
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

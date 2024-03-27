import { updateClassList } from './../util/dom.js';
import { openBasicModal } from './../basic-modal.js';
import { hiddenClass } from './../elements.js';
import {
  bigPictureElement, closePictureElement, commentCountElement,
  likesCountElement, commentsLoaderElement
} from './elements.js';
import {
  drawBigPicture, clearBigPicture, updateLikesCount,
  drawMoreBigPictureComments, isAllBigPictureCommentsShow
} from './big-picture.js';

const updateCommentsLoaderVisible = () => {
  const isAllCommentsShow = isAllBigPictureCommentsShow();
  // Скроем надпись и ссылку, т.к. все комментарии загружены
  updateClassList(commentCountElement, hiddenClass, isAllCommentsShow);
  updateClassList(commentsLoaderElement, hiddenClass, isAllCommentsShow);
};

const onCommentsLoaderElementClick = (evt) => {
  evt.preventDefault();
  drawMoreBigPictureComments();
  updateCommentsLoaderVisible();
};

const onLikesCountElementClick = (evt) => {
  evt.preventDefault();
  updateLikesCount();
};

const initBigPictureModal = () => {
  clearBigPicture();
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
  likesCountElement.addEventListener('click', onLikesCountElementClick);
};

const openBigPictureModal = (post) => {
  openBasicModal(bigPictureElement, closePictureElement, clearBigPicture);
  drawBigPicture(post);
  updateCommentsLoaderVisible();
};

export { initBigPictureModal, openBigPictureModal };

import { isEnterKey, stopPropagationIfEscapeKey, elementScrollAtBottom } from '../util/util.js';
import { createComment } from '../update-posts.js';
import {
  bigPictureElement, closePictureElement, likesCountElement,
  commentsLoaderElement, footerTextElement, footerButtonElement
} from './elements.js';
import { openBasicModal } from './../basic-modal.js';
import { drawBigPicture, clearBigPicture, updateLikesCount } from './big-picture.js';
import { drawFirstComments, drawMoreComments, clearComments, drawNewComment } from './comments.js';

const SCROLL_AT_BOTTOM_DELAY = 4000;
let scrollTimeout;

const loadMoreComments = () => {
  if (document.activeElement !== footerTextElement) {
    drawMoreComments();
  }
};

const addComment = () => {
  const message = footerTextElement.value.trim();
  if (message) {
    footerTextElement.value = '';
    const comment = createComment(0, 'img/avatar-1.svg', message, 'Гость');
    drawNewComment(comment);
    bigPictureElement.scrollTo(scrollX, bigPictureElement.scrollHeight);
    //!! обновить информацию в миниатюре...
  }
};

const onBigPictureElementScroll = (evt) => {
  clearTimeout(scrollTimeout);
  if (elementScrollAtBottom(evt.target)) {
    scrollTimeout = setTimeout(loadMoreComments, SCROLL_AT_BOTTOM_DELAY);
  }
};

const onLikesCountElementClick = (evt) => {
  evt.preventDefault();
  updateLikesCount();
};

const onCommentsLoaderElementClick = (evt) => {
  evt.preventDefault();
  loadMoreComments();
};

const onFooterTextElementKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    addComment();
  } else {
    stopPropagationIfEscapeKey(evt);
  }
};

const onFooterButtonElementClick = (evt) => {
  evt.preventDefault();
  addComment();
};

const afterCloseModal = () => {
  clearBigPicture();
  clearComments();
};


const openBigPictureModal = (post) => {
  openBasicModal(bigPictureElement, closePictureElement, afterCloseModal);
  drawBigPicture(post);
  drawFirstComments(post.comments);
};

const initBigPictureModal = () => {
  clearBigPicture();
  clearComments();
  bigPictureElement.addEventListener('scroll', onBigPictureElementScroll);
  likesCountElement.addEventListener('click', onLikesCountElementClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
  footerTextElement.addEventListener('keydown', onFooterTextElementKeydown);
  footerButtonElement.addEventListener('click', onFooterButtonElementClick);
};

export { initBigPictureModal, openBigPictureModal };

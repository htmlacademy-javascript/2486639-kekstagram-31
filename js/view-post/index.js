import { isEscapeKey, isEnterKey } from './../util/util.js';
import { updateClassList } from './../util/dom.js';
import { openBasicModal } from './../basic-modal.js';
import { hiddenClass } from './../elements.js';
import {
  bigPictureElement, closePictureElement, commentCountElement, likesCountElement,
  commentsLoaderElement, footerTextElement, footerButtonElement
} from './elements.js';
import {
  drawBigPicture, clearBigPicture, drawMoreComments,
  drawNewComment, updateLikesCount, isAllCommentsShown
} from './big-picture.js';

const SCROLL_ON_DOWN_DELAY = 4000;

let scrollTimeout;

const updateCommentsLoaderVisible = () => {
  const isAllCommentsShow = isAllCommentsShown();
  // Скроем надпись и ссылку, т.к. все комментарии загружены
  updateClassList(commentCountElement, hiddenClass, isAllCommentsShow);
  updateClassList(commentsLoaderElement, hiddenClass, isAllCommentsShow);
};

const loadMoreComments = () => {
  if (document.activeElement !== footerTextElement) {
    drawMoreComments();
    updateCommentsLoaderVisible();
  }
};

const addComment = () => {
  const message = footerTextElement.value.trim();
  if (message) {
    const comment = {
      id: 0,
      avatar: 'img/avatar-1.svg',
      message: message,
      name: 'Гость'
    };

    footerTextElement.value = '';
    drawNewComment(comment);
  }
};

const onBigPictureElementScroll = (evt) => {
  const offsetHeight = evt.target.offsetHeight;
  const scrollHeight = evt.target.scrollHeight;
  const scrollTop = evt.target.scrollTop;
  const offsetTotal = scrollTop + offsetHeight;

  clearTimeout(scrollTimeout);
  if (offsetTotal === scrollHeight) {
    scrollTimeout = setTimeout(loadMoreComments, SCROLL_ON_DOWN_DELAY);
  }
};

const onCommentsLoaderElementClick = (evt) => {
  evt.preventDefault();
  loadMoreComments();
};

const onLikesCountElementClick = (evt) => {
  evt.preventDefault();
  updateLikesCount();
};

const onFooterTextElementKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    addComment();
  } else if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onFooterButtonElementClick = (evt) => {
  evt.preventDefault();
  addComment();
};

const initBigPictureModal = () => {
  clearBigPicture();
  bigPictureElement.addEventListener('scroll', onBigPictureElementScroll);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
  likesCountElement.addEventListener('click', onLikesCountElementClick);
  footerTextElement.addEventListener('keydown', onFooterTextElementKeydown);
  footerButtonElement.addEventListener('click', onFooterButtonElementClick);
};

const openBigPictureModal = (post) => {
  openBasicModal(bigPictureElement, closePictureElement, clearBigPicture);
  drawBigPicture(post);
  updateCommentsLoaderVisible();
};

export { initBigPictureModal, openBigPictureModal };

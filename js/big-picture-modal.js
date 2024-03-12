import { isEscapeKey } from './util/util.js';
import { updateClassList } from './util/dom.js';
import { drawBigPicture, clearBigPicture } from './draw-big-picture.js';
import { initDrawBigPictureComments, clearBigPictureComments, drawComments, drawMoreComments, isAllcommentsShow } from './draw-big-picture-comments.js';

const bigPictureElement = document.querySelector('.big-picture');
const closePictureElement = document.querySelector('.big-picture__cancel');
const commentsLoaderElement = document.querySelector('.comments-loader');

const closeModal = () => {
  bigPictureElement.scrollTo(scrollX, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscapeKeydown);

  clearBigPicture();
  clearBigPictureComments();
};

const updateVisibleCommentsLoaderElement = () => updateClassList(commentsLoaderElement, isAllcommentsShow(), 'hidden');

const initBigPictureModal = () => {
  clearBigPicture();
  initDrawBigPictureComments();

  closePictureElement.addEventListener('click', closeModal);

  commentsLoaderElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    drawMoreComments();
    updateVisibleCommentsLoaderElement();
  });
};

const openBigPictureModal = (post) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);

  drawBigPicture(post);
  drawComments(post.comments);
  updateVisibleCommentsLoaderElement();
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

export { initBigPictureModal, openBigPictureModal };

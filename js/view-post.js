import { isEscapeKey } from './util.js';
import { fillPostData, clearPostData } from './view-post-data.js';
import { getPostById } from './posts.js';

const picturesSectionElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const closePictureElement = document.querySelector('.big-picture__cancel');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

let closePostModal = () => { }; // обход правила eslint - 'closePostModal' was used before it was defined.eslintno-use-before-define

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePostModal();
  }
};

const openPostModal = (element) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  fillPostData(getPostById(element.id));

  document.addEventListener('keydown', onDocumentKeydown);
};

/*const*/ closePostModal = () => { // обход правила eslint - 'closePostModal' was used before it was defined.eslintno-use-before-define
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  clearPostData();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onPicturesSectionClick = (evt) => {
  if ((evt.target.nodeName === 'IMG') && (evt.target.className === 'picture__img')) {
    evt.preventDefault(); // т.к. картинка обернута в ссылку и страница скролится вверх
    openPostModal(evt.target.parentElement);
  }
};

picturesSectionElement.addEventListener('click', onPicturesSectionClick);
closePictureElement.addEventListener('click', closePostModal);

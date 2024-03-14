import { createFragment, getTemplateElement } from './util/dom.js';

const picturesContainerElement = document.querySelector('.pictures');
const picturesTitleElement = picturesContainerElement.querySelector('.pictures__title');
const picturesImgUploadElement = picturesContainerElement.querySelector('.img-upload');

const pictureTemplateElement = getTemplateElement('picture');

let cbOpenBigPictureModal = null;

const createElement = (post) => {
  const { url, description, likes, comments } = post;
  const newElement = pictureTemplateElement.cloneNode(true);
  const pictureImageElement = newElement.querySelector('.picture__img');
  pictureImageElement.src = url;
  pictureImageElement.alt = description;

  newElement.querySelector('.picture__likes').textContent = likes;
  newElement.querySelector('.picture__comments').textContent = comments.length;

  if (cbOpenBigPictureModal) {
    newElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.currentTarget.blur(); // Баг - не скрываеться элемент '.picture__info'
      cbOpenBigPictureModal(post);
    });
  }

  return newElement;
};

const drawPictures = (posts, openBigPictureModal) => {
  cbOpenBigPictureModal = openBigPictureModal;

  picturesContainerElement.replaceChildren(picturesTitleElement, picturesImgUploadElement, createFragment(posts, createElement));
};

export { drawPictures };

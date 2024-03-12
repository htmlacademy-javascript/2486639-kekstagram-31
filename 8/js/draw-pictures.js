import { createFragment, getTemplate, /*1. removeChilds*/ } from './util/dom.js';

const picturesContainer = document.querySelector('.pictures');
//2. ? draw - picturesContainer.replaceChildren
const picturesTitleElement = picturesContainer.querySelector('.pictures__title');
const picturesImgUploadElement = picturesContainer.querySelector('.img-upload');

const pictureTemplate = getTemplate('picture');

let cbOpenBigPictureModal = null;

const createElement = (post) => {
  const { url, description, likes, comments } = post;
  const newElement = pictureTemplate.cloneNode(true);
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

  //1. ?
  //removeChilds(picturesContainer, 'picture');
  //picturesContainer.append(createFragment(posts, createElement));

  //2. опираться на текущую разментку? хотел уменьшить количество отрисовок при childs.forEach((element) => element.remove()) или разницы нет?
  picturesContainer.replaceChildren(picturesTitleElement, picturesImgUploadElement, createFragment(posts, createElement));
};

export { drawPictures };

import { createFragment, getTemplateElement, /*1. removeChilds*/ } from './util/dom.js';

const picturesContainerElement = document.querySelector('.pictures');
//2. ? draw - picturesContainerElement.replaceChildren
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

  //1. ?
  //removeChilds(picturesContainerElement, 'picture');
  //picturesContainerElement.append(createFragment(posts, createElement));

  //2. опираться на текущую разментку? хотел уменьшить количество отрисовок при childs.forEach((element) => element.remove()) или разницы нет?
  picturesContainerElement.replaceChildren(picturesTitleElement, picturesImgUploadElement, createFragment(posts, createElement));
};

export { drawPictures };

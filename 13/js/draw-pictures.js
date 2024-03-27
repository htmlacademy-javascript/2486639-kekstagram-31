import { createFragment } from './util/dom.js';
import {
  pictureSelectorList, pictureTemplateElement, picturesContainerElement,
  picturesTitleElement, picturesImgUploadElement
} from './elements.js';

let onPictureClick;

const createElement = (post) => {
  const { url, description, likes, comments } = post;
  const newElement = pictureTemplateElement.cloneNode(true);
  const pictureImageElement = newElement.querySelector(pictureSelectorList.image);
  pictureImageElement.src = url;
  pictureImageElement.alt = description;

  newElement.querySelector(pictureSelectorList.likes).textContent = likes;
  newElement.querySelector(pictureSelectorList.comments).textContent = comments.length;

  const onNewElementClick = (evt) => {
    evt.preventDefault();
    evt.currentTarget.blur(); // Баг - не скрываеться элемент '.picture__info'
    if (onPictureClick) {
      onPictureClick(post);
    }
  };
  newElement.addEventListener('click', onNewElementClick);

  return newElement;
};

const initDrawPictures = (openBigPictureModal) => {
  onPictureClick = openBigPictureModal;
};

const drawPictures = (posts) => {
  const fragment = createFragment(posts, createElement);
  picturesContainerElement.replaceChildren(picturesTitleElement, picturesImgUploadElement, fragment);
};

export { initDrawPictures, drawPictures };

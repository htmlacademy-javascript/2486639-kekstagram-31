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

  newElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    evt.currentTarget.blur(); // Баг - не скрываеться элемент '.picture__info'
    if (onPictureClick) {
      onPictureClick(post);
    }
  });

  return newElement;
};

const drawPictures = (posts, openBigPictureModal) => {
  onPictureClick = openBigPictureModal;
  const fragment = createFragment(posts, createElement);
  picturesContainerElement.replaceChildren(picturesTitleElement, picturesImgUploadElement, fragment);
};

export { drawPictures };

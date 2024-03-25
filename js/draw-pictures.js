import { createFragment } from './util/dom.js';
import { addDot } from './util/util.js';
import {
  pictureImageClass, pictureLikesClass, pictureCommentsClass, pictureTemplateElement,
  picturesContainerElement, picturesTitleElement, picturesImgUploadElement
} from './elements.js';

let onPictureClick;

const createElement = (post) => {
  const { url, description, likes, comments } = post;
  const newElement = pictureTemplateElement.cloneNode(true);
  const pictureImageElement = newElement.querySelector(addDot(pictureImageClass));
  pictureImageElement.src = url;
  pictureImageElement.alt = description;

  newElement.querySelector(addDot(pictureLikesClass)).textContent = likes;
  newElement.querySelector(addDot(pictureCommentsClass)).textContent = comments.length;

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

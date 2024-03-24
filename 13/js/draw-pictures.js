import { createFragment } from './util/dom.js';
import { addDot } from './util/util.js';
import {
  pictureImageClass, pictureLikesClass, pictureCommentsClass, pictureTemplateElement,
  picturesContainerElement, picturesTitleElement, picturesImgUploadElement
} from './elements.js';
import { openBigPictureModal } from './view-post/index.js';

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
    openBigPictureModal(post);
  });

  return newElement;
};

const drawPictures = (posts) =>
  picturesContainerElement.replaceChildren(picturesTitleElement, picturesImgUploadElement, createFragment(posts, createElement));

export { drawPictures };

import { createFragment, removeChilds } from './util/dom.js';
import { pictureSelector, pictureChildsSelector, pictureTemplateElement, picturesContainerElement } from './elements.js';

let pictureClick;

const createPictureElement = (post) => {
  const { url, description, likes, comments } = post;
  const { image: imageSelector, likes: likesSelector, comments: commentsSelector } = pictureChildsSelector;
  const newElement = pictureTemplateElement.cloneNode(true);
  const pictureImageElement = newElement.querySelector(imageSelector);
  pictureImageElement.src = url;
  pictureImageElement.alt = description;

  newElement.querySelector(likesSelector).textContent = likes;
  newElement.querySelector(commentsSelector).textContent = comments.length;

  const onNewElementClick = (evt) => {
    evt.preventDefault();
    evt.currentTarget.blur(); // Баг - не скрываеться элемент '.picture__info'
    pictureClick?.(post);
  };
  newElement.addEventListener('click', onNewElementClick);

  return newElement;
};

const initDrawPictures = (onPictureClick) => {
  pictureClick = onPictureClick;
};

const drawPictures = (posts) => {
  const fragment = createFragment(posts, createPictureElement);
  //!! Ошибки при автотесте: пока тестирует форму публкации, то происходит получение данных и отрисовка постов,
  // а при замене элементов использовалась picturesContainerElement.replaceChildren(picturesTitleElement, picturesImgUploadElement, fragment)
  // элементы формы теряються и автотест выдает ошибку
  // Удаляем только картинки по классу
  removeChilds(picturesContainerElement, pictureSelector);
  picturesContainerElement.append(fragment);
};

export { initDrawPictures, drawPictures };

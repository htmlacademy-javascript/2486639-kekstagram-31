import { getTemplateElement } from './util/dom.js';

const hiddenClass = 'hidden';
const modalOpenClass = 'modal-open';
const pictureImageClass = 'picture__img';
const pictureLikesClass = 'picture__likes';
const pictureCommentsClass = 'picture__comments';
const pictureTemplateId = 'picture';
const picturesContainerElement = document.querySelector('.pictures');
const picturesTitleElement = picturesContainerElement.querySelector('.pictures__title');
const picturesImgUploadElement = picturesContainerElement.querySelector('.img-upload');
const pictureTemplateElement = getTemplateElement('picture');
const errorTemplateElement = getTemplateElement('data-error');

export {
  hiddenClass,
  modalOpenClass,
  pictureImageClass,
  pictureLikesClass,
  pictureCommentsClass,
  pictureTemplateId,
  picturesContainerElement,
  picturesTitleElement,
  picturesImgUploadElement,
  pictureTemplateElement,
  errorTemplateElement,
};

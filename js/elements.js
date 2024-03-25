import { getTemplateElement } from './util/dom.js';

const hiddenClass = 'hidden';
const modalOpenClass = 'modal-open';
const filterInactiveClass = 'img-filters--inactive';
const filterButtonActiveClass = 'img-filters__button--active';
const pictureSelectorList = {
  image: '.picture__img',
  likes: '.picture__likes',
  comments: '.picture__comments'
};
const filterButtonSelector = 'button.img-filters__button';
const filterDefaultId = 'filter-default';
const filterRandomId = 'filter-random';
const filterDiscussedId = 'filter-discussed';
const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement = filtersContainerElement.querySelector('.img-filters__form');
const picturesContainerElement = document.querySelector('.pictures');
const picturesTitleElement = picturesContainerElement.querySelector('.pictures__title');
const picturesImgUploadElement = picturesContainerElement.querySelector('.img-upload');
const pictureTemplateElement = getTemplateElement('#picture');
const errorTemplateElement = getTemplateElement('#data-error');

export {
  hiddenClass,
  modalOpenClass,
  filterInactiveClass,
  filterButtonActiveClass,
  pictureSelectorList,
  filterButtonSelector,
  filterDefaultId,
  filterRandomId,
  filterDiscussedId,
  filtersContainerElement,
  filtersFormElement,
  picturesContainerElement,
  picturesTitleElement,
  picturesImgUploadElement,
  pictureTemplateElement,
  errorTemplateElement
};

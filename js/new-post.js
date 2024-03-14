import { disableElement } from './util/dom.js';
import { initBasicModal } from './basic-modal.js';

const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadSubmitElement = document.querySelector('.img-upload__submit');
const imageUploadOverlayElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const imageUploadIntupElement = imageUploadFormElement.querySelector('.img-upload__input');
const imageUploadCancelElement = imageUploadFormElement.querySelector('.img-upload__cancel');
const textHashtagsElement = imageUploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = imageUploadFormElement.querySelector('.text__description');

const extraCheckEscapeKeydown = (evt) => (evt.target !== textHashtagsElement) && (evt.target !== textDescriptionElement);

const closeNewPostModal = () => {
  imageUploadIntupElement.value = '';
  textHashtagsElement.value = '';
  textDescriptionElement.value = '';
};

const openNewPostModal = () => {
  initBasicModal(imageUploadOverlayElement, imageUploadCancelElement, closeNewPostModal, extraCheckEscapeKeydown);

  imageUploadSubmitElement.disabled = false;

  const pristine = new Pristine(
    imageUploadFormElement,
    {
      classTo: 'form__item',
      errorClass: 'form__item--invalid',
      successClass: 'form__item--valid',
      errorTextParent: 'form__item',
      errorTextTag: 'span',
      errorTextClass: 'form__error'
    },
    true);

  console.log(pristine);

  //!! imageUploadIntupElement.value
  //console.log(imageUploadIntupElement.value);
};

const initNewPost = () => {
  imageUploadIntupElement.addEventListener('change', openNewPostModal);
  imageUploadSubmitElement.addEventListener('click', disableElement);

  //!!
  openNewPostModal();
};


export { initNewPost };

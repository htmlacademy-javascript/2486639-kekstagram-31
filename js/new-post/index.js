import { isEscapeKey } from './../util/util.js';
import { openBasicModal, closeBasicModal } from './../basic-modal.js';
import {
  uploadImageFormElement, uploadSubmitElement, imageUploadOverlayElement, imageUploadInputElement,
  imageUploadCancelElement, hashtagsInputElement, descriptionInputElement
} from './elements.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidateNewPost, resetValidateNewPost, isNewPostFromValid } from './validate.js';
import { sendPost } from './../api.js';
import { showSuccess } from './show-success.js';

const enableSubmitButton = () => (uploadSubmitElement.disabled = false);
const disablekSubmitButton = () => (uploadSubmitElement.disabled = true);

const closeNewPostModal = (_, exitByEscapeKey) => {
  if (exitByEscapeKey) {
    uploadImageFormElement.reset();
  }
};

const openNewPostModal = () => {
  openBasicModal(
    imageUploadOverlayElement,
    imageUploadCancelElement,
    closeNewPostModal
  );

  // подставить загруженное изображение
  //!! imageUploadInputElement.value
  //console.log(imageUploadInputElement.value);
};

const onElementEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onSuccessSendPost = (data) => {
  //!!
  console.log(data);
  uploadImageFormElement.reset();
  closeBasicModal();
  showSuccess();
};
const onErrorSendPost = (err) => {
  console.log(err);
};

const initNewPost = () => {
  imageUploadInputElement.addEventListener('change', openNewPostModal);
  hashtagsInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  descriptionInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  uploadImageFormElement.addEventListener('reset', () => {
    resetScale();
    resetEffect();
    resetValidateNewPost(); // сброс валидации
    enableSubmitButton();
  });
  uploadImageFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isNewPostFromValid()) {
      disablekSubmitButton();
      //!! ?? нужно ли тримить коментарий и хештеги при отправке? и при провеке коментария на длинну?
      sendPost(onSuccessSendPost, onErrorSendPost, new FormData(evt.target));
    }
  });

  initScale();
  initEffect();
  initValidateNewPost();
};

export { initNewPost };

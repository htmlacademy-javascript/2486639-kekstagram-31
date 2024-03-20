import { isEscapeKey } from './../util/util.js';
import { openBasicModal } from './../basic-modal.js';
import {
  uploadImageFormElement, uploadSubmitElement, imageUploadOverlayElement, imageUploadInputElement,
  imageUploadCancelElement, hashtagsInputElement, descriptionInputElement
} from './elements.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidateNewPost, resetValidateNewPost, validateNewPostFrom } from './validate.js';

const closeNewPostModal = (_, exitByEscapeKey) => {
  if (exitByEscapeKey) {
    //!! когда закрыто по Escape, то поля не очищены, есть вариант проверить сброшена ли форма, что бы по кнопке закрытия два раза не запускать?
    //!! пока добавил дополнительный параметр exitByEscapeKey
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

const initNewPost = () => {
  imageUploadInputElement.addEventListener('change', openNewPostModal);
  hashtagsInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  descriptionInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  uploadImageFormElement.addEventListener('reset', () => {
    resetScale();
    resetEffect();
    resetValidateNewPost(); // сброс валидации
  });
  uploadImageFormElement.addEventListener('submit', (evt) => {
    if (validateNewPostFrom()) {
      uploadSubmitElement.disabled = true;
      //!! нужно ли тримить коментарий и хештеги при отправке?
    } else {
      evt.preventDefault();
    }
  });
  //!! как нужно обработать Enter? и на какой элемент добавить листенер?

  initScale();
  initEffect();
  initValidateNewPost();
};

export { initNewPost };

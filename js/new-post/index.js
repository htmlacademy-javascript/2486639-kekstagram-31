import { isEscapeKey } from './../util/util.js';
import {
  uploadImageFormElement, uploadSubmitElement, imageUploadOverlayElement, imageUploadInputElement,
  imageUploadCancelElement, hashtagsInputElement, descriptionInputElement
} from './elements.js';
import { openBasicModal, closeBasicModal, enableEscapeKeydownBasicModal, disableEscapeKeydownBasicModal } from './../basic-modal.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidate, resetValidate, checkValidate } from './validate.js';
import { sendPost } from './../api.js';
import { showSuccessMessage, showErrorMessage } from './show-message.js';

const enableSubmitButton = () => {
  uploadSubmitElement.disabled = false;
};

const disableSubmitButton = () => {
  uploadSubmitElement.disabled = true;
};

const closeNewPostModal = (_, exitByEscapeKey) => {
  if (exitByEscapeKey) {
    uploadImageFormElement.reset();
  }
};

const onElementEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const initNewPostModal = () => {
  imageUploadInputElement.addEventListener('change', () => {
    openBasicModal(imageUploadOverlayElement, imageUploadCancelElement, closeNewPostModal);
  });
  hashtagsInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  descriptionInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  uploadImageFormElement.addEventListener('reset', () => {
    resetScale();
    resetEffect();
    resetValidate();
    enableSubmitButton();
  });
  uploadImageFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (checkValidate()) {
      disableSubmitButton();
      try {
        await sendPost(new FormData(evt.target));
        uploadImageFormElement.reset();
        closeBasicModal();
        showSuccessMessage();
      } catch {
        //Если авто тест не пройдет, то для showErrorMessage сделать анонимный обработчик и запускать 1-enableSubmitButton 2-enableEscapeKeydownBasicModal
        enableSubmitButton();
        disableEscapeKeydownBasicModal();
        showErrorMessage(enableEscapeKeydownBasicModal);
      }
    }
  });

  initScale();
  initEffect();
  initValidate();
};

export { initNewPostModal };

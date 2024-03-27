import { isEscapeKey } from './../util/util.js';
import {
  uploadImageFormElement, uploadSubmitElement, imageUploadOverlayElement, imageUploadInputElement,
  imageUploadCancelElement, hashtagsInputElement, descriptionInputElement
} from './elements.js';
import { openBasicModal, closeBasicModal } from './../basic-modal.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidate, resetValidate, checkValidate } from './validate.js';
import { sendPost } from './../api.js';
import { showSuccessMessage, showErrorMessage } from './show-message.js';

let canClose;

const enableSubmitButton = () => {
  uploadSubmitElement.disabled = false;
};

const disableSubmitButton = () => {
  uploadSubmitElement.disabled = true;
};

const afterCloseNewPostModal = (_, exitByEscapeKey) => {
  if (exitByEscapeKey) {
    uploadImageFormElement.reset();
  }
};

const onElementEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onUploadImageFormClick = () => {
  resetScale();
  resetEffect();
  resetValidate();
};

const onUploadImageFormSubmit = async (evt) => {
  evt.preventDefault();

  if (checkValidate()) {
    disableSubmitButton();
    try {
      await sendPost(new FormData(evt.target));
      uploadImageFormElement.reset();
      closeBasicModal();
      showSuccessMessage();
    } catch {
      canClose = false;
      showErrorMessage(() => {
        canClose = true;
      });
    } finally {
      enableSubmitButton();
    }
  }
};

const onImageUploadInputElementChange = () => {
  openBasicModal(imageUploadOverlayElement, imageUploadCancelElement, afterCloseNewPostModal, () => canClose);
};

const initNewPostModal = () => {
  canClose = true;
  imageUploadInputElement.addEventListener('change', onImageUploadInputElementChange);
  hashtagsInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  descriptionInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  uploadImageFormElement.addEventListener('reset', onUploadImageFormClick);
  uploadImageFormElement.addEventListener('submit', onUploadImageFormSubmit);

  initScale();
  initEffect();
  initValidate();
};

export { initNewPostModal };

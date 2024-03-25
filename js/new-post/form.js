import { uploadImageFormElement, uploadSubmitElement } from './elements.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidate, resetValidate, checkValidate } from './validate.js';
import { sendPost } from './../api.js';

const enableSubmitButton = () => {
  uploadSubmitElement.disabled = false;
};

const disableSubmitButton = () => {
  uploadSubmitElement.disabled = true;
};

const resetForm = () => {
  uploadImageFormElement.reset();
};

const initForm = (onSuccessSendPost, onErrorSendPost) => {
  uploadImageFormElement.addEventListener('reset', () => {
    resetScale();
    resetEffect();
    resetValidate();
    enableSubmitButton();
  });
  uploadImageFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (checkValidate()) {
      disableSubmitButton();
      sendPost(
        onSuccessSendPost,
        (err) => {
          onErrorSendPost(err);
          enableSubmitButton();
        },
        new FormData(evt.target));
    }
  });

  initScale();
  initEffect();
  initValidate();
};

export { initForm, resetForm };

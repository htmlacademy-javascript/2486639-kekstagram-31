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
  uploadImageFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (checkValidate()) {
      disableSubmitButton();
      try {
        await sendPost(new FormData(evt.target));
        uploadImageFormElement.reset();
        onSuccessSendPost();
      } catch {
        onErrorSendPost();
      }
    }
  });

  initScale();
  initEffect();
  initValidate();
};

export { initForm, resetForm };

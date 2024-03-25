import { uploadImageFormElement, uploadSubmitElement } from './elements.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidate, resetValidate, checkValidate } from './validate.js';
import { sendPost } from './../api.js';
import { showSuccess, showError } from './show-message.js';

let onSuccess = null;

const enableSubmitButton = () => {
  uploadSubmitElement.disabled = false;
};
const disablekSubmitButton = () => {
  uploadSubmitElement.disabled = true;
};

const onSuccessSendPost = (/*data для следующего задания*/) => {
  //!!
  //console.log(data);
  uploadImageFormElement.reset();
  if (onSuccess) {
    onSuccess();
  }
  showSuccess();
};

const onErrorSendPost = () => {
  showError();
  enableSubmitButton();
};

const initForm = (onSuccessSubmit) => {
  onSuccess = onSuccessSubmit;
  uploadImageFormElement.addEventListener('reset', () => {
    resetScale();
    resetEffect();
    resetValidate();
    enableSubmitButton();
  });
  uploadImageFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (checkValidate()) {
      disablekSubmitButton();
      //!! ?? нужно ли тримить коментарий и хештеги при отправке? и при провеке коментария на длинну?
      sendPost(onSuccessSendPost, onErrorSendPost, new FormData(evt.target));
    }
  });

  initScale();
  initEffect();
  initValidate();
};

export { initForm };

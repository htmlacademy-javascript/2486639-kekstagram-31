import { isEscapeKey } from './../util/util.js';
import { isImageFileType } from '../util/file-types.js';
import { enableButton, disableButton } from './../util/dom.js';
import {
  uploadImageFormElement, uploadSubmitElement, imageUploadOverlayElement, imageUploadInputElement,
  imageUploadPreviewElement, imageUploadCancelElement, hashtagsInputElement, descriptionInputElement
} from './elements.js';
import { openBasicModal, closeBasicModal } from './../basic-modal.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidate, resetValidate, checkValidate } from './validate.js';
import { sendPost } from './../api.js';
import { showSuccessMessage, showErrorMessage } from './show-message.js';

const ERROR_IMAGE_SRC = 'img/logo-mask.png';

const submitText = {
  enabled: uploadSubmitElement.textContent,
  disabled: 'Публикую...',
  //disabled: 'Сохраняю...',
  notImage: 'Файл не картинка!'
};

let canClose;

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
  imageUploadPreviewElement.src = '';
  resetScale();
  resetEffect();
  resetValidate();
};

const onUploadImageFormSubmit = async (evt) => {
  evt.preventDefault();

  if (checkValidate()) {
    disableButton(uploadSubmitElement, submitText.disabled);
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
      enableButton(uploadSubmitElement, submitText.enabled);
    }
  }
};

const onImageUploadInputElementChange = () => {
  openBasicModal(imageUploadOverlayElement, imageUploadCancelElement, afterCloseNewPostModal, () => canClose);

  const file = imageUploadInputElement.files[0];
  if (isImageFileType(file.name)) {
    imageUploadPreviewElement.src = URL.createObjectURL(file);
    enableButton(uploadSubmitElement, submitText.enabled);
  } else {
    imageUploadPreviewElement.src = ERROR_IMAGE_SRC;
    disableButton(uploadSubmitElement, submitText.notImage);
  }
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

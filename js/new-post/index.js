import { isEscapeKey } from './../util/util.js';
import { isImageFileType } from '../util/file-types.js';
import { enableButton, disableButton } from './../util/dom.js';
import {
  effectsPreviewSelector, uploadImageFormElement, uploadSubmitElement, imageUploadOverlayElement,
  imageUploadInputElement, imageUploadPreviewElement, imageUploadCancelElement,
  hashtagsInputElement, descriptionInputElement, effectsListElement
} from './elements.js';
import { openBasicModal, closeBasicModal } from './../basic-modal.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidate, resetValidate, isValidated } from './validate.js';
import { sendPost } from './../api.js';
import { showSuccessMessage, showErrorMessage } from './show-message.js';

const submitText = {
  enabled: uploadSubmitElement.textContent,
  disabled: 'Публикую...'
};

let onAfterSuccess = null;
let canClose;

const afterCloseNewPostModal = (_, exitByEscapeKey) => {
  if (exitByEscapeKey) {
    uploadImageFormElement.reset();
  }
};

const updateImagePreview = (previewImageURL = '') => {
  imageUploadPreviewElement.src = previewImageURL;

  effectsListElement.querySelectorAll(effectsPreviewSelector).forEach((element) => {
    element.style.backgroundImage = `url(${previewImageURL})`;
  });
};

const onElementEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onUploadImageFormClick = () => {
  updateImagePreview();
  resetScale();
  resetEffect();
  resetValidate();
};

const onUploadImageFormSubmit = async (evt) => {
  evt.preventDefault();

  if (isValidated()) {
    disableButton(uploadSubmitElement, submitText.disabled);
    try {
      const previewImageURL = imageUploadPreviewElement.src;
      const sendResult = await sendPost(new FormData(evt.target));
      uploadImageFormElement.reset();
      closeBasicModal();
      showSuccessMessage();
      //
      onAfterSuccess?.({
        comments: [],
        description: sendResult.description,
        id: -1,
        likes: 0,
        url: previewImageURL
      });
    } catch {
      canClose = false;
      showErrorMessage('', () => {
        canClose = true;
      });
    } finally {
      enableButton(uploadSubmitElement, submitText.enabled);
    }
  }
};

const onImageUploadInputElementChange = () => {
  const file = imageUploadInputElement.files[0];

  if (isImageFileType(file.name)) {
    updateImagePreview(URL.createObjectURL(file));
    openBasicModal(imageUploadOverlayElement, imageUploadCancelElement, afterCloseNewPostModal, () => canClose);
  } else {
    imageUploadPreviewElement.src = '';
    showErrorMessage('Выбранный файл не изображение!');
  }
};

const initNewPostModal = (onAfterSuccessSendPost) => {
  onAfterSuccess = onAfterSuccessSendPost;
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

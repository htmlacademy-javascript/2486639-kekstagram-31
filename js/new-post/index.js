import { isImageFileType } from '../util/file-types.js';
import { enableButton, disableButton, stopPropagationIfEscapeKey } from './../util/dom.js';
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

const submitTextOption = {
  enabled: uploadSubmitElement.textContent,
  disabled: 'Публикую...'
};

let onAfterSuccess = null;
let canClose = true;

const afterCloseBasicModal = (isEscapeKeyPress) => {
  if (isEscapeKeyPress) {
    uploadImageFormElement.reset();
  }
};

const updateImagePreview = (previewImageURL = '') => {
  imageUploadPreviewElement.src = previewImageURL;

  effectsListElement.querySelectorAll(effectsPreviewSelector).forEach((element) => {
    element.style.backgroundImage = `url(${previewImageURL})`;
  });
};

const onHashtagsInputElementKeydown = (evt) => {
  stopPropagationIfEscapeKey(evt);
};

const onDescriptionInputElementKeydown = (evt) => {
  stopPropagationIfEscapeKey(evt);
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
    disableButton(uploadSubmitElement, submitTextOption.disabled);
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
      enableButton(uploadSubmitElement, submitTextOption.enabled);
    }
  }
};

const onImageUploadInputElementChange = () => {
  const file = imageUploadInputElement.files[0];

  if (isImageFileType(file.name)) {
    updateImagePreview(URL.createObjectURL(file));
    openBasicModal(imageUploadOverlayElement, imageUploadCancelElement, afterCloseBasicModal, () => canClose);
  } else {
    imageUploadPreviewElement.src = '';
    showErrorMessage('Выбранный файл не изображение!');
  }
};

const initNewPostModal = (onAfterSuccessSendPost) => {
  onAfterSuccess = onAfterSuccessSendPost;
  canClose = true;
  imageUploadInputElement.addEventListener('change', onImageUploadInputElementChange);
  hashtagsInputElement.addEventListener('keydown', onHashtagsInputElementKeydown);
  descriptionInputElement.addEventListener('keydown', onDescriptionInputElementKeydown);
  uploadImageFormElement.addEventListener('reset', onUploadImageFormClick);
  uploadImageFormElement.addEventListener('submit', onUploadImageFormSubmit);

  initScale();
  initEffect();
  initValidate();
};

export { initNewPostModal };

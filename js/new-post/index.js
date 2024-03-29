import { isImageFileType } from '../util/file-types.js';
import { enableButton, disableButton } from './../util/dom.js';
import { sendPost } from './../api.js';
import { createPost } from './../update-posts.js';
import {
  uploadImageFormElement, uploadSubmitElement, imageUploadOverlayElement,
  imageUploadInputElement, imageUploadPreviewElement, imageUploadCancelElement
} from './elements.js';
import { openBasicModal, closeBasicModal } from './../basic-modal.js';
import { initFormInputs, isValidatedFormInputs, resetFormInputs, updateEffectsBackgroundImage } from './form-inputs.js';
import { showSuccessMessage, showErrorMessage } from './show-message.js';

const submitTextOption = {
  enabled: uploadSubmitElement.textContent,
  disabled: 'Публикую...'
};

const newPostSetting = {
  onAfterSuccessUpload: null,
  canCloseModal: true
};

const canCloseModal = () => newPostSetting.canCloseModal;

const afterCloseModal = (isEscapeKeyPress) => {
  if (isEscapeKeyPress) {
    uploadImageFormElement.reset();
  }
};

const updateImagePreview = (previewImageURL = '') => {
  imageUploadPreviewElement.src = previewImageURL;
  updateEffectsBackgroundImage(previewImageURL);
};

const onUploadImageFormReset = () => {
  updateImagePreview();
  resetFormInputs();
};

const onUploadImageFormSubmit = async (evt) => {
  evt.preventDefault();

  if (isValidatedFormInputs()) {
    disableButton(uploadSubmitElement, submitTextOption.disabled);
    try {
      const sendResult = await sendPost(new FormData(uploadImageFormElement));
      //!! вместо previewImageURL взять бы блоб изображения из imageUploadPreviewElement
      const post = createPost(null, imageUploadPreviewElement.src, sendResult.description, sendResult.hashtags);
      newPostSetting.onAfterSuccessUpload?.(post);
      //
      uploadImageFormElement.reset();
      closeBasicModal();
      showSuccessMessage();
    } catch {
      newPostSetting.canCloseModal = false;
      showErrorMessage('', () => {
        newPostSetting.canCloseModal = true;
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
    openBasicModal(imageUploadOverlayElement, imageUploadCancelElement, afterCloseModal, canCloseModal);
  } else {
    imageUploadPreviewElement.src = '';
    showErrorMessage('Выбранный файл не изображение!');
  }
};

const initNewPostModal = (onAfterSuccessUpload) => {
  newPostSetting.onAfterSuccessUpload = onAfterSuccessUpload;
  imageUploadInputElement.addEventListener('change', onImageUploadInputElementChange);
  uploadImageFormElement.addEventListener('reset', onUploadImageFormReset);
  uploadImageFormElement.addEventListener('submit', onUploadImageFormSubmit);
  initFormInputs();
};

export { initNewPostModal };

import { isEscapeKey } from './../util/util.js';
import { openBasicModal, closeBasicModal, enableEscapeKeydownBasicModal, disableEscapeKeydownBasicModal } from './../basic-modal.js';
import {
  uploadImageFormElement, imageUploadOverlayElement, imageUploadInputElement,
  imageUploadCancelElement, hashtagsInputElement, descriptionInputElement
} from './elements.js';
import { initForm, resetForm } from './form.js';
import { showSuccessMessage, showErrorMessage } from './show-message.js';

const onSuccessSendPost = (/*data для следующего задания*/) => {
  //!!
  //console.log(data);
  uploadImageFormElement.reset();
  closeBasicModal();
  showSuccessMessage();
};

const onErrorSendPost = () => {
  disableEscapeKeydownBasicModal();
  showErrorMessage(() => {
    enableEscapeKeydownBasicModal();
  });
};

const closeNewPostModal = (_, exitByEscapeKey) => {
  if (exitByEscapeKey) {
    resetForm();
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

const initNewPosteModal = () => {
  imageUploadInputElement.addEventListener('change', openNewPostModal);
  hashtagsInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  descriptionInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  initForm(onSuccessSendPost, onErrorSendPost);
};

export { initNewPosteModal };

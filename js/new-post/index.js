import { isEscapeKey } from './../util/util.js';
import { openBasicModal, closeBasicModal } from './../basic-modal.js';
import {
  uploadImageFormElement, imageUploadOverlayElement, imageUploadInputElement,
  imageUploadCancelElement, hashtagsInputElement, descriptionInputElement
} from './elements.js';
import { initForm } from './form.js';

const closeNewPostModal = (_, exitByEscapeKey) => {
  if (exitByEscapeKey) {
    uploadImageFormElement.reset();
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
  initForm(closeBasicModal);
};

export { initNewPosteModal };

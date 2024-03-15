import { disableElement } from './util/dom.js';
import { initBasicModal } from './basic-modal.js';
import {
  uploadSubmitElement, imageUploadOverlayElement, imageUploadIntupElement,
  imageUploadCancelElement, hashtagsIntupElement, descriptionIntupElement,
} from './new-post-elements.js';
import { initNewPostValidate, clearNewPostValidate } from './new-post-validate.js';

const closeNewPostModal = () => {
  imageUploadIntupElement.value = '';
  hashtagsIntupElement.value = '';
  descriptionIntupElement.value = '';
  clearNewPostValidate();
};

const openNewPostModal = () => {
  initBasicModal(
    imageUploadOverlayElement,
    imageUploadCancelElement,
    closeNewPostModal,
    (evt) => (evt.target !== hashtagsIntupElement) && (evt.target !== descriptionIntupElement)
  );

  uploadSubmitElement.disabled = false;

  //!! imageUploadIntupElement.value
  //console.log(imageUploadIntupElement.value);
};

const initNewPost = () => {
  imageUploadIntupElement.addEventListener('change', openNewPostModal);
  uploadSubmitElement.addEventListener('click', disableElement);

  initNewPostValidate();

  //!!
  openNewPostModal();
};

export { initNewPost };

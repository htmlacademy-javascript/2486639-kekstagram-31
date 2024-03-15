import { disableElement } from './util/dom.js';
import { initBasicModal } from './basic-modal.js';
import {
  uploadSubmitElement, imageUploadOverlayElement, imageUploadIntupElement,
  imageUploadCancelElement, textHashtagsElement, textDescriptionElement,
} from './new-post-elements.js';
import { initNewPostValidate } from './new-post-validate.js';

const closeNewPostModal = () => {
  imageUploadIntupElement.value = '';
  textHashtagsElement.value = '';
  textDescriptionElement.value = '';
};

const openNewPostModal = () => {
  initBasicModal(
    imageUploadOverlayElement,
    imageUploadCancelElement,
    closeNewPostModal,
    (evt) => (evt.target !== textHashtagsElement) && (evt.target !== textDescriptionElement)
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

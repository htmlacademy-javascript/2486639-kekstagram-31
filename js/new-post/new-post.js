import { disableEventCurrentTargetElement } from './util/dom.js';
import { openBasicModal } from './basic-modal.js';
import {
  uploadSubmitElement, imageUploadOverlayElement, imageUploadIntupElement,
  imageUploadCancelElement, hashtagsIntupElement, descriptionIntupElement,
} from './new-post-elements.js';
import { initValidateNewPost, resetValidateNewPost, validateNewPostFrom } from './new-post-validate.js';

const closeNewPostModal = () => {
  imageUploadIntupElement.value = '';
  hashtagsIntupElement.value = '';
  descriptionIntupElement.value = '';
  resetValidateNewPost();
};

const openNewPostModal = () => {
  openBasicModal(
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
  uploadSubmitElement.addEventListener('click', (evt) => {
    if (validateNewPostFrom()) {
      disableEventCurrentTargetElement(evt);
      //!!
      evt.preventDefault();
    }

    evt.preventDefault();
  });

  initValidateNewPost();

  //!!
  openNewPostModal();
};

export { initNewPost };

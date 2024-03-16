import { disableEventCurrentTargetElement } from './../util/dom.js';
import {
  uploadSubmitElement, imageUploadOverlayElement, imageUploadIntupElement,
  imageUploadCancelElement, hashtagsIntupElement, descriptionIntupElement,
} from './elements.js';
import { initValidateNewPost, resetValidateNewPost, validateNewPostFrom } from './validate.js';

let openBasicModal = null;

const closeNewPostModal = () => {
  imageUploadIntupElement.value = '';
  hashtagsIntupElement.value = '';
  descriptionIntupElement.value = '';
  resetValidateNewPost();
};

const openNewPostModal = () => {
  if (openBasicModal) {
    openBasicModal(
      imageUploadOverlayElement,
      imageUploadCancelElement,
      closeNewPostModal,
      (evt) => (evt.target !== hashtagsIntupElement) && (evt.target !== descriptionIntupElement)
    );
  }

  uploadSubmitElement.disabled = false;

  //!! imageUploadIntupElement.value
  //console.log(imageUploadIntupElement.value);
};

const initNewPost = (cb) => {
  openBasicModal = cb;
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

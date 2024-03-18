import { disableEventCurrentTargetElement } from './../util/dom.js';
import { openBasicModal } from './../basic-modal.js';
import {
  uploadSubmitElement, imageUploadOverlayElement, imageUploadInputElement,
  imageUploadCancelElement, hashtagsInputElement, descriptionInputElement,
} from './elements.js';
import { initValidateNewPost, resetValidateNewPost, validateNewPostFrom } from './validate.js';

const closeNewPostModal = () => {
  imageUploadInputElement.value = '';
  hashtagsInputElement.value = '';
  descriptionInputElement.value = '';
  resetValidateNewPost();
};

const openNewPostModal = () => {
  openBasicModal(
    imageUploadOverlayElement,
    imageUploadCancelElement,
    closeNewPostModal,
    (evt) => (evt.target !== hashtagsInputElement) && (evt.target !== descriptionInputElement)
  );

  uploadSubmitElement.disabled = false;

  //!! imageUploadInputElement.value
  //console.log(imageUploadInputElement.value);

  //!! нужно ли тримить коментарий и хештеги при отправке?
};

const initNewPost = () => {
  imageUploadInputElement.addEventListener('change', openNewPostModal);
  uploadSubmitElement.addEventListener('click', (evt) => {
    if (validateNewPostFrom()) {
      disableEventCurrentTargetElement(evt);
    } else {
      evt.preventDefault();
    }
  });

  initValidateNewPost();
};

export { initNewPost };

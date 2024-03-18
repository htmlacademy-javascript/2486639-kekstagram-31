import { isEscapeKey } from './../util/util.js';
import { disableEventCurrentTargetElement, clearInputValue } from './../util/dom.js';
import { openBasicModal } from './../basic-modal.js';
import {
  uploadImageFormElement, /*uploadSubmitElement,*/ imageUploadOverlayElement,
  imageUploadInputElement, imageUploadCancelElement, hashtagsInputElement, descriptionInputElement
} from './elements.js';
import { initValidateNewPost, resetValidateNewPost, validateNewPostFrom } from './validate.js';

const closeNewPostModal = () => {
  // когда закрыто по Escape, то поля не очищены
  clearInputValue(imageUploadInputElement);
  clearInputValue(hashtagsInputElement);
  clearInputValue(descriptionInputElement);
  // сброс валидации
  resetValidateNewPost();
};

const openNewPostModal = () => {
  openBasicModal(
    imageUploadOverlayElement,
    imageUploadCancelElement,
    closeNewPostModal
  );

  //!! imageUploadInputElement.value
  //console.log(imageUploadInputElement.value);

  //!! нужно ли тримить коментарий и хештеги при отправке?
};

const onElementEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const initNewPost = () => {
  imageUploadInputElement.addEventListener('change', openNewPostModal);
  hashtagsInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  descriptionInputElement.addEventListener('keydown', onElementEscapeKeyDown);
  uploadImageFormElement.addEventListener('submit', (evt) => {
    if (validateNewPostFrom()) {
      disableEventCurrentTargetElement(evt);
    } else {
      evt.preventDefault();
    }
  });
  //!! как нужно обработать Enter?

  initValidateNewPost();
};

export { initNewPost };

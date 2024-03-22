import { addDot, isEscapeKey } from './../util/util.js';
import { successButtonClass, successInnerClass, successTemplateElement } from './elements.js';

let successElement;
let successButtonElement;

const hideSuccess = () => {
  successElement.remove();
  successButtonElement.removeEventListener('click', hideSuccess);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const showSuccess = () => {
  successElement = successTemplateElement.cloneNode(true);
  document.body.append(successElement);

  successButtonElement = successElement.querySelector(addDot(successButtonClass));

  successButtonElement.addEventListener('click', hideSuccess);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onDocumentClick);
};

//!!
function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccess();
  }
}

function onDocumentClick(evt) {
  if (!evt.target.closest(addDot(successInnerClass))) {
    hideSuccess();
  }
}

export { showSuccess };

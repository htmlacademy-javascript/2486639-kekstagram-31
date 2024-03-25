import { addDot, isEscapeKey } from './../util/util.js';
import { successButtonClass, successInnerClass, successTemplateElement } from './elements.js';
import { errorButtonClass, errorInnerClass, errorTemplateElement } from './elements.js';

let messageElement = null;
let messageButtonElement = null;
let messageInnerClass = '';

const hideMessage = () => {
  messageElement.remove();
  messageButtonElement.removeEventListener('click', hideMessage);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const showMessage = (templateElement, innerClass, buttonClass) => {
  messageInnerClass = innerClass;
  messageElement = templateElement.cloneNode(true);
  document.body.append(messageElement);

  messageButtonElement = messageElement.querySelector(addDot(buttonClass));

  messageButtonElement.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onDocumentClick);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    //!! evt.stopPropagation();  ???
    evt.preventDefault();
    hideMessage();
  }
}

function onDocumentClick(evt) {
  if (!evt.target.closest(addDot(messageInnerClass))) {
    hideMessage();
  }
}

const showSuccess = () => {
  showMessage(successTemplateElement, successInnerClass, successButtonClass);
};

const showError = () => {
  showMessage(errorTemplateElement, errorInnerClass, errorButtonClass);
};

export { showSuccess, showError };

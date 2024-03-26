import { isEscapeKey } from './../util/util.js';
import { messageOption, successTemplateElement, errorTemplateElement } from './elements.js';

const currentMessage = {
  element: null,
  buttonElement: null,
  innerSelector: null,
  onClose: null
};

const hideMessage = () => {
  if (currentMessage.onClose) {
    currentMessage.onClose();
  }
  currentMessage.element.remove();
  currentMessage.buttonElement.removeEventListener('click', hideMessage);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const showMessage = (templateElement, { buttonSelector, innerSelector }, onClose) => {
  currentMessage.element = templateElement.cloneNode(true);
  currentMessage.buttonElement = currentMessage.element.querySelector(buttonSelector);
  currentMessage.innerClass = innerSelector;
  currentMessage.onClose = onClose;

  currentMessage.buttonElement.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onDocumentClick);
  document.body.append(currentMessage.element);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onDocumentClick(evt) {
  if (!evt.target.closest(currentMessage.innerSelector)) {
    hideMessage();
  }
}

const showSuccessMessage = () => {
  showMessage(successTemplateElement, messageOption.success);
};

const showErrorMessage = (onClose) => {
  showMessage(errorTemplateElement, messageOption.error, onClose);
};

export { showSuccessMessage, showErrorMessage };

import { isEscapeKey } from './../util/util.js';
import { messageSelectorList, successTemplateElement, errorTemplateElement } from './elements.js';

const messageOption = {
  element: null,
  buttonElement: null,
  innerSelector: null,
  onClose: null
};

const hideMessage = () => {
  if (messageOption.onClose) {
    messageOption.onClose();
  }
  messageOption.element.remove();
  messageOption.buttonElement.removeEventListener('click', hideMessage);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const showMessage = (templateElement, innerSelector, buttonSelector, onClose) => {
  messageOption.innerClass = innerSelector;
  messageOption.onClose = onClose;
  messageOption.element = templateElement.cloneNode(true);
  document.body.append(messageOption.element);

  messageOption.buttonElement = messageOption.element.querySelector(buttonSelector);

  messageOption.buttonElement.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onDocumentClick);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onDocumentClick(evt) {
  if (!evt.target.closest(messageOption.innerSelector)) {
    hideMessage();
  }
}

const showSuccessMessage = () => {
  showMessage(successTemplateElement, ...Object.values(messageSelectorList.success));
};

const showErrorMessage = (onClose) => {
  showMessage(errorTemplateElement, ...Object.values(messageSelectorList.error), onClose);
};

export { showSuccessMessage, showErrorMessage };

import { isEscapeKey } from './../util/util.js';
import { messageOption, successTemplateElement, errorTemplateElement } from './elements.js';

const currentMessage = {
  element: null,
  buttonElement: null,
  innerSelector: null,
  onAfterClose: null
};

const hideMessage = () => {
  const { element, buttonElement, onAfterClose } = currentMessage;
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  buttonElement.removeEventListener('click', onButtonElementClick);
  element.remove();
  onAfterClose?.();
};

function onButtonElementClick() {
  hideMessage();
}

const showMessage = (templateElement, { innerSelector, titleSelector, buttonSelector }, title = '', onAfterClose = null) => {
  const element = templateElement.cloneNode(true);
  const buttonElement = element.querySelector(buttonSelector);
  if (title) {
    const titleElement = element.querySelector(titleSelector);
    titleElement.textContent = title;
  }
  buttonElement.addEventListener('click', onButtonElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  document.body.append(element);
  Object.assign(currentMessage, { element, buttonElement, innerSelector, onAfterClose });
};

function onDocumentKeydown(evt) {
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

const showSuccessMessage = (successText = '', onAfterClose = null) => {
  showMessage(successTemplateElement, messageOption.success, successText, onAfterClose);
};

const showErrorMessage = (errorText = '', onAfterClose = null) => {
  showMessage(errorTemplateElement, messageOption.error, errorText, onAfterClose);
};

export { showSuccessMessage, showErrorMessage };

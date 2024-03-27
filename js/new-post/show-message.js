import { isEscapeKey } from './../util/util.js';
import { messageOption, successTemplateElement, errorTemplateElement } from './elements.js';

const currentMessage = {
  element: null,
  buttonElement: null,
  innerSelector: null,
  onClose: null
};

const hideMessage = () => {
  const { element, buttonElement, onClose } = currentMessage;
  onClose?.();
  element.remove();
  buttonElement.removeEventListener('click', onButtonElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

function onButtonElementClick() {
  hideMessage();
}

const showMessage = (templateElement, { buttonSelector, innerSelector }, onClose) => {
  const element = templateElement.cloneNode(true);
  const buttonElement = element.querySelector(buttonSelector);

  buttonElement.addEventListener('click', onButtonElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  document.body.append(element);
  Object.assign(currentMessage, { element, buttonElement, innerSelector, onClose });
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

const showSuccessMessage = () => {
  showMessage(successTemplateElement, messageOption.success);
};

const showErrorMessage = (onClose) => {
  showMessage(errorTemplateElement, messageOption.error, onClose);
};

export { showSuccessMessage, showErrorMessage };

import { addDot, isEscapeKey } from './../util/util.js';
import { successButtonClass, successInnerClass, successTemplateElement } from './elements.js';
import { errorButtonClass, errorInnerClass, errorTemplateElement } from './elements.js';

const messageOption = {
  element: null,
  buttonElement: null,
  innerClass: null,
  changeEnabledEscapeKeydown: null
};

const changeEnabledEscapeKeydown = (value) => {
  if (messageOption.changeEnabledEscapeKeydown) {
    messageOption.changeEnabledEscapeKeydown(value);
  }
};

const hideMessage = () => {
  changeEnabledEscapeKeydown(false);
  messageOption.element.remove();
  messageOption.buttonElement.removeEventListener('click', hideMessage);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const showMessage = (templateElement, innerClass, buttonClass, setStopPropagation1 = null/* !!!!! */) => {
  messageOption.innerClass = innerClass;
  messageOption.changeEnabledEscapeKeydown = setStopPropagation1;
  changeEnabledEscapeKeydown(true);
  messageOption.element = templateElement.cloneNode(true);
  document.body.append(messageOption.element);

  messageOption.buttonElement = messageOption.element.querySelector(addDot(buttonClass));

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
  if (!evt.target.closest(addDot(messageOption.innerClass))) {
    hideMessage();
  }
}

const showSuccessMessage = () => {
  showMessage(successTemplateElement, successInnerClass, successButtonClass);
};

const showErrorMessage = (setStopPropagation1) => {
  showMessage(errorTemplateElement, errorInnerClass, errorButtonClass, setStopPropagation1);
};

export { showSuccessMessage, showErrorMessage };

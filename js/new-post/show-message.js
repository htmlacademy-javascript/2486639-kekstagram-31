import { isEscapeKey } from './../util/util.js';
import { messageOption } from './elements.js';

const messageSetting = {
  element: null,
  buttonElement: null,
  innerSelector: null,
  afterClose: null
};

const hideMessage = () => {
  const { element, buttonElement, afterClose } = messageSetting;
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  buttonElement.removeEventListener('click', onButtonElementClick);
  element.remove();
  afterClose?.();
};

const showMessage = ({ templateElement, innerSelector, titleSelector, buttonSelector }, title = '', afterClose = null) => {
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
  Object.assign(messageSetting, { element, buttonElement, innerSelector, afterClose });
};

function onButtonElementClick() {
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onDocumentClick(evt) {
  if (!evt.target.closest(messageSetting.innerSelector)) {
    hideMessage();
  }
}

const showSuccessMessage = (successText = '', afterClose = null) => {
  showMessage(messageOption.success, successText, afterClose);
};

const showErrorMessage = (errorText = '', afterClose = null) => {
  showMessage(messageOption.error, errorText, afterClose);
};

export { showSuccessMessage, showErrorMessage };

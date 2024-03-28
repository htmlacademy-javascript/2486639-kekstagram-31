import { isEscapeKey } from './util.js';

const updateClassList = (element, className, isAdd = true) => {
  if (isAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
};

const getElement = (selector) => {
  if (selector) {
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
    throw new Error(`Не найден элемент с селектором = "${selector}"`);
  } else {
    throw new Error('Не указан селектор!');
  }
};

const getTemplateElement = (selector) => {
  const templateElement = getElement(selector);
  const firstChildElement = templateElement.content.firstElementChild;
  if (firstChildElement) {
    return firstChildElement;
  }
  throw new Error(`Не найден первый дочерний элемент у шаблона с селектором = "${selector}"`);
};

const getFirstElementChild = (selector) => {
  const element = getElement(selector);
  const firstChildElement = element.firstElementChild;
  if (firstChildElement) {
    return firstChildElement;
  }
  throw new Error(`Не найден первый дочерний элемент у элемента c селектором "${selector}"!`);
};

const removeChilds = (containerElement, childSelector) => {
  if (childSelector) {
    const childs = containerElement.querySelectorAll(childSelector);
    childs.forEach((element) => element.remove());
  } else {
    containerElement.innerHTML = '';
  }
};

const createFragment = (records, createElement) => {
  const fragment = document.createDocumentFragment();
  records.forEach((record, index) => fragment.append(createElement(record, index)));
  return fragment;
};

const clearSelected = () => {
  if (window.getSelection) {
    if (window.getSelection().empty) {// Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {// Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) {// IE?
    document.selection.empty();
  }
};

const updateButtonEnabled = (buttonElement, enabled, text) => {
  buttonElement.disabled = !enabled;
  buttonElement.textContent = text;
};

const enableButton = (buttonElement, text) => {
  updateButtonEnabled(buttonElement, true, text);
};

const disableButton = (buttonElement, text) => {
  updateButtonEnabled(buttonElement, false, text);
};

const stopPropagationIfEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

export {
  updateClassList,
  getTemplateElement,
  getFirstElementChild,
  removeChilds,
  createFragment,
  clearSelected,
  enableButton,
  disableButton,
  stopPropagationIfEscapeKey
};

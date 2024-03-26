import { throwError } from './util.js';

const updateClassList = (element, className, isAdd = true) => {
  if (isAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
};

//!! похожа с getFirstElementChild
const getTemplateElement = (selector) => {
  if (selector) {
    const templateElement = document.querySelector(selector);
    if (!templateElement) {
      throwError(`Не найден шаблон с селектором = "${selector}"`);
    }
    const element = templateElement.content.firstElementChild;
    if (!element) {
      throwError(`Не найден первый дочерний элемент с селектором = "${selector}"`);
    }
    return element;
  } else {
    throwError('Не указан селектор!');
  }
};

//!! похожа с getTemplateElement
const getFirstElementChild = (selector) => {
  if (selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throwError(`Не найден элемент c селектором "${selector}"!`);
    }

    const firstElement = element.firstElementChild;
    if (!firstElement) {
      throwError(`Не найден первый дочерний элемент у элемента c селектором "${selector}"!`);
    }
    return firstElement;
  } else {
    throwError('Не указан селектор!');
  }
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

export {
  updateClassList,
  getTemplateElement,
  getFirstElementChild,
  removeChilds,
  createFragment,
  clearSelected
};

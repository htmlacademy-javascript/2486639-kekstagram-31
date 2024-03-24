import { throwError, addDot } from './util.js';

const updateClassList = (element, className, isAdd = true) => {
  if (isAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
};

const getTemplateElement = (id, elementChildClassName = '') => {
  if (id) {
    const templateElement = document.querySelector(`#${id}`);
    if (!templateElement) {
      throwError(`Не найден шаблон c id = "${id}"`);
    }

    if (elementChildClassName) {
      try {
        return templateElement.content.querySelector(addDot(elementChildClassName));
      } catch (error) {
        throwError(`Не найден дочерний элемент с сlass = "${elementChildClassName}" у шаблона id = "${id}"`);
      }
    } else {
      const element = templateElement.content.firstElementChild;
      if (!element) {
        throwError(`Не найден первый дочерний элемент у шаблона id = "${id}"`);
      }
      return element;
    }
  } else {
    throwError('Не указан id шаблона');
  }
};

const getFirstElementChild = (className) => {
  if (className) {
    const element = document.querySelector(addDot(className));
    if (!element) {
      throwError(`Не найден элемент c class = "${className}"`);
    }

    const firstElement = element.firstElementChild;
    if (!firstElement) {
      throwError(`Не найден первый дочерний элемент у элемента class = "${className}"`);
    }
    return firstElement;
  } else {
    throwError('Не указан className элемента');
  }
};

const removeChilds = (containerElement, childClassName) => {
  if (childClassName) {
    const childs = containerElement.querySelectorAll(addDot(childClassName));
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

export {
  updateClassList,
  getTemplateElement,
  getFirstElementChild,
  removeChilds,
  createFragment,
};

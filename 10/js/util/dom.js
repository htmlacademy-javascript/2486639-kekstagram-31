const addDotToClassName = (className) => `.${className}`;

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
      throw new Error(`Не найден шаблон c id = "${id}"`);
    }

    if (elementChildClassName) {
      try {
        return templateElement.content.querySelector(addDotToClassName(elementChildClassName));
      } catch (error) {
        throw new Error(`Не найден дочерний элемент с сlass = "${elementChildClassName}" у шаблона id = "${id}"`);
      }
    } else {
      const element = templateElement.content.firstElementChild;
      if (!element) {
        throw new Error(`Не найден первый дочерний элемент у шаблона id = "${id}"`);
      }
      return element;
    }
  } else {
    throw new Error('Не указан id шаблона');
  }
};

const getFirstElementChild = (className) => {
  if (className) {
    const element = document.querySelector(addDotToClassName(className));
    if (!element) {
      throw new Error(`Не найден элемент c class = "${className}"`);
    }

    const firstElement = element.firstElementChild;
    if (!firstElement) {
      throw new Error(`Не найден первый дочерний элемент у элемента class = "${className}"`);
    }
    return firstElement;
  } else {
    throw new Error('Не указан className элемента');
  }
};

const removeChilds = (containerElement, childClassName) => {
  if (childClassName) {
    const childs = containerElement.querySelectorAll(addDotToClassName(childClassName));
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
  addDotToClassName,
  updateClassList,
  getTemplateElement,
  getFirstElementChild,
  removeChilds,
  createFragment,
};

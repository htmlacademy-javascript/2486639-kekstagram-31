const updateClassList = (element, isAdd, className) => {
  if (isAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
};

const getTemplate = (id, elementChildClassName = '') => {
  if (id) {
    const templateElement = document.querySelector(`#${id}`);
    if (!templateElement) {
      throw new Error(`Не найден шаблон c id = "${id}"`);
    }

    if (elementChildClassName) {
      try {
        return templateElement.content.querySelector(`.${elementChildClassName}`);
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
    const element = document.querySelector(`.${className}`);
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

const removeChilds = (container, childClassName) => {
  if (childClassName) {
    const childs = container.querySelectorAll(`.${childClassName}`);
    childs.forEach((element) => element.remove());
  } else {
    container.innerHTML = '';
  }
};

const createFragment = (records, cbMakeElement) => {
  const fragment = document.createDocumentFragment();
  records.forEach((record, index) => fragment.append(cbMakeElement(record, index)));
  return fragment;
};

export { updateClassList, getTemplate, getFirstElementChild, removeChilds, createFragment };

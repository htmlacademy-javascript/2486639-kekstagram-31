import { isEscapeKey } from './util/util.js';
import { hiddenClass, modalOpenClass } from './elements.js';

const basicModalSetting = {
  element: null,
  closeElement: null,
  afterCloseModal: null,
  canCloseModal: null
};

const closeBasicModal = (isEscapeKeyPress = false) => {
  const { element, closeElement, afterCloseModal } = basicModalSetting;
  if (element.scrollTop !== 0) {
    element.scrollTo(0, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  }
  element.classList.add(hiddenClass);
  document.body.classList.remove(modalOpenClass);
  closeElement?.removeEventListener('click', onCloseElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  afterCloseModal?.(isEscapeKeyPress);
};

const openBasicModal = (element, closeElement, afterCloseModal = null, canCloseModal = null) => {
  element.classList.remove(hiddenClass);
  document.body.classList.add(modalOpenClass);
  closeElement?.addEventListener('click', onCloseElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
  Object.assign(basicModalSetting, { element, closeElement, afterCloseModal, canCloseModal });
};

function onCloseElementClick() {
  closeBasicModal();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    const { canCloseModal } = basicModalSetting;
    if (!canCloseModal || canCloseModal()) {
      evt.preventDefault();
      closeBasicModal(true);
    } else {
      evt.stopPropagation();
    }
  }
}

export { openBasicModal, closeBasicModal };

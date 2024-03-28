import { isEscapeKey } from './util/util.js';
import { hiddenClass, modalOpenClass } from './elements.js';

const modalSetting = {
  element: null,
  closeElement: null,
  afterCloseModal: null,
  canClose: null
};

const closeBasicModal = (evt, exitByEscapeKey = false) => {
  const { element, closeElement, afterCloseModal } = modalSetting;
  if (element.scrollTop !== 0) {
    element.scrollTo(0, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  }
  element.classList.add(hiddenClass);
  document.body.classList.remove(modalOpenClass);
  closeElement?.removeEventListener('click', onCloseElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  afterCloseModal?.(evt, exitByEscapeKey);
};

const openBasicModal = (element, closeElement, afterCloseModal = null, canClose = null) => {
  element.classList.remove(hiddenClass);
  document.body.classList.add(modalOpenClass);
  closeElement?.addEventListener('click', onCloseElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
  Object.assign(modalSetting, { element, closeElement, afterCloseModal, canClose });
};

function onCloseElementClick(evt) {
  closeBasicModal(evt);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    const { canClose } = modalSetting;
    if (!canClose || canClose()) {
      evt.preventDefault();
      closeBasicModal(evt, true);
    } else {
      evt.stopPropagation();
    }
  }
}

export { openBasicModal, closeBasicModal };

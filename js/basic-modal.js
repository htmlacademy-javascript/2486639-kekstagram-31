import { isEscapeKey } from './util/util.js';
import { hiddenClass, modalOpenClass } from './elements.js';

const baseModal = {
  element: null,
  closeElement: null,
  onCloseModal: null,
  removeElementClassName: hiddenClass,
  addDocumentClassName: modalOpenClass,
};

const closeBasicModal = (evt, exitByEscapeKey = false) => {
  baseModal.element.scrollTo(scrollX, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  baseModal.element.classList.add(baseModal.removeElementClassName);
  document.body.classList.remove(baseModal.addDocumentClassName);
  if (baseModal.closeElement) {
    baseModal.closeElement.removeEventListener('click', closeBasicModal);
  }
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  if (baseModal.onCloseModal) {
    baseModal.onCloseModal(evt, exitByEscapeKey);
  }
};

const openBasicModal = (modalElement, closeElement, onCloseModal) => {
  baseModal.element = modalElement;
  baseModal.closeElement = closeElement;
  baseModal.onCloseModal = onCloseModal;

  baseModal.element.classList.remove(baseModal.removeElementClassName);
  document.body.classList.add(baseModal.addDocumentClassName);
  if (baseModal.closeElement) {
    baseModal.closeElement.addEventListener('click', closeBasicModal);
  }
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBasicModal(evt, true);
  }
}

export { openBasicModal, closeBasicModal };

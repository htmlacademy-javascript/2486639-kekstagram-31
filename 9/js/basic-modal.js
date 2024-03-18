import { isEscapeKey } from './util/util.js';

const baseModal = {
  element: null,
  closeElement: null,
  onCloseModal: null,
  removeElementClassName: 'hidden',
  addDocumentClassName: 'modal-open',
};

const closeBasicModal = () => {
  baseModal.element.scrollTo(scrollX, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  baseModal.element.classList.add(baseModal.removeElementClassName);
  document.body.classList.remove(baseModal.addDocumentClassName);
  if (baseModal.closeElement) {
    baseModal.closeElement.removeEventListener('click', closeBasicModal);
  }
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  if (baseModal.onCloseModal) {
    baseModal.onCloseModal();
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
    closeBasicModal();
  }
}

export { openBasicModal };

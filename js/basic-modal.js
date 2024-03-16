import { isEscapeKey } from './util/util.js';

const modalOptions = {
  element: null,
  closeElement: null,
  onCloseModal: null,
  onEscapeKeydown: null,
  removeElementClassName: 'hidden',
  addDocumentClassName: 'modal-open',
};

const closeBasicModal = () => {
  modalOptions.element.scrollTo(scrollX, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  modalOptions.element.classList.add(modalOptions.removeElementClassName);
  document.body.classList.remove(modalOptions.addDocumentClassName);
  if (modalOptions.closeElement) {
    modalOptions.closeElement.removeEventListener('click', closeBasicModal);
  }
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  if (modalOptions.onCloseModal) {
    modalOptions.onCloseModal();
  }
};

const openBasicModal = (modalElement, closeElement, onCloseModal, onEscapeKeydown = null) => {
  modalOptions.element = modalElement;
  modalOptions.closeElement = closeElement;
  modalOptions.onCloseModal = onCloseModal;
  modalOptions.onEscapeKeydown = onEscapeKeydown;

  modalOptions.element.classList.remove(modalOptions.removeElementClassName);
  document.body.classList.add(modalOptions.addDocumentClassName);
  if (modalOptions.closeElement) {
    modalOptions.closeElement.addEventListener('click', closeBasicModal);
  }
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (!modalOptions.onEscapeKeydown || modalOptions.onEscapeKeydown && modalOptions.onEscapeKeydown(evt)) {
      evt.preventDefault();
      closeBasicModal();
    }
  }
}

export { openBasicModal };

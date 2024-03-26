import { isEscapeKey } from './util/util.js';
import { hiddenClass, modalOpenClass } from './elements.js';

const modalOption = {
  element: null,
  closeElement: null,
  onCloseModal: null,
  enabledEscapeKeydown: true
};

const enableEscapeKeydownBasicModal = () => {
  modalOption.enabledEscapeKeydown = true;
};

const disableEscapeKeydownBasicModal = () => {
  modalOption.enabledEscapeKeydown = false;
};

const closeBasicModal = (evt, exitByEscapeKey = false) => {
  modalOption.element.scrollTo(scrollX, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  modalOption.element.classList.add(hiddenClass);
  document.body.classList.remove(modalOpenClass);
  if (modalOption.closeElement) {
    modalOption.closeElement.removeEventListener('click', closeBasicModal);
  }
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  if (modalOption.onCloseModal) {
    modalOption.onCloseModal(evt, exitByEscapeKey);
  }
};

const openBasicModal = (modalElement, closeElement, onCloseModal) => {
  modalOption.element = modalElement;
  modalOption.closeElement = closeElement;
  modalOption.onCloseModal = onCloseModal;

  modalOption.element.classList.remove(hiddenClass);
  document.body.classList.add(modalOpenClass);
  if (modalOption.closeElement) {
    modalOption.closeElement.addEventListener('click', closeBasicModal);
  }
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (modalOption.enabledEscapeKeydown) {
      evt.preventDefault();
      closeBasicModal(evt, true);
    } else {
      evt.stopPropagation();
    }
  }
}

export { openBasicModal, closeBasicModal, enableEscapeKeydownBasicModal, disableEscapeKeydownBasicModal };

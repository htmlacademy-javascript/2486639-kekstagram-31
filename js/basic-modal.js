import { isEscapeKey } from './util/util.js';
import { hiddenClass, modalOpenClass } from './elements.js';

const modalSetting = {
  element: null,
  closeElement: null,
  onCloseModal: null,
  enabledEscapeKeydown: true
};

const enableEscapeKeydownBasicModal = () => {
  modalSetting.enabledEscapeKeydown = true;
};

const disableEscapeKeydownBasicModal = () => {
  modalSetting.enabledEscapeKeydown = false;
};

const closeBasicModal = (evt, exitByEscapeKey = false) => {
  modalSetting.element.scrollTo(scrollX, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  modalSetting.element.classList.add(hiddenClass);
  document.body.classList.remove(modalOpenClass);
  if (modalSetting.closeElement) {
    modalSetting.closeElement.removeEventListener('click', closeBasicModal);
  }
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  if (modalSetting.onCloseModal) {
    modalSetting.onCloseModal(evt, exitByEscapeKey);
  }
};

const openBasicModal = (modalElement, closeElement, onCloseModal) => {
  modalSetting.element = modalElement;
  modalSetting.closeElement = closeElement;
  modalSetting.onCloseModal = onCloseModal;

  modalSetting.element.classList.remove(hiddenClass);
  document.body.classList.add(modalOpenClass);
  if (modalSetting.closeElement) {
    modalSetting.closeElement.addEventListener('click', closeBasicModal);
  }
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (modalSetting.enabledEscapeKeydown) {
      evt.preventDefault();
      closeBasicModal(evt, true);
    } else {
      evt.stopPropagation();
    }
  }
}

export { openBasicModal, closeBasicModal, enableEscapeKeydownBasicModal, disableEscapeKeydownBasicModal };

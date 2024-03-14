import { isEscapeKey } from './util/util.js';

const ClassName = {
  removeFromElement: 'hidden',
  addToDocument: 'modal-open',
};

const modal = {
  element: null,
  closeElement: null,
  onCloseModal: null,
  onEscapeKeydown: null,
};

const closeBasicModal = () => {
  modal.element.scrollTo(scrollX, 0); // + Баг, если модальное окно прокрутить, то при следующих открытиях прокрутка вниз остаеться
  modal.element.classList.add(ClassName.removeFromElement);
  document.body.classList.remove(ClassName.addToDocument);
  if (modal.closeElement) {
    modal.closeElement.removeEventListener('click', closeBasicModal);
  }
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  if (modal.onCloseModal) {
    modal.onCloseModal();
  }
};

const initBasicModal = (modalElement, closeElement, onCloseModal, onEscapeKeydown = null) => {
  modal.element = modalElement;
  modal.closeElement = closeElement;
  modal.onCloseModal = onCloseModal;
  modal.onEscapeKeydown = onEscapeKeydown;

  modal.element.classList.remove(ClassName.removeFromElement);
  document.body.classList.add(ClassName.addToDocument);
  if (modal.closeElement) {
    modal.closeElement.addEventListener('click', closeBasicModal);
  }
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (!modal.onEscapeKeydown || modal.onEscapeKeydown && modal.onEscapeKeydown(evt)) {
      evt.preventDefault();
      closeBasicModal();
    }
  }
}

export { initBasicModal };

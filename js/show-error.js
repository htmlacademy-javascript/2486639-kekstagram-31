import { errorTemplateElement } from './elements.js';

const SHOW_ERROR_MILLISECOND = 5000;

const showError = () => {
  const errorElement = errorTemplateElement.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(
    () => {
      errorElement.remove();
    },
    SHOW_ERROR_MILLISECOND);
};

export { showError };

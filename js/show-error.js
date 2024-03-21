import { throwError } from './util/util.js';
import { errorTemplateElement } from './elements.js';

const SECOND_COUNT = 5 * 1000;

const hideError = (errorElement) => document.body.removeChild(errorElement);

const showError = () => {
  const promise = new Promise((cb) => {
    const errorElement = errorTemplateElement.cloneNode(true);
    document.body.append(errorElement);
    setTimeout(cb, SECOND_COUNT, errorElement);
  });

  promise.then(hideError).catch(throwError);
};

export { showError };

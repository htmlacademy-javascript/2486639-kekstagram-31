import { uploadImageFormElement, textHashtagsElement, textDescriptionElement } from './new-post-elements.js';

const initNewPostValidate = () => {
  const pristine = new Pristine(
    uploadImageFormElement,
    {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'img-upload__field-wrapper--error',
    });

  function validateHashtags(value) {
    return value.length <= 5;
  }
  function validateDescription(value) {
    return value.length <= 5;
  }

  pristine.addValidator(
    textHashtagsElement,
    validateHashtags,
    'Хештег до 5 символов'
  );

  pristine.addValidator(
    textDescriptionElement,
    validateDescription,
    'Описание до 5 символов'
  );
};

export { initNewPostValidate };

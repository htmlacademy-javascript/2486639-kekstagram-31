import { uploadImageFormElement, hashtagsIntupElement, descriptionIntupElement } from './new-post-elements.js';

const DESCRIPTION_MAX_LENGTH = 14;
//const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAGS_MAX_COUNT = 5;

const WarningMessages = {
  WRONG_HASHTAG: 'введён невалидный хэштег',
  WRONG_HASHTAGS_COUNT: 'превышено количество хэштегов',
  DUBLICATE_HASHTAGS: 'хэштеги повторяются',
  WRONG_DESCRIPTION_LENGTH: `длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`,
};

let pristine;

const initNewPostValidate = () => {
  pristine = new Pristine(
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
    return value.length <= DESCRIPTION_MAX_LENGTH;
  }

  pristine.addValidator(
    hashtagsIntupElement,
    validateHashtags,
    'Хештег до 5 символов'
  );

  pristine.addValidator(
    descriptionIntupElement,
    validateDescription,
    WarningMessages.WRONG_DESCRIPTION_LENGTH
  );
};

const clearNewPostValidate = () => pristine.reset();

export { initNewPostValidate, clearNewPostValidate };

import { checkStringLength, leaveOneSpace } from './../util/util.js';
import { uploadImageFormElement, hashtagsInputElement, descriptionInputElement } from './elements.js';

const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const WarningMessage = {
  WRONG_HASHTAG: 'введён невалидный хэштег',
  DUBLICATE_HASHTAGS: 'хэштеги повторяются',
  WRONG_HASHTAGS_COUNT: 'превышено количество хэштегов',
  WRONG_DESCRIPTION_LENGTH: `длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`,
};

let pristine;

const validateWrongHashtag = (value) => {
  const normalString = leaveOneSpace(value);
  return (normalString.length === 0) || (normalString.split(' ').every((element) => (HASHTAG_REGEXP).test(element)));
};

const validateDublicateHashtags = (value) => {
  const array = leaveOneSpace(value).split(' ');
  return new Set(array).size === array.length;
};

const validateHashtagsCount = (value) => {
  const array = leaveOneSpace(value).split(' ');
  return (array.length === 0) || (array.length <= HASHTAGS_MAX_COUNT);
};

const initValidateNewPost = () => {
  pristine = new Pristine(
    uploadImageFormElement,
    {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'img-upload__field-wrapper--error',
    });

  pristine.addValidator(
    hashtagsInputElement,
    validateWrongHashtag,
    WarningMessage.WRONG_HASHTAG,
    3,
    true
  );
  pristine.addValidator(
    hashtagsInputElement,
    validateDublicateHashtags,
    WarningMessage.DUBLICATE_HASHTAGS,
    2,
    true
  );
  pristine.addValidator(
    hashtagsInputElement,
    validateHashtagsCount,
    WarningMessage.WRONG_HASHTAGS_COUNT,
    1,
    true
  );

  pristine.addValidator(
    descriptionInputElement,
    //(value) => value.length <= DESCRIPTION_MAX_LENGTH,
    (value) => checkStringLength(value.trim()), DESCRIPTION_MAX_LENGTH,
    WarningMessage.WRONG_DESCRIPTION_LENGTH
  );
};

const resetValidateNewPost = () => pristine.reset();

const validateNewPostFrom = () => pristine.validate();

export { initValidateNewPost, resetValidateNewPost, validateNewPostFrom };

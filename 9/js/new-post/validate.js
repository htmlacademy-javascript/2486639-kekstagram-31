import { checkStringLength } from './../util/util.js';
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

const getHashtags = (string) => string.trim().toLocaleLowerCase().split(' ').filter((element) => (element) ? element : null);

const validateWrongHashtag = (value) => {
  const hashtags = getHashtags(value);
  return (hashtags.length === 0) || (hashtags.every((element) => HASHTAG_REGEXP.test(element)));
};

const validateDublicateHashtags = (value) => {
  const hashtags = getHashtags(value);
  return new Set(hashtags).size === hashtags.length;
};

const validateHashtagsCount = (value) => {
  const length = getHashtags(value).length;
  return (length === 0) || (length <= HASHTAGS_MAX_COUNT);
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
    (value) => checkStringLength(value, DESCRIPTION_MAX_LENGTH),
    WarningMessage.WRONG_DESCRIPTION_LENGTH
  );
};

const resetValidateNewPost = () => pristine.reset();

const validateNewPostFrom = () => pristine.validate();

export { initValidateNewPost, resetValidateNewPost, validateNewPostFrom };

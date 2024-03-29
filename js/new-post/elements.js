import { getTemplateElement } from './../util/dom.js';

const pristineClassList = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const messageOption = {
  success: {
    buttonSelector: '.success__button',
    innerSelector: '.success__inner'
  },
  error: {
    buttonSelector: '.error__button',
    innerSelector: '.error__inner'
  }
};

const effectsPreviewSelector = '.effects__item .effects__label .effects__preview';
const uploadImageFormElement = document.querySelector('#upload-select-image');
const uploadSubmitElement = uploadImageFormElement.querySelector('#upload-submit');
const imageUploadOverlayElement = uploadImageFormElement.querySelector('.img-upload__overlay');
const imageUploadInputElement = uploadImageFormElement.querySelector('#upload-file');
const imageUploadCancelElement = uploadImageFormElement.querySelector('#upload-cancel');
const hashtagsInputElement = uploadImageFormElement.querySelector('[name="hashtags"]');
const descriptionInputElement = uploadImageFormElement.querySelector('[name="description"]');
const imageUploadPreviewElement = uploadImageFormElement.querySelector('.img-upload__preview img');
const scaleControlInputElement = uploadImageFormElement.querySelector('.scale__control--value');
const scaleControlSmallerButtonElement = uploadImageFormElement.querySelector('.scale__control--smaller');
const scaleControlBiggerButtonElement = uploadImageFormElement.querySelector('.scale__control--bigger');
const effectsListElement = uploadImageFormElement.querySelector('.effects__list');
const effectLevelElement = uploadImageFormElement.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectLevelInputlement = effectLevelElement.querySelector('.effect-level__value');
const successTemplateElement = getTemplateElement('#success');
const errorTemplateElement = getTemplateElement('#error');

export {
  pristineClassList,
  messageOption,
  effectsPreviewSelector,
  uploadImageFormElement,
  uploadSubmitElement,
  imageUploadOverlayElement,
  imageUploadInputElement,
  imageUploadCancelElement,
  hashtagsInputElement,
  descriptionInputElement,
  imageUploadPreviewElement,
  scaleControlInputElement,
  scaleControlSmallerButtonElement,
  scaleControlBiggerButtonElement,
  effectsListElement,
  effectLevelElement,
  effectLevelSliderElement,
  effectLevelInputlement,
  successTemplateElement,
  errorTemplateElement
};

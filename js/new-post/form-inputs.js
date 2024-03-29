import { stopPropagationIfEscapeKey } from '../util/util.js';
import { effectsPreviewSelector, effectsListElement, hashtagsInputElement, descriptionInputElement } from './elements.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { initValidate, resetValidate, isValidated } from './validate.js';

const updateEffectsBackgroundImage = (backgroundImageURL = '') => {
  const backgroundImage = `url(${backgroundImageURL})`;
  effectsListElement.querySelectorAll(effectsPreviewSelector).forEach((element) => {
    element.style.backgroundImage = backgroundImage;
  });
};

const isValidatedFormInputs = () => isValidated();

const resetFormInputs = () => {
  resetScale();
  resetEffect();
  resetValidate();
};

const onHashtagsInputElementKeydown = (evt) => {
  stopPropagationIfEscapeKey(evt);
};

const onDescriptionInputElementKeydown = (evt) => {
  stopPropagationIfEscapeKey(evt);
};

const initFormInputs = () => {
  hashtagsInputElement.addEventListener('keydown', onHashtagsInputElementKeydown);
  descriptionInputElement.addEventListener('keydown', onDescriptionInputElementKeydown);
  initScale();
  initEffect();
  initValidate();
};

export { initFormInputs, resetFormInputs, isValidatedFormInputs, updateEffectsBackgroundImage };

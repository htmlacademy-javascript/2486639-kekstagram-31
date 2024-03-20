import { roundOneSignNumber } from './../util/util.js';
import { updateClassList } from './../util/dom.js';
import {
  imageUploadPreviewElement, effectsListElement, effectLevelElement,
  effectLevelSliderElement, effectLevelInputlement
} from './elements.js';
import { EffectOption, isNoneEffectOption } from './effect-option.js';

let currentEffectOption;

const updateSliderVisible = () => updateClassList(effectLevelElement, 'hidden', isNoneEffectOption(currentEffectOption));

const applyEffectOption = () => {
  if (isNoneEffectOption(currentEffectOption)) {
    imageUploadPreviewElement.style.removeProperty('filter');
  } else {
    const { filterType, filterUnit } = currentEffectOption;
    imageUploadPreviewElement.style.setProperty('filter', `${filterType}(${effectLevelInputlement.value}${filterUnit})`);
  }
};

const resetEffect = () => {
  currentEffectOption = EffectOption.none;
  updateSliderVisible();
  applyEffectOption();
};

const initEffect = () => {
  resetEffect();
  noUiSlider.create(effectLevelSliderElement, currentEffectOption.sliderOption);
  effectLevelSliderElement.noUiSlider.updateOptions({ format: { to: roundOneSignNumber, from: parseFloat, } });
  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelInputlement.value = effectLevelSliderElement.noUiSlider.get();
    applyEffectOption();
  });

  effectsListElement.addEventListener('click', (evt) => {
    const element = evt.target.closest('.effects__radio');
    if (element) {
      const newEffectOption = EffectOption[element.value];
      if (newEffectOption !== currentEffectOption) {
        currentEffectOption = newEffectOption;
        // видимость слайдера
        updateSliderVisible();
        // смена слайдера, т.к. в насройках есть start, то дополнительно не вызываю noUiSlider.set
        effectLevelSliderElement.noUiSlider.updateOptions(currentEffectOption.sliderOption);
        // отрисовка
        applyEffectOption();
      }
    }
  });
};

export { initEffect, resetEffect };

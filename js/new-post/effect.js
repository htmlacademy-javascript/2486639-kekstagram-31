import { roundOneSignNumber } from './../util/util.js';
import { updateClassList } from './../util/dom.js';
import {
  imageUploadPreviewElement, effectsListElement, effectLevelElement,
  effectLevelSliderElement, effectLevelInputlement
} from './elements.js';
import { effectTypeList } from './effect-type-list.js';

let currentEffectType;

const updateSliderVisible = () => updateClassList(effectLevelElement, 'hidden', currentEffectType === effectTypeList.none);

const applyEffectOption = () => {
  if (currentEffectType === effectTypeList.none) {
    imageUploadPreviewElement.style.removeProperty('filter');
  } else {
    const { filterType, filterUnit } = currentEffectType;
    imageUploadPreviewElement.style.setProperty('filter', `${filterType}(${effectLevelInputlement.value}${filterUnit})`);
  }
};

const resetEffect = () => {
  currentEffectType = effectTypeList.none;
  updateSliderVisible();
  applyEffectOption();
};

const initEffect = () => {
  resetEffect();
  noUiSlider.create(effectLevelSliderElement, currentEffectType.sliderOption);
  effectLevelSliderElement.noUiSlider.updateOptions({ format: { to: roundOneSignNumber, from: parseFloat, } });
  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelInputlement.value = effectLevelSliderElement.noUiSlider.get();
    applyEffectOption();
  });

  effectsListElement.addEventListener('change', (evt) => {
    const newEffectOption = effectTypeList[evt.target.value];
    if (newEffectOption !== currentEffectType) {
      currentEffectType = newEffectOption;
      // видимость слайдера
      updateSliderVisible();
      // смена слайдера, т.к. в насройках есть start, то дополнительно не вызываю noUiSlider.set
      effectLevelSliderElement.noUiSlider.updateOptions(currentEffectType.sliderOption);
      // отрисовка
      applyEffectOption();
    }
  });
};

export { initEffect, resetEffect };

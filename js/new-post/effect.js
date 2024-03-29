import { roundToTenths } from './../util/util.js';
import { updateClassList } from './../util/dom.js';
import { hiddenClass } from './../elements.js';
import {
  imageUploadPreviewElement, effectsListElement, effectLevelElement,
  effectLevelSliderElement, effectLevelInputlement
} from './elements.js';
import { defaultSliderOption, effectList } from './effect-list.js';

let currentEffect;

const sliderFormatOption = {
  to: roundToTenths,
  from: parseFloat
};

const updateSliderVisible = () => {
  updateClassList(effectLevelElement, hiddenClass, !currentEffect);
};

const applyEffect = () => {
  if (currentEffect) {
    const { filterType, filterUnit } = currentEffect;
    imageUploadPreviewElement.style.setProperty('filter', `${filterType}(${effectLevelInputlement.value}${filterUnit})`);
  } else {
    imageUploadPreviewElement.style.removeProperty('filter');
  }
};

const resetEffect = (needApplyEffect = true) => {
  currentEffect = null;
  updateSliderVisible();
  if (needApplyEffect) {
    applyEffect();
  }
};

const onEffectLevelSliderElementUpdate = () => {
  effectLevelInputlement.value = effectLevelSliderElement.noUiSlider.get();
  applyEffect();
};

const onEffectsListElementChange = (evt) => {
  const newEffect = effectList[evt.target.value];
  if (newEffect !== currentEffect) {
    currentEffect = newEffect;
    // видимость слайдера
    updateSliderVisible();
    // смена слайдера, т.к. в насройках есть start, то дополнительно не вызываю noUiSlider.set
    const newSliderOption = (currentEffect) ? currentEffect.sliderOption : defaultSliderOption;
    effectLevelSliderElement.noUiSlider.updateOptions(newSliderOption);
    // не вызываем applyEffectOption, т.к. отрисовка будет вызвана при применении параметра 'start' у слайдера
  }
};

const initEffect = () => {
  resetEffect(false);
  noUiSlider.create(effectLevelSliderElement, defaultSliderOption);
  effectLevelSliderElement.noUiSlider.updateOptions({ format: sliderFormatOption });
  effectLevelSliderElement.noUiSlider.on('update', onEffectLevelSliderElementUpdate);
  effectsListElement.addEventListener('change', onEffectsListElementChange);
};

export { initEffect, resetEffect };

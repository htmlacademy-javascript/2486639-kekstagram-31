import { roundOneSignNumber } from './../util/util.js';
import { updateClassList } from './../util/dom.js';
import { hiddenClass } from './../elements.js';
import {
  imageUploadPreviewElement, effectsListElement, effectLevelElement,
  effectLevelSliderElement, effectLevelInputlement
} from './elements.js';
import { defaultSliderOption, effectList } from './effect-list.js';

let currentEffect;

const formatSliderOption = {
  to: roundOneSignNumber,
  from: parseFloat
};

const updateSliderVisible = () => {
  updateClassList(effectLevelElement, hiddenClass, !currentEffect);
};

const applyEffectOption = () => {
  if (currentEffect) {
    const { filterType, filterUnit } = currentEffect;
    const filter = `${filterType}(${effectLevelInputlement.value}${filterUnit})`;
    imageUploadPreviewElement.style.setProperty('filter', filter);
  } else {
    imageUploadPreviewElement.style.removeProperty('filter');
  }
};

const resetEffect = (needApply = true) => {
  currentEffect = null;
  updateSliderVisible();
  if (needApply) {
    applyEffectOption();
  }
};

const onEffectLevelSliderElementUpdate = () => {
  effectLevelInputlement.value = effectLevelSliderElement.noUiSlider.get();
  applyEffectOption();
};

const onEffectsListElementChange = (evt) => {
  const newEffectOption = effectList[evt.target.value];
  if (newEffectOption !== currentEffect) {
    currentEffect = newEffectOption;
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
  effectLevelSliderElement.noUiSlider.updateOptions({ format: formatSliderOption });
  effectLevelSliderElement.noUiSlider.on('update', onEffectLevelSliderElementUpdate);
  effectsListElement.addEventListener('change', onEffectsListElementChange);
};

export { initEffect, resetEffect };

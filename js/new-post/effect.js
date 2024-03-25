import { roundOneSignNumber } from './../util/util.js';
import { updateClassList } from './../util/dom.js';
import { hiddenClass } from './../elements.js';
import {
  imageUploadPreviewElement, effectsListElement, effectLevelElement,
  effectLevelSliderElement, effectLevelInputlement
} from './elements.js';
import { defaultSliderOption, effectList } from './effect-list.js';

let currentEffect;

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
  updateSliderVisible();
  if (needApply) {
    applyEffectOption();
  }
};

const initEffect = () => {
  resetEffect(false);
  noUiSlider.create(effectLevelSliderElement, defaultSliderOption);
  effectLevelSliderElement.noUiSlider.updateOptions({ connect: false });

  effectLevelSliderElement.noUiSlider.updateOptions(
    {
      format: {
        to: roundOneSignNumber,
        from: parseFloat
      }
    });
  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelInputlement.value = effectLevelSliderElement.noUiSlider.get();
    applyEffectOption();
  });

  effectsListElement.addEventListener('change', (evt) => {
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
  });
};

export { initEffect, resetEffect };

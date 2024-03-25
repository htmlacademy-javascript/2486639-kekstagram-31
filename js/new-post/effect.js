import { roundOneSignNumber } from './../util/util.js';
import { updateClassList } from './../util/dom.js';
import { hiddenClass } from './../elements.js';
import {
  imageUploadPreviewElement, effectsListElement, effectLevelElement,
  effectLevelSliderElement, effectLevelInputlement
} from './elements.js';
import { effectList } from './effect-list.js';

let currentEffect;

const updateSliderVisible = () => {
  updateClassList(effectLevelElement, hiddenClass, currentEffect === effectList.none);
};

const applyEffectOption = () => {
  if (currentEffect === effectList.none) {
    imageUploadPreviewElement.style.removeProperty('filter');
  } else {
    const { filterType, filterUnit } = currentEffect;
    const filter = `${filterType}(${effectLevelInputlement.value}${filterUnit})`;
    imageUploadPreviewElement.style.setProperty('filter', filter);
  }
};

const resetEffect = () => {
  currentEffect = effectList.none;
  updateSliderVisible();
  applyEffectOption();
};

const initEffect = () => {
  resetEffect();
  noUiSlider.create(effectLevelSliderElement, currentEffect.sliderOption);
  effectLevelSliderElement.noUiSlider.updateOptions(
    {
      format:
      {
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
      effectLevelSliderElement.noUiSlider.updateOptions(currentEffect.sliderOption);
      // отрисовка
      applyEffectOption();
    }
  });
};

export { initEffect, resetEffect };

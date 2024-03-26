import {
  imageUploadPreviewElement, scaleControlInputElement,
  scaleControlSmallerButtonElement, scaleControlBiggerButtonElement
} from './elements.js';

const ScaleSetting = {
  MIN: 0.25,
  MAX: 1,
  STEP: 0.25
};

let currentScale;

const applyScale = () => {
  scaleControlInputElement.value = `${(currentScale * 100)}%`;
  imageUploadPreviewElement.style.setProperty('transform', `scale(${currentScale}`);
};

const changeScale = (isBigger) => {
  let scale = currentScale + ((isBigger) ? 1 : -1) * ScaleSetting.STEP;

  if ((scale < ScaleSetting.MIN) || (scale > ScaleSetting.MAX)) {
    scale = currentScale;
  }

  if (scale !== currentScale) {
    currentScale = scale;
    applyScale();
  }
};

const resetScale = () => {
  currentScale = ScaleSetting.MAX;
  applyScale();
};

const initScale = () => {
  scaleControlSmallerButtonElement.addEventListener('click', () => changeScale(false));
  scaleControlBiggerButtonElement.addEventListener('click', () => changeScale(true));
  resetScale();
};

export { initScale, resetScale };

import {
  imageUploadPreviewElement, scaleControlInputElement,
  scaleControlSmallerButtonElement, scaleControlBiggerButtonElement
} from './elements.js';

const ScaleOption = {
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
  let scale = currentScale + ((isBigger) ? 1 : -1) * ScaleOption.STEP;

  if ((scale < ScaleOption.MIN) || (scale > ScaleOption.MAX)) {
    scale = currentScale;
  }

  if (scale !== currentScale) {
    currentScale = scale;
    applyScale();
  }
};

const resetScale = () => {
  currentScale = ScaleOption.MAX;
  applyScale();
};

const initScale = () => {
  scaleControlSmallerButtonElement.addEventListener('click', () => changeScale(false));
  scaleControlBiggerButtonElement.addEventListener('click', () => changeScale(true));
  resetScale();
};

export { initScale, resetScale };

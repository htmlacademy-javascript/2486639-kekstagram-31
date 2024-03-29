import { imageUploadPreviewElement, scaleControlInputElement, scaleControlSmallerButtonElement, scaleControlBiggerButtonElement } from './elements.js';

const ScaleSetting = {
  MIN: 0.25,
  MAX: 1,
  STEP: 0.25
};

let currentScale = ScaleSetting.MAX;

const applyScale = () => {
  scaleControlInputElement.value = `${(currentScale * 100)}%`;
  imageUploadPreviewElement.style.setProperty('transform', `scale(${currentScale}`);
};

const changeScale = (isBigger) => {
  const { MIN, MAX, STEP } = ScaleSetting;
  let newScale = currentScale + ((isBigger) ? 1 : -1) * STEP;

  if ((newScale < MIN) || (newScale > MAX)) {
    newScale = currentScale;
  }

  if (newScale !== currentScale) {
    currentScale = newScale;
    applyScale();
  }
};

const resetScale = () => {
  currentScale = ScaleSetting.MAX;
  applyScale();
};

const onScaleControlSmallerButtonElementClick = () => {
  changeScale(false);
};

const onScaleControlBiggerButtonElementClick = () => {
  changeScale(true);
};

const initScale = () => {
  scaleControlSmallerButtonElement.addEventListener('click', onScaleControlSmallerButtonElementClick);
  scaleControlBiggerButtonElement.addEventListener('click', onScaleControlBiggerButtonElementClick);
};

export { initScale, resetScale };

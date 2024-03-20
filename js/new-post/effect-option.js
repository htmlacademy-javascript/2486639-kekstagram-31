const EffectOption = {
  none: {
    sliderOption: {
      range: { min: 0, max: 0 },
      step: 0,
      start: 0,
    },
    filterType: 'none',
    filterUnit: '',
  },
  chrome: {
    sliderOption: {
      range: { min: 0, max: 1 },
      step: 0.1,
      start: 1,
    },
    filterType: 'grayscale',
    filterUnit: '',
  },
  sepia: {
    sliderOption: {
      range: { min: 0, max: 1 },
      step: 0.1,
      start: 1,
    },
    filterType: 'sepia',
    filterUnit: '',
  },
  marvin: {
    sliderOption: {
      range: { min: 0, max: 100 },
      step: 1,
      start: 100,
    },
    filterType: 'invert',
    filterUnit: '%',
  },
  phobos: {
    sliderOption: {
      range: { min: 0, max: 3 },
      step: 0.1,
      start: 3,
    },
    filterType: 'blur',
    filterUnit: 'px',
  },
  heat: {
    sliderOption: {
      range: { min: 1, max: 3 },
      step: 0.1,
      start: 3,
    },
    filterType: 'brightness',
    filterUnit: '',
  },
};

const isNoneEffectOption = (effectOption) => (effectOption === EffectOption.none);

export { EffectOption, isNoneEffectOption };

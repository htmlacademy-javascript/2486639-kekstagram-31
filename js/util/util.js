const checkStringLength = (string, length) => string.length <= length;

const roundOneSignNumber = (value) => {
  if (Number.isInteger(value)) {
    return value.toFixed(0);
  }
  return value.toFixed(1);
};

const getRandomNumber = (minNumber = 0, maxNumber = 0) => {
  const absMinNumber = Math.abs(minNumber);
  const absMaxNumber = Math.abs(maxNumber);

  const realMinNumber = Math.min(absMinNumber, absMaxNumber);
  const realMaxNumber = Math.max(absMinNumber, absMaxNumber);

  const startNumber = Math.ceil(realMinNumber);
  const endNumber = Math.floor(realMaxNumber);

  const result = Math.random() * (endNumber - startNumber + 1) + startNumber;

  return Math.floor(result);
};

const createIdGenerator = (minNumber = 0, maxNumber = 0) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomNumber(minNumber, maxNumber);

    if (previousValues.length >= (maxNumber - minNumber + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${minNumber} до ${maxNumber}`);
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(minNumber, maxNumber);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

const getRandomArray = (elements, сount) => {
  const getRandomIndex = createIdGenerator(0, elements.length - 1);
  return Array.from({ length: сount }, () => elements[getRandomIndex()]);
};

const removeNullElements = (elements) => elements.filter((element) => (element) ? element : null);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

export {
  checkStringLength,
  roundOneSignNumber,
  getRandomNumber,
  createIdGenerator,
  getRandomArray,
  removeNullElements,
  isEscapeKey,
  isEnterKey
};

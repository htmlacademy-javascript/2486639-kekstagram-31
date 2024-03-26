const throwError = (errorMessage) => {
  if (!errorMessage) {
    errorMessage = 'Нет сообщения об ошибке!';
  }
  if (errorMessage.stack) {
    errorMessage = errorMessage.stack;
  }
  //!! ??
  //if (errorMessage.message && errorMessage.stack) {
  //  errorMessage = `${errorMessage.message}\n ${errorMessage.stack}`;
  //}
  //console.log(errorMessage);
  //console.log(errorMessage.message);
  //console.log(errorMessage.stack);
  //throw new Error(errorMessage);
  //throw new Error(errorMessage.message);
  //throw new Error(errorMessage.stack);
  throw new Error(errorMessage);
};

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
      throwError(`Перебраны все числа из диапазона от ${minNumber} до ${maxNumber}`);
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

export {
  throwError,
  checkStringLength,
  roundOneSignNumber,
  getRandomNumber,
  createIdGenerator,
  getRandomArray,
  removeNullElements,
  isEscapeKey
};
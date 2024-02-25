function getRandomNumber(minNumber = 0, maxNumber = 0) {
  const absMinNumber = Math.abs(minNumber);
  const absMaxNumber = Math.abs(maxNumber);

  const realMinNumber = Math.min(absMinNumber, absMaxNumber);
  const realMaxNumber = Math.max(absMinNumber, absMaxNumber);

  const startNumber = Math.ceil(realMinNumber);
  const endNumber = Math.floor(realMaxNumber);

  const result = Math.random() * (endNumber - startNumber + 1) + startNumber;

  return Math.floor(result);
}

function createFunctionToGetUniqueRandomNumberFromRange(minNumber = 0, maxNumber = 0) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(minNumber, maxNumber);

    if (previousValues.length >= (maxNumber - minNumber + 1)) {
      //console.error('Перебраны все числа из диапазона от ' + minNumber + ' до ' + maxNumber);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(minNumber, maxNumber);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
}

const getRandomArrayElement = (elements) => (elements.length === 0) ? null : elements[getRandomNumber(0, elements.length - 1)];

const getRandomArrayElements = (elements = [], maxCount = 1) => {
  if ((elements.length === 0) || (maxCount < 1)) {
    return null;
  }

  if (maxCount >= elements.length) {
    return structuredClone(elements);
  }

  if (maxCount === 1) {
    return [getRandomArrayElement(elements)];
  }

  const generateElemetIndex = createFunctionToGetUniqueRandomNumberFromRange(1, maxCount);

  return Array.from({ length: getRandomNumber(1, maxCount) }, () => elements[generateElemetIndex()]);
};

const IMAGES_COUNT = 25;

const IMAGE_ID_MIN = 1;
const IMAGE_ID_MAX = 25; // IMAGE_ID_MIN + IMAGES_COUNT - 1;

const IMAGE_URL_PHOTOS_MIN_NUMBER = 1;
const IMAGE_URL_PHOTOS_MAX_NUMBER = 25;

const IMAGE_LIKES_MIN = 15;
const IMAGE_LIKES_MAX = 200;

const IMAGE_COMMENTS_MAX_COUNT = 30;

const COMMENT_AVATAR_MIN_NUMBER = 1;
const COMMENT_AVATAR_MAX_NUMBER = 6;

const COMMENT_MESSAGE_MAX_COUNT = 2;

const IMAGE_DESCRIPTIONS = [
  'Я на море!',
  'Горы',
  'Семейное фото',
  'Было время...',
  'Чудо',
  'Работа'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAMES = [
  'Артём',
  'Андрей',
  'Мария',
  'Олег',
  'Виктор',
  'Борис',
  'Олеся',
  'Виктория',
  'Алексей',
  'Евгений'
];

const generateImageId = createFunctionToGetUniqueRandomNumberFromRange(IMAGE_ID_MIN, IMAGE_ID_MAX);

const generateImageUrlPhotosNumber = createFunctionToGetUniqueRandomNumberFromRange(IMAGE_URL_PHOTOS_MIN_NUMBER, IMAGE_URL_PHOTOS_MAX_NUMBER);

//Если Id комментария уникален для всех изображений
const generateCommentId = createFunctionToGetUniqueRandomNumberFromRange(1, IMAGES_COUNT * IMAGE_COMMENTS_MAX_COUNT);

const generateImageComments = () => {
  const commentsCount = getRandomNumber(0, IMAGE_COMMENTS_MAX_COUNT);

  //Если Id комментария уникален в изображении
  //const generateCommentId = createFunctionToGetUniqueRandomNumberFromRange(1, commentsCount);

  const generateComment = () => (
    {
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomNumber(COMMENT_AVATAR_MIN_NUMBER, COMMENT_AVATAR_MAX_NUMBER)}.svg`,
      message: getRandomArrayElements(COMMENT_MESSAGES, COMMENT_MESSAGE_MAX_COUNT).join(' '),
      name: getRandomArrayElement(COMMENT_NAMES)
    });

  return Array.from({ length: commentsCount }, generateComment);
};

const createImage = () => (
  {
    id: generateImageId(),
    url: `photos/${generateImageUrlPhotosNumber()}.jpg`,
    description: getRandomArrayElement(IMAGE_DESCRIPTIONS),
    likes: getRandomNumber(IMAGE_LIKES_MIN, IMAGE_LIKES_MAX),
    comments: generateImageComments()
  });

const generateImages = () => Array.from({ length: IMAGES_COUNT }, createImage);

const Images = generateImages();

//Images[0].id = 30;

// eslint-disable-next-line no-console
console.log(Images);

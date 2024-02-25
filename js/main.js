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

const createIdGenerator = (minNumber = 0, maxNumber = 0) => {
  const previousValues = [];

  return () => {
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
};

const getRandomArrayElement = (elements) => (elements.length === 0) ? null : elements[getRandomNumber(0, elements.length - 1)];

const getRandomArrayElements = (elements = [], maxCount = 1) => {
  if ((elements.length === 0) || (maxCount < 1)) {
    return null;
  }

  if (maxCount === 1) {
    return [getRandomArrayElement(elements)];
  }

  if (maxCount >= elements.length) {
    return structuredClone(elements);
  }

  const generateElemetIndex = createIdGenerator(1, maxCount);

  return Array.from({ length: getRandomNumber(1, maxCount) }, () => elements[generateElemetIndex()]);
};

const POSTS_COUNT = 25;

const POST_ID_MIN = 1;
const POST_ID_MAX = 25; // POST_ID_MIN + POSTS_COUNT - 1;

const POST_URL_PHOTOS_MIN_NUMBER = 1;
const POST_URL_PHOTOS_MAX_NUMBER = 25;

const POST_LIKES_MIN = 15;
const POST_LIKES_MAX = 200;

const POST_COMMENTS_MAX_COUNT = 30;

const COMMENT_AVATAR_MIN_NUMBER = 1;
const COMMENT_AVATAR_MAX_NUMBER = 6;

const COMMENT_MESSAGE_MAX_COUNT = 2;

const POST_DESCRIPTIONS = [
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

const generatePostId = createIdGenerator(POST_ID_MIN, POST_ID_MAX);

const generatePostUrlPhotosNumber = createIdGenerator(POST_URL_PHOTOS_MIN_NUMBER, POST_URL_PHOTOS_MAX_NUMBER);

const generateCommentId = createIdGenerator(1, POSTS_COUNT * POST_COMMENTS_MAX_COUNT);

const generatePostComments = () => {
  const commentsCount = getRandomNumber(0, POST_COMMENTS_MAX_COUNT);

  const generateComment = () => (
    {
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomNumber(COMMENT_AVATAR_MIN_NUMBER, COMMENT_AVATAR_MAX_NUMBER)}.svg`,
      message: getRandomArrayElements(COMMENT_MESSAGES, COMMENT_MESSAGE_MAX_COUNT).join(' '),
      name: getRandomArrayElement(COMMENT_NAMES)
    });

  return Array.from({ length: commentsCount }, generateComment);
};

const createPost = () => (
  {
    id: generatePostId(),
    url: `photos/${generatePostUrlPhotosNumber()}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTIONS),
    likes: getRandomNumber(POST_LIKES_MIN, POST_LIKES_MAX),
    comments: generatePostComments()
  });

const generatePosts = () => Array.from({ length: POSTS_COUNT }, createPost);

const Posts = generatePosts();

//Posts[0].id = 30;

// eslint-disable-next-line no-console
console.log(Posts);

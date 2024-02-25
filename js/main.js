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

const PostParam = {
  COUNT: 25,
  ID_START: 1,
  ID_END: 25, // ID_START + COUNT - 1,
  URL_PHOTOS_MIN_NUMBER: 1,
  URL_PHOTOS_MAX_NUMBER: 25,
  LIKES_MIN: 15,
  LIKES_MAX: 200,
};

const CommentsParam = {
  MAX_COUNT: 30,
  AVATAR_MIN_NUMBER: 1,
  AVATAR_MAX_NUMBER: 6,
  MESSAGE_MAX_COUNT: 2,
};

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

const generatePostId = createIdGenerator(PostParam.ID_START, PostParam.ID_END);

const generatePostUrlPhotosNumber = createIdGenerator(PostParam.URL_PHOTOS_MIN_NUMBER, PostParam.URL_PHOTOS_MAX_NUMBER);

const generateCommentId = createIdGenerator(1, PostParam.COUNT * CommentsParam.MAX_COUNT);

const generatePostComments = () => {
  const commentsCount = getRandomNumber(0, CommentsParam.MAX_COUNT);

  const generateComment = () => (
    {
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomNumber(CommentsParam.AVATAR_MIN_NUMBER, CommentsParam.AVATAR_MAX_NUMBER)}.svg`,
      message: getRandomArrayElements(COMMENT_MESSAGES, CommentsParam.MESSAGE_MAX_COUNT).join(' '),
      name: getRandomArrayElement(COMMENT_NAMES)
    });

  return Array.from({ length: commentsCount }, generateComment);
};

const createPost = () => (
  {
    id: generatePostId(),
    url: `photos/${generatePostUrlPhotosNumber()}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTIONS),
    likes: getRandomNumber(PostParam.LIKES_MIN, PostParam.LIKES_MAX),
    comments: generatePostComments()
  });

const generatePosts = () => Array.from({ length: PostParam.COUNT }, createPost);

const Posts = generatePosts();

//Posts[0].id = 30;

// eslint-disable-next-line no-console
console.log(Posts);

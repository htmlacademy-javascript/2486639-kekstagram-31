import { getRandomNumber, createIdGenerator, getRandomArrayElement, getRandomArrayElements } from './util/util.js';

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
  'Работа',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
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
  'Евгений',
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
      name: getRandomArrayElement(COMMENT_NAMES),
    });

  return Array.from({ length: commentsCount }, generateComment);
};

const createPost = () => (
  {
    id: generatePostId(),
    url: `photos/${generatePostUrlPhotosNumber()}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTIONS),
    likes: getRandomNumber(PostParam.LIKES_MIN, PostParam.LIKES_MAX),
    comments: generatePostComments(),
  });

const generatePosts = () => Array.from({ length: PostParam.COUNT }, createPost);

export { generatePosts };

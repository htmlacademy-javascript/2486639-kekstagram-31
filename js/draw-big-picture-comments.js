import { getFirstElementChild, removeChilds, createFragment } from './util/dom.js';
import { commentShowCountElement } from './draw-big-picture.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5,
};

const commentsContainer = document.querySelector('.social__comments');
let commentTemplate;
let currentComments = [];
let commentsShowCount = 0;

const isAllcommentsShow = () => (commentsShowCount === 0) || (commentsShowCount === currentComments.length);

const clearBigPictureComments = () => {
  currentComments = [];
  commentsShowCount = 0;
  removeChilds(commentsContainer);
};

const initDrawBigPictureComments = () => {
  commentTemplate = getFirstElementChild('social__comments');
  removeChilds(commentsContainer);
};

const createElement = ({ avatar, name, message }) => {
  const newElement = commentTemplate.cloneNode(true);
  const commentImageElement = newElement.querySelector('.social__picture');
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  newElement.querySelector('.social__text').textContent = message;
  return newElement;
};

const drawBigPictureComments = (newShowCommentsCount) => {
  newShowCommentsCount = Math.min(newShowCommentsCount, currentComments.length);
  commentsContainer.append(createFragment(currentComments.slice(commentsShowCount, newShowCommentsCount), createElement));
  commentsShowCount = newShowCommentsCount;

  commentShowCountElement.textContent = commentsShowCount;
};

const drawComments = (comments) => {
  currentComments = comments;
  drawBigPictureComments(CommentsCount.ON_START);
};

const drawMoreComments = () => drawBigPictureComments(commentsShowCount + CommentsCount.LOAD_MORE);

export { initDrawBigPictureComments, clearBigPictureComments, drawComments, drawMoreComments, isAllcommentsShow };

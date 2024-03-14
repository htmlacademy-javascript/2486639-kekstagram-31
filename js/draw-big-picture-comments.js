import { getFirstElementChild, removeChilds, createFragment } from './util/dom.js';
import { commentShowCountElement } from './draw-big-picture.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5,
};

const commentsContainerElement = document.querySelector('.social__comments');
let commentTemplateElement;
let currentComments = [];
let commentsShowCount = 0;

const isAllCommentsShow = () => (commentsShowCount === 0) || (commentsShowCount === currentComments.length);

const clearComments = () => {
  currentComments = [];
  commentsShowCount = 0;
  removeChilds(commentsContainerElement);
};

const initDrawComments = () => {
  commentTemplateElement = getFirstElementChild('social__comments');
  removeChilds(commentsContainerElement);
};

const createElement = ({ avatar, name, message }) => {
  const newElement = commentTemplateElement.cloneNode(true);
  const commentImageElement = newElement.querySelector('.social__picture');
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  newElement.querySelector('.social__text').textContent = message;
  return newElement;
};

const drawComments = (newShowCommentsCount) => {
  newShowCommentsCount = Math.min(newShowCommentsCount, currentComments.length);
  commentsContainerElement.append(createFragment(currentComments.slice(commentsShowCount, newShowCommentsCount), createElement));
  commentsShowCount = newShowCommentsCount;

  commentShowCountElement.textContent = commentsShowCount;
};

const drawStartComments = (comments) => {
  currentComments = comments;
  drawComments(CommentsCount.ON_START);
};

const drawMoreComments = () => drawComments(commentsShowCount + CommentsCount.LOAD_MORE);

export { initDrawComments, clearComments, drawStartComments, drawMoreComments, isAllCommentsShow };

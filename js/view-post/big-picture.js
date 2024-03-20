
import { getFirstElementChild, removeChilds, createFragment } from './../util/dom.js';
import {
  likesCountElement, imageElement, commentShowCountElement, commentTotalCountElement,
  captionElement, socialCommentsClassName, commentsContainerElement
} from './elements.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5,
};

let commentTemplateElement;
let currentComments = [];
let commentsShowCount = 0;

const isAllBigPictureCommentsShow = () => (commentsShowCount === 0) || (commentsShowCount === currentComments.length);

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

const drawMoreBigPictureComments = () => drawComments(commentsShowCount + CommentsCount.LOAD_MORE);

const renderImageElement = ({ url, description, likes, comments }) => {
  imageElement.src = url;
  imageElement.alt = description;
  likesCountElement.textContent = likes;
  commentShowCountElement.textContent = 0;
  commentTotalCountElement.textContent = comments.length;
  captionElement.textContent = description;
};

const clearBigPicture = () => {
  currentComments = [];
  commentsShowCount = 0;
  removeChilds(commentsContainerElement);
  renderImageElement({ url: '', description: '', likes: 0, comments: [] });
};

const drawBigPicture = (post) => {
  currentComments = post.comments;
  renderImageElement(post);
  drawComments(CommentsCount.ON_START);
};

const initDrawBigPicture = () => {
  commentTemplateElement = getFirstElementChild(socialCommentsClassName);
  clearBigPicture();
};

export { initDrawBigPicture, drawBigPicture, clearBigPicture, drawMoreBigPictureComments, isAllBigPictureCommentsShow };

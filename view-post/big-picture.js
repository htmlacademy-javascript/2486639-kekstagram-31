import { addDot } from './../util/util.js';
import { removeChilds, createFragment, clearSelected } from './../util/dom.js';
import {
  socialPictureClass, socialTextClass, likesCountElement, imageElement, commentShowCountElement,
  commentTotalCountElement, captionElement, commentsContainerElement, commentTemplateElement
} from './elements.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5
};

let currentComments = [];
let commentsShowCount = 0;

const isAllBigPictureCommentsShow = () => ((commentsShowCount === 0) || (commentsShowCount === currentComments.length));

const createElement = ({ avatar, name, message }) => {
  const newElement = commentTemplateElement.cloneNode(true);
  const commentImageElement = newElement.querySelector(addDot(socialPictureClass));
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  newElement.querySelector(addDot(socialTextClass)).textContent = message;
  return newElement;
};

const drawComments = (newShowCommentsCount) => {
  newShowCommentsCount = Math.min(newShowCommentsCount, currentComments.length);
  const comments = currentComments.slice(commentsShowCount, newShowCommentsCount);
  const fragment = createFragment(comments, createElement);
  commentsContainerElement.append(fragment);
  commentsShowCount = newShowCommentsCount;

  commentShowCountElement.textContent = commentsShowCount;
};

const drawMoreBigPictureComments = () => {
  drawComments(commentsShowCount + CommentsCount.LOAD_MORE);
};

const renderImageElement = ({ url, description, likes, comments }) => {
  imageElement.src = url;
  imageElement.alt = description;
  likesCountElement.textContent = likes;
  commentShowCountElement.textContent = 0;
  commentTotalCountElement.textContent = comments.length;
  captionElement.textContent = description;
  if (url) {
    // Баг оставалось выделение и курссор ввода
    clearSelected();
    imageElement.focus();
  }
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

export { drawBigPicture, clearBigPicture, drawMoreBigPictureComments, isAllBigPictureCommentsShow };

import { removeChilds, createFragment, clearSelected, updateClassList } from './../util/dom.js';
import {
  socialSelectorList, likesCountActiveClass, likesCountElement,
  imageElement, commentShowCountElement, commentTotalCountElement,
  captionElement, commentsContainerElement, commentTemplateElement
} from './elements.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5
};

let currentComments = [];
let commentsShowCount = 0;
let likesCount;

const isAllBigPictureCommentsShow = () => ((commentsShowCount === 0) || (commentsShowCount === currentComments.length));

const createElement = ({ avatar, name, message }) => {
  const newElement = commentTemplateElement.cloneNode(true);
  const commentImageElement = newElement.querySelector(socialSelectorList.picture);
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  newElement.querySelector(socialSelectorList.text).textContent = message;
  return newElement;
};

const drawComments = (newShowCommentsCount) => {
  if (newShowCommentsCount === -1) {
    newShowCommentsCount = commentsShowCount + 1;
    commentsShowCount = 0;
    removeChilds(commentsContainerElement);
  } else {
    newShowCommentsCount = Math.min(newShowCommentsCount, currentComments.length);
  }

  const comments = currentComments.slice(commentsShowCount, newShowCommentsCount);
  const fragment = createFragment(comments, createElement);
  commentsContainerElement.append(fragment);
  commentsShowCount = newShowCommentsCount;
  commentShowCountElement.textContent = commentsShowCount;
};

const drawMoreBigPictureComments = (newComment = null) => {
  let newCommentsShowCount = commentsShowCount + CommentsCount.LOAD_MORE;

  if (newComment) {
    currentComments.unshift(newComment);
    newCommentsShowCount = -1;
  }

  drawComments(newCommentsShowCount);
};

const updateLikesCount = () => {
  const isLikeActive = likesCountElement.classList.contains(likesCountActiveClass);
  updateClassList(likesCountElement, likesCountActiveClass, !isLikeActive);
  likesCount += (isLikeActive) ? -1 : 1;
  likesCountElement.textContent = likesCount;
};

const renderImageElement = ({ url, description, likes, comments }) => {
  imageElement.src = url;
  imageElement.alt = description;
  likesCount = likes;
  likesCountElement.textContent = likes;
  commentShowCountElement.textContent = 0;
  commentTotalCountElement.textContent = comments.length;
  captionElement.textContent = description;
  if (url) {
    // Баг оставалось выделение
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

export { drawBigPicture, clearBigPicture, updateLikesCount, drawMoreBigPictureComments, isAllBigPictureCommentsShow };

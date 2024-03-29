import { updateClassList, removeChilds, createFragment } from './../util/dom.js';
import { hiddenClass } from './../elements.js';
import {
  socialSelectorList, commentCountElement, commentsLoaderElement, commentShownCountElement,
  footerTextElement, commentsContainerElement, commentTemplateElement
} from './elements.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5
};

let currentComments = [];
let shownCommentsCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const newElement = commentTemplateElement.cloneNode(true);
  const commentImageElement = newElement.querySelector(socialSelectorList.picture);
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  newElement.querySelector(socialSelectorList.text).textContent = message;
  return newElement;
};

const isAllCommentsShown = () => shownCommentsCount === currentComments.length;

const updateCommentsLoaderVisible = () => {
  const isAllCommentsShow = isAllCommentsShown();
  // Скроем надпись и ссылку, т.к. все комментарии загружены
  updateClassList(commentCountElement, hiddenClass, isAllCommentsShow);
  updateClassList(commentsLoaderElement, hiddenClass, isAllCommentsShow);
};

const drawComments = (newShownCommentsCount) => {
  newShownCommentsCount = Math.min(newShownCommentsCount, currentComments.length);

  const comments = currentComments.slice(shownCommentsCount, newShownCommentsCount);
  if (shownCommentsCount < newShownCommentsCount) {
    const fragment = createFragment(comments, createCommentElement);
    commentsContainerElement.append(fragment);
    shownCommentsCount = newShownCommentsCount;
    commentShownCountElement.textContent = shownCommentsCount;
  }
};

const drawNewComment = (newComment) => {
  const newShownCommentsCount = shownCommentsCount + 1;

  currentComments.splice(shownCommentsCount, 0, newComment);
  shownCommentsCount = 0;
  removeChilds(commentsContainerElement);
  drawComments(newShownCommentsCount);
};

const clearComments = () => {
  currentComments = [];
  shownCommentsCount = 0;
  removeChilds(commentsContainerElement);
  footerTextElement.value = '';
};

const drawMoreComments = () => {
  drawComments(shownCommentsCount + CommentsCount.LOAD_MORE);
  updateCommentsLoaderVisible();
};

const drawFirstComments = (comments) => {
  currentComments = comments;
  drawComments(CommentsCount.ON_START);
  updateCommentsLoaderVisible();
};

export { drawFirstComments, drawMoreComments, clearComments, drawNewComment };

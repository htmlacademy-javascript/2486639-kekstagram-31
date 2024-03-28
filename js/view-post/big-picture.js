import { removeChilds, createFragment, clearSelected, updateClassList } from './../util/dom.js';
import {
  socialSelectorList, likesCountActiveClass, bigPictureElement, likesCountElement,
  imageElement, commentShowCountElement, commentTotalCountElement, captionElement,
  footerTextElement, commentsContainerElement, commentTemplateElement
} from './elements.js';

const CommentsCount = {
  ON_START: 5,
  LOAD_MORE: 5
};

let currentComments = [];
let countCommentShown = 0;
let likesCount;

const isAllBigPictureCommentsShow = () => ((countCommentShown === 0) || (countCommentShown === currentComments.length));

const createElement = ({ avatar, name, message }) => {
  const newElement = commentTemplateElement.cloneNode(true);
  const commentImageElement = newElement.querySelector(socialSelectorList.picture);
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  newElement.querySelector(socialSelectorList.text).textContent = message;
  return newElement;
};

const drawComments = (newCountCommentShown) => {
  newCountCommentShown = Math.min(newCountCommentShown, currentComments.length);

  const comments = currentComments.slice(countCommentShown, newCountCommentShown);
  const fragment = createFragment(comments, createElement);
  commentsContainerElement.append(fragment);
  countCommentShown = newCountCommentShown;
  commentShowCountElement.textContent = countCommentShown;
};

const drawMoreBigPictureComments = () => {
  drawComments(countCommentShown + CommentsCount.LOAD_MORE);
};

const drawNewBigPictureComment = (newComment) => {
  const newCountCommentShown = countCommentShown + 1;

  currentComments.splice(countCommentShown, 0, newComment);
  countCommentShown = 0;
  removeChilds(commentsContainerElement);
  drawComments(newCountCommentShown);
  bigPictureElement.scrollTo(scrollX, bigPictureElement.scrollHeight);
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
  countCommentShown = 0;
  renderImageElement({ url: '', description: '', likes: 0, comments: [] });
  removeChilds(commentsContainerElement);
  footerTextElement.value = '';
  likesCountElement.classList.remove(likesCountActiveClass);
};

const drawBigPicture = (post) => {
  currentComments = post.comments;
  renderImageElement(post);
  drawComments(CommentsCount.ON_START);
};

export { drawBigPicture, clearBigPicture, updateLikesCount, drawMoreBigPictureComments, drawNewBigPictureComment, isAllBigPictureCommentsShow };

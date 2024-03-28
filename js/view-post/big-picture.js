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
let shownCommentsCount = 0;
let likesCount;

const createElement = ({ avatar, name, message }) => {
  const newElement = commentTemplateElement.cloneNode(true);
  const commentImageElement = newElement.querySelector(socialSelectorList.picture);
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  newElement.querySelector(socialSelectorList.text).textContent = message;
  return newElement;
};

const drawComments = (newShownCommentsCount) => {
  newShownCommentsCount = Math.min(newShownCommentsCount, currentComments.length);

  const comments = currentComments.slice(shownCommentsCount, newShownCommentsCount);
  if (shownCommentsCount < newShownCommentsCount) {
    const fragment = createFragment(comments, createElement);
    commentsContainerElement.append(fragment);
    shownCommentsCount = newShownCommentsCount;
    commentShowCountElement.textContent = shownCommentsCount;
  }
};

const drawMoreComments = () => {
  drawComments(shownCommentsCount + CommentsCount.LOAD_MORE);
};

const drawNewComment = (newComment) => {
  const newShownCommentsCount = shownCommentsCount + 1;

  currentComments.splice(shownCommentsCount, 0, newComment);
  shownCommentsCount = 0;
  removeChilds(commentsContainerElement);
  drawComments(newShownCommentsCount);
  bigPictureElement.scrollTo(scrollX, bigPictureElement.scrollHeight);
};

const updateLikesCount = () => {
  const isLikeActive = likesCountElement.classList.contains(likesCountActiveClass);
  updateClassList(likesCountElement, likesCountActiveClass, !isLikeActive);
  likesCount += (isLikeActive) ? -1 : 1;
  likesCountElement.textContent = likesCount;
  //!! сохранить бы свой лайк и добавить его в пост и обновить на минитюре
};

const isAllCommentsShown = () => shownCommentsCount === currentComments.length;

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
  shownCommentsCount = 0;
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

export { drawBigPicture, clearBigPicture, drawMoreComments, drawNewComment, updateLikesCount, isAllCommentsShown };

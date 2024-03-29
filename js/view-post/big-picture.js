import { clearSelected, updateClassList } from './../util/dom.js';
import {
  likesCountActiveClass, likesCountElement, imageElement,
  commentShownCountElement, commentTotalCountElement, captionElement
} from './elements.js';

let likesCount;

const updateLikesCount = () => {
  const isLikeActive = likesCountElement.classList.contains(likesCountActiveClass);
  updateClassList(likesCountElement, likesCountActiveClass, !isLikeActive);
  likesCount += (isLikeActive) ? -1 : 1;
  likesCountElement.textContent = likesCount;
  //!! сохранить бы свой лайк и добавить его в пост и обновить на минитюре
};

const drawBigPicture = ({ url, description, likes, comments }) => {
  imageElement.src = url;
  imageElement.alt = description;
  likesCount = likes;
  likesCountElement.textContent = likes;
  commentShownCountElement.textContent = 0;
  commentTotalCountElement.textContent = comments.length;
  captionElement.textContent = description;
  if (url) {
    // Баг оставалось выделение
    clearSelected();
    imageElement.focus();
  }
};

const clearBigPicture = () => {
  drawBigPicture({ url: '', description: '', likes: 0, comments: [] });
  likesCountElement.classList.remove(likesCountActiveClass);
};

export { drawBigPicture, clearBigPicture, updateLikesCount };

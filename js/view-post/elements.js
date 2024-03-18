import { addDotToClassName } from './../util/dom.js';

const bigPictureElement = document.querySelector('.big-picture');
const closePictureElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPicturePreviewElement = bigPictureElement.querySelector('.big-picture__preview');
const imageElement = bigPicturePreviewElement.querySelector('.big-picture__img img');
const socialElement = bigPicturePreviewElement.querySelector('.big-picture__social');
const likesCountElement = socialElement.querySelector('.likes-count');
const commentCountElement = socialElement.querySelector('.social__comment-count');
const commentShowCountElement = commentCountElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = commentCountElement.querySelector('.social__comment-total-count');
const captionElement = socialElement.querySelector('.social__caption');
const socialCommentsClassName = 'social__comments';
const commentsContainerElement = document.querySelector(addDotToClassName(socialCommentsClassName));

export {
  bigPictureElement,
  closePictureElement,
  commentsLoaderElement,
  imageElement,
  likesCountElement,
  commentCountElement,
  commentShowCountElement,
  commentTotalCountElement,
  captionElement,
  socialCommentsClassName,
  commentsContainerElement,
};

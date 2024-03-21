import { addDot } from './../util/util.js';

const socialCommentsClass = 'social__comments';
const socialPictureClass = 'social__picture';
const socialTextClass = 'social__text';
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
const commentsContainerElement = document.querySelector(addDot(socialCommentsClass));

export {
  socialCommentsClass,
  socialPictureClass,
  socialTextClass,
  bigPictureElement,
  closePictureElement,
  commentsLoaderElement,
  imageElement,
  likesCountElement,
  commentCountElement,
  commentShowCountElement,
  commentTotalCountElement,
  captionElement,
  commentsContainerElement,
};

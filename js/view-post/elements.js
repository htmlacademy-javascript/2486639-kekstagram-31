import { getFirstElementChild } from './../util/dom.js';

const socialSelectorList = {
  сomments: '.social__comments',
  picture: '.social__picture',
  text: '.social__text'
};
const likesCountActiveClass = 'likes-count--active';
const bigPictureElement = document.querySelector('.big-picture');
const closePictureElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPicturePreviewElement = bigPictureElement.querySelector('.big-picture__preview');
const imageElement = bigPicturePreviewElement.querySelector('.big-picture__img img');
const socialElement = bigPicturePreviewElement.querySelector('.big-picture__social');
const likesCountElement = socialElement.querySelector('.likes-count');
const commentCountElement = socialElement.querySelector('.social__comment-count');
const commentShownCountElement = commentCountElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = commentCountElement.querySelector('.social__comment-total-count');
const captionElement = socialElement.querySelector('.social__caption');
const footerTextElement = socialElement.querySelector('.social__footer-text');
const footerButtonElement = socialElement.querySelector('.social__footer-btn');
const commentsContainerElement = bigPicturePreviewElement.querySelector(socialSelectorList.сomments);
const commentTemplateElement = getFirstElementChild(socialSelectorList.сomments);

export {
  socialSelectorList,
  likesCountActiveClass,
  bigPictureElement,
  closePictureElement,
  commentsLoaderElement,
  imageElement,
  likesCountElement,
  commentCountElement,
  commentShownCountElement,
  commentTotalCountElement,
  captionElement,
  footerTextElement,
  footerButtonElement,
  commentsContainerElement,
  commentTemplateElement
};

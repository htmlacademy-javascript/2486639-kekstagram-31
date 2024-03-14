const bigPicturePreviewElement = document.querySelector('.big-picture__preview');
const imageElement = bigPicturePreviewElement.querySelector('.big-picture__img').querySelector('img');
const socialElement = bigPicturePreviewElement.querySelector('.big-picture__social');
const likesCountElement = socialElement.querySelector('.likes-count');
const commentShowCountElement = socialElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = socialElement.querySelector('.social__comment-total-count');
const captionElement = socialElement.querySelector('.social__caption');

const drawBigPicture = ({ url, description, likes, comments }) => {
  imageElement.src = url;
  imageElement.alt = description;
  likesCountElement.textContent = likes;
  commentShowCountElement.textContent = 0;
  commentTotalCountElement.textContent = comments.length;
  captionElement.textContent = description;
};
const clearBigPicture = () => {
  drawBigPicture({ url: '', description: '', likes: 0, comments: [] });
};


export { drawBigPicture, clearBigPicture, commentShowCountElement };

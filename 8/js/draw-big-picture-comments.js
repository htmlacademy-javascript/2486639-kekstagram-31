const commentsContainer = document.querySelector('.social__comments');
let commentTemplate;

const clear = () => {
  commentsContainer.innerHTML = '';
};

const init = () => {
  commentTemplate = commentsContainer.firstElementChild;
  if (!commentTemplate) {
    throw new Error('commentTemplate не найден!');
  }
  clear();
};

const draw = (comments, count, commentShowCountElement) => {
  clear();

  const commentsFragment = document.createDocumentFragment();

  comments.slice(0, count).forEach(({ avatar, description, message }) => {
    const newCommentElement = commentTemplate.cloneNode(true);

    const commentImageElement = newCommentElement.querySelector('.social__picture');
    commentImageElement.src = avatar;
    commentImageElement.alt = description;
    newCommentElement.querySelector('.social__text').textContent = message;

    commentsFragment.append(newCommentElement);
  });

  commentsContainer.append(commentsFragment);

  commentShowCountElement.textContent = count;
};

export { init as initDrawBigPictureComments, clear as clearBigPictureComments, draw as drawBigPictureComments };

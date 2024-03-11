const commentsContainer = document.querySelector('.social__comments');
let commentTemplate;

const clearPostComments = () => {
  commentsContainer.innerHTML = '';
};

const initDrawPostComments = () => {
  commentTemplate = commentsContainer.firstElementChild;
  if (!commentTemplate) {
    throw ('commentTemplate не найден!');
  }
  clearPostComments();
};

const drawPostComments = (comments, count, commentShowCountElement) => {
  clearPostComments();

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

export { initDrawPostComments, clearPostComments, drawPostComments };

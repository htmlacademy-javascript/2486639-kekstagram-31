const commentsContainer = document.querySelector('.social__comments');

// запомним первый элемент с комментарием как шаблон и очистим список
const commentTemplate = commentsContainer.firstElementChild;

const clearComments = () => {
  commentsContainer.replaceChildren();
  //2. commentsContainer.innerHTML = '';
  //3. while (commentsContainer.childElementCount > 0) { commentsContainer.removeChild(commentsContainer.firstElementChild); }
};

clearComments();

const loadComments = (comments, commentsCount) => {
  const commentsFragment = document.createDocumentFragment();

  comments.slice(0, commentsCount).forEach(({ avatar, description, message }) => {
    const newCommentElement = commentTemplate.cloneNode(true);

    const commentImageElement = newCommentElement.querySelector('.social__picture');
    commentImageElement.src = avatar;
    commentImageElement.alt = description;

    newCommentElement.querySelector('.social__text').textContent = message;

    commentsFragment.append(newCommentElement);
  });

  commentsContainer.append(commentsFragment);
};

export { loadComments, clearComments };

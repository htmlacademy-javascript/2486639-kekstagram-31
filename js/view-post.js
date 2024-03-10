/**/
const commentsContainer = document.querySelector('.social__comments');
// запомним первый элемент с комментарием, тут бы добавить проверку, что в верстке есть пример комментария
// Сохраним вне процедуры, т.к. если 0 коментриев, иначе происходит удаление
const commentTemplate = commentsContainer.firstElementChild;
/**/
//let commentTemplate; // объект удаляеться если его присфоить в функции

let onCommentsLoaderUnit;
let commentsLoaderElementUnit;

const loadPost = ({ url, description, likes, comments }) => {
  const CommentsCount = {
    ON_START: 5,
    LOAD_MORE: 5,
  };

  const bigPicturePreviewElement = document.querySelector('.big-picture__preview');
  const imageElement = bigPicturePreviewElement.querySelector('.big-picture__img').querySelector('img');
  const socialElement = bigPicturePreviewElement.querySelector('.big-picture__social');
  const likesCountElement = socialElement.querySelector('.likes-count');
  const commentShowCountElement = socialElement.querySelector('.social__comment-shown-count');
  const commentTotalCountElement = socialElement.querySelector('.social__comment-total-count');
  const captionElement = socialElement.querySelector('.social__caption');
  const commentsLoaderElement = document.querySelector('.comments-loader');
  commentsLoaderElementUnit = commentsLoaderElement;
  /*
  const commentsContainer = document.querySelector('.social__comments');

  // запомним первый элемент с комментарием, тут бы добавить проверку, что в верстке есть пример комментрия
  // Сохраним вне процедуры, т.к. если 0 коментриев, иначе происходит удаление
  commentTemplate = commentsContainer.firstElementChild;
  */

  const clearComments = () => {
    commentsContainer.replaceChildren();
    //2. commentsContainer.innerHTML = '';
    //3. while (commentsContainer.childElementCount > 0) { commentsContainer.removeChild(commentsContainer.firstElementChild); }
  };

  const loadComments = (startCommentsIndex, endCommentsIndex) => {
    const commentsFragment = document.createDocumentFragment();

    // post.description comment.description? 'description' is already declared in the upper scope on line 1 column 26.eslintno-shadow
    //comments.slice(startCommentsIndex, endCommentsIndex).forEach(({ avatar, description, message }) => {
    comments.slice(startCommentsIndex, endCommentsIndex).forEach((comment) => {
      const newCommentElement = commentTemplate.cloneNode(true);

      const commentImageElement = newCommentElement.querySelector('.social__picture');
      //commentImageElement.src = avatar;
      commentImageElement.src = comment.avatar;
      //commentImageElement.alt = description;
      commentImageElement.alt = comment.description;

      //newCommentElement.querySelector('.social__text').textContent = message;
      newCommentElement.querySelector('.social__text').textContent = comment.message;

      commentsFragment.append(newCommentElement);
    });

    commentsContainer.append(commentsFragment);
  };

  const totalCommentsCount = comments.length;
  let showCommentsCount;

  const onCommentsLoader = (evt) => {
    evt.preventDefault();

    const newShowCommentsCount = Math.min(showCommentsCount + CommentsCount.LOAD_MORE, totalCommentsCount);
    if (newShowCommentsCount === totalCommentsCount) {
      commentsLoaderElement.classList.add('hidden');
    }

    loadComments(showCommentsCount, newShowCommentsCount);
    showCommentsCount = newShowCommentsCount;
    commentShowCountElement.textContent = showCommentsCount;
  };
  onCommentsLoaderUnit = onCommentsLoader;

  imageElement.src = url;
  imageElement.alt = description;
  likesCountElement.textContent = likes;
  commentTotalCountElement.textContent = totalCommentsCount;
  captionElement.textContent = description;

  showCommentsCount = Math.min(CommentsCount.ON_START, totalCommentsCount);
  commentShowCountElement.textContent = showCommentsCount;

  if ((showCommentsCount === 0) || (showCommentsCount === totalCommentsCount)) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', onCommentsLoader);
  }

  clearComments();
  loadComments(0, showCommentsCount);
};

// как быть с логикой управления элементами и данными? выносить поиск нужных элементов отдельно, для вторичного использования
// в loadPost и clearPost
// пока добавил commentsLoaderElementUnit, onCommentsLoaderUnit
// повешать дополнительный обработчик на закрытие и esc... и все в функции loadPost?
const clearPost = () => {
  /*
  imageElement.src = '';
  imageElement.alt = '';
  likesCountElement.textContent = '';
  commentShowCountElement.textContent = '';
  commentTotalCountElement.textContent = '';
  captionElement.textContent = '';

  clearComments();

  commentsLoaderElement.classList.add('hidden');
  */

  //commentsLoaderElement.removeEventListener('click', onCommentsLoader);
  // не удаляет, тогда post или comments вынести в модуль и функции так же вынести
  commentsLoaderElementUnit.removeEventListener('click', onCommentsLoaderUnit);
};

export { clearPost, loadPost };

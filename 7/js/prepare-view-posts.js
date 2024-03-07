import { isEscapeKey } from './util.js';
import { loadPost, clearPost } from './view-post.js';

const CommentsCount = {
  ON_START: 10,
  ADD_MORE: 5,
};

const prepareViewPosts = (posts) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureList = picturesContainer.querySelectorAll('.picture');
  const bigPictureElement = document.querySelector('.big-picture');
  const closePictureElement = document.querySelector('.big-picture__cancel');
  const commentsLoaderElement = document.querySelector('.comments-loader');

  const openPostModal = (post) => {
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const commentsStartCount = (CommentsCount.ON_START > post.comments.length) ? post.comments.length : CommentsCount.ON_START;

    if ((commentsStartCount === 0) || (commentsStartCount === post.comments.length)) {
      commentsLoaderElement.classList.add('hidden');
    }

    loadPost(post, commentsStartCount);

    document.addEventListener('keydown', onDocumentEscapeKeydown);
  };

  const closePostModal = () => {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoaderElement.classList.remove('hidden');

    clearPost();

    document.removeEventListener('keydown', onDocumentEscapeKeydown);
  };

  function onDocumentEscapeKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePostModal();
    }
  }

  // сделаем клик на каждой ссылке, т.к. если сделать общий, то нужно дополнительно обрабатывать верстку лайки, коментарии и облать вокруг них
  pictureList.forEach((element, index) =>
    element.addEventListener('click', (evt) => {
      evt.preventDefault();

      // Попытка починить баг - на миниатюре остаеться количество постов и лайков с иконками, и далее непропадает, т.к. отменяеться a.click и a.hover
      bigPictureElement.click();

      // т.к. миниатюры заполнены по порядку, то и здесь берем по порядку, иначе при отрисовке нужно добавить newPictureElement.dataset.postId = id,
      // а тут считать и найти в getPostById(posts, element.dataset.postId)
      openPostModal(posts[index]);
    })
  );

  closePictureElement.addEventListener('click', closePostModal);
};

export { prepareViewPosts };

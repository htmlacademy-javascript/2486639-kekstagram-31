import { isEscapeKey, getPostById } from './util.js';
import { fillPostData, clearPostData } from './view-post-data.js';

const CommentsCount = {
  ON_START: 10,
  ADD_MORE: 5,
};

const viewPost = (posts) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureList = picturesContainer.querySelectorAll('.picture');
  const bigPictureElement = document.querySelector('.big-picture');
  const closePictureElement = document.querySelector('.big-picture__cancel');
  const commentsLoaderElement = document.querySelector('.comments-loader');

  const openPostModal = (post) => {
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    //const post = getPostById(posts, element.dataset.postId);
    const commentsStartCount = (CommentsCount.ON_START > post.comments.length) ? post.comments.length : CommentsCount.ON_START;

    if ((commentsStartCount === 0) || (commentsStartCount === post.comments.length)) {
      commentsLoaderElement.classList.add('hidden');
    }

    fillPostData(post, commentsStartCount);

    document.addEventListener('keydown', onDocumentEscapeKeydown);
  };

  const closePostModal = () => {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    commentsLoaderElement.classList.remove('hidden');

    clearPostData();

    document.removeEventListener('keydown', onDocumentEscapeKeydown);
  };

  function onDocumentEscapeKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePostModal();
    }
  }

  // сделаем клик на каждой ссылке, т.к. если сделать общий, то нужно дополнительно обрабатывать верстку лайки, коментарии и облать вокруг них
  pictureList.forEach((element) => {
    const { postId } = element.dataset;
    const post = getPostById(posts, postId);

    element.addEventListener('click', () => openPostModal(post));
  });

  closePictureElement.addEventListener('click', closePostModal);
};

export { viewPost };

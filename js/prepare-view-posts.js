import { isEscapeKey } from './util.js';
import { loadPost } from './view-post.js';

const prepareViewPosts = (posts) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureList = picturesContainer.querySelectorAll('.picture');
  const bigPictureElement = document.querySelector('.big-picture');
  const closePictureElement = document.querySelector('.big-picture__cancel');

  const openPostModal = (post) => {
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentEscapeKeydown);

    loadPost(post);
  };

  const closePostModal = () => {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
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

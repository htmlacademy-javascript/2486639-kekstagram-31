const drawMiniatures = (posts, openPostModal) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const { url, description, likes, comments } = post;
    const newPictureElement = pictureTemplate.cloneNode(true);

    const pictureImageElement = newPictureElement.querySelector('.picture__img');
    pictureImageElement.src = url;
    pictureImageElement.alt = description;

    newPictureElement.querySelector('.picture__likes').textContent = likes;

    newPictureElement.querySelector('.picture__comments').textContent = comments.length;

    newPictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      // Попытка починить баг - на миниатюре остаеться количество постов и лайков с иконками, и далее непропадает, т.к. отменяеться a.click и a.hover
      //const bigPictureElement = document.querySelector('.big-picture');
      //bigPictureElement.click();

      openPostModal(post);
    });

    picturesFragment.append(newPictureElement);
  });

  picturesContainer.append(picturesFragment);
};

export { drawMiniatures };

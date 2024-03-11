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

      evt.currentTarget.blur(); // Баг - не скрываеться элемент '.picture__info'

      openPostModal(post);
    });

    picturesFragment.append(newPictureElement);
  });

  picturesContainer.append(picturesFragment);
};

export { drawMiniatures };

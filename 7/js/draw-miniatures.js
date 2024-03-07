const drawMiniatures = (posts) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();

  posts.forEach(({ url, description, likes, comments }) => {
    const newPictureElement = pictureTemplate.cloneNode(true);

    const pictureImageElement = newPictureElement.querySelector('.picture__img');
    pictureImageElement.src = url;
    pictureImageElement.alt = description;

    newPictureElement.querySelector('.picture__likes').textContent = likes;

    newPictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.append(newPictureElement);
  });

  picturesContainer.append(picturesFragment);
};

export { drawMiniatures };

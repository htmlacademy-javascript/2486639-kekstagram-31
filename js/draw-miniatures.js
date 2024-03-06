import { posts } from './posts.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

posts.forEach((post) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.id = post.id;

  const pictureImage = picture.querySelector('.picture__img');
  pictureImage.src = post.url;
  pictureImage.alt = post.description;

  picture.querySelector('.picture__likes').textContent = post.likes;

  picture.querySelector('.picture__comments').textContent = post.comments.length;

  picturesFragment.append(picture);
});

picturesElement.append(picturesFragment);

import { generatePosts } from './generate-posts.js';

const posts = generatePosts();
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

posts.forEach((post) => {
  const picture = pictureTemplate.cloneNode(true);

  const pictureImage = picture.querySelector('.picture__img');
  pictureImage.src = post.url;
  pictureImage.alt = post.description;

  picture.querySelector('.picture__likes').textContent = post.likes;

  picture.querySelector('.picture__comments').textContent = post.comments.length;

  picturesFragment.append(picture);
});

pictures.append(picturesFragment);

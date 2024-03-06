import { generatePosts } from './generate-posts.js';

const posts = generatePosts();

const getPostById = (id) =>
  posts.find((value) =>
    value.id === parseInt(id, 10)
  );

export { posts, getPostById };

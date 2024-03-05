import { drawMiniatures } from './draw-miniatures.js';
import { generatePosts } from './generate-posts.js';

const viewPosts = () => {
  const posts = generatePosts();

  drawMiniatures(posts);
};

export { viewPosts };

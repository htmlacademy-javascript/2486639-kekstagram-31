import { generatePosts } from './generate-posts.js';
import { drawMiniatures } from './draw-miniatures.js';
import { viewPost } from './view-post.js';

const posts = generatePosts();

drawMiniatures(posts);
viewPost(posts);

/*
 * Баг 06.03.2024
 * Если ранее модальное окно было прокручено вниз, то при скрытии и показе заново прокрутка не возвращаеться вверх.
 * Нужно найти способ прокрутить доверху модалье окно, а не саму страницу.
 *
 * Баг 06.03.2024
 * Когда открыто модальное окно, то на нажатой картике остаеться элемент с количеством лайком и коментариев, отображаеться при наведении указателя мыши.
 * Он пропадает когда происходит еще один клик в модальном окне или выключенной части страницы.
 * Сделать либо, чтобы не пропадал, либо пропадал сразу при появлении модального окна.
 * + Баг 07.03.2024, после зактыия он остаеться и не скрываеться когда перемещаешь мышь на другую картинку и отображаються сразу две
 *
 * Поробовать реализорвать:
 * Кнопка для загрузки новой порции комментариев === прокрутка до самого низу.
 *
 * ------------------------
 * В модальном окне может быть случай когда 0 из 0 комментариев и как то не очень звучит, но менять разметку не очень, оба числа отдельными элементами
 * //view-post.js
 * const socialCommentsContainer = document.querySelector('.social__comments');
 * const socialCommentCountElement = document.querySelector('.social__comment-count');
 *
 * if (commentsStartCount === 0) {
 *   socialCommentsContainer.classList.add('hidden');
 *   socialCommentCountElement.classList.add('hidden');
 * }
 *
 * socialCommentsContainer.classList.remove('hidden');
 * socialCommentCountElement.classList.remove('hidden');
 * ------------------------
 * ------------------------
 */

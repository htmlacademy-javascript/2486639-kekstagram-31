import { getPosts } from './api.js';
import { showError } from './show-error.js';
import { drawPictures } from './draw-pictures.js';
import { initFilter } from './filter-posts.js';
import { initBigPictureModal } from './view-post/index.js';
import { initNewPosteModal } from './new-post/index.js';

getPosts(
  (posts) => {
    drawPictures(posts);
    initFilter(posts);
    initBigPictureModal();
  },
  showError);
initNewPosteModal();

/*
 * + Баг 06.03.2024 / возможно будет мешать автотестам
 * Если ранее модальное окно было прокручено вниз, то при скрытии и показе заново прокрутка не возвращаеться вверх.
 * Нужно найти способ прокрутить доверху модалье окно, а не саму страницу.
 *
 * + Баг 06.03.2024 - draw-miniatures.js - строка  evt.currentTarget.blur();
 * css .picture:hover .picture__info
 * Когда открыто модальное окно, то на нажатой картике остаеться элемент с количеством лайком и коментариев, отображаеться при наведении указателя мыши.
 * Он пропадает когда происходит еще один клик в модальном окне или выключенной части страницы.
 * Сделать либо, чтобы не пропадал, либо пропадал сразу при появлении модального окна.
 * добавил 07.03.2024, после зактыия он остаеться и не скрываеться когда перемещаешь мышь на другую картинку и отображаються сразу две
 *
 * Баг 12.03.2024
 * Если в модальном окне, что то выделить и потом закрыть по esc, то выделение остаеться на следующее открытие.
 * выдение на "Нравится", "5 из 26 комментариев"
 *
 * Баг или фича 21.03.2024
 * При открытом модальном окне и смене фокуса Tab-ом, то переходит на элементы основной страницы
 * Наверное нужно обработать смену фокуса...
 *
 * Баг 23.03.2024
 * У кнопки "СЛУЧАЙНЫЕ" моргает курсов ввода в конце слова
 *
 * Поробовать реализорвать: возможно будет мешать автотестам
 * Кнопка для загрузки новой порции комментариев === прокрутка до самого низу.
 *
 * ------------------------
 * ------------------------
 * ------------------------
 */

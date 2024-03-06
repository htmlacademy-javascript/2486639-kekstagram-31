const commentsContainer = document.querySelector('.social__comments');

const getCommentHTML = (avatarUrl, name, text) =>
  `<li class="social__comment">
     <img class="social__picture"
          src="${avatarUrl}"
          alt="${name}"
          width="35" height="35">
     <p class="social__text">${text}</p>
   </li>
`;

const clearCommentsData = () => {
  commentsContainer.innerHTML = '';
};

const fillCommentsData = (comments) => (
  commentsContainer.innerHTML = comments.reduce(
    (result, value) => result + getCommentHTML(value.avatar, value.name, value.message), '')
);


export { fillCommentsData, clearCommentsData };

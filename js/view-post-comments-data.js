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

const fillCommentsData = (comments, commentsCount) => {
  let HTMLString = '';

  //!! slice !!
  for (let index = 0; index < commentsCount; index++) {
    HTMLString += getCommentHTML(comments[index].avatar, comments[index].name, comments[index].message);
  }

  commentsContainer.innerHTML = HTMLString;
};


export { fillCommentsData, clearCommentsData };

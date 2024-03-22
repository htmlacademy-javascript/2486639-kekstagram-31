import { throwError } from './util/util.js';

const GET_DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const getPosts = (onSuccess, onError) => fetch(GET_DATA_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throwError(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

export { getPosts };

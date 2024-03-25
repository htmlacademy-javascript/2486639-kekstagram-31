import { throwError } from './util/util.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_POSTS: '/data',
  SEND_POST: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const sendRequest = (route, onSuccess, onError, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
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

const getPosts = (onSuccess, onError) => sendRequest(Route.GET_POSTS, onSuccess, onError);

const sendPost = (onSuccess, onError, formData) => sendRequest(Route.SEND_POST, onSuccess, onError, Method.POST, formData);

export { getPosts, sendPost };

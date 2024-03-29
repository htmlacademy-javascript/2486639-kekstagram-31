const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_POSTS: '/data',
  SEND_POST: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const sendRequest = async (route, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  } catch (error) {
    throw new Error(error);
  }
};

const getPosts = () => sendRequest(Route.GET_POSTS);

const sendPost = (formData) => sendRequest(Route.SEND_POST, Method.POST, formData);

export { getPosts, sendPost };

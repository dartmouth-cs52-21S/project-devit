import axios from 'axios';

const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=l_maechling';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  DELETE_POST: 'DELETE_POST',
  NEW_POST: 'NEW_POST',
};

export function fetchPosts() {
  console.log('in action creator fetching posts');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      console.log('i made it through get request and fetched');
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    })
      .catch((error) => {
        throw new Error(error);
        // dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      history.push('/');
      dispatch({ type: ActionTypes.NEW_POST, payload: response.data });
    })
      .catch((error) => {
        throw new Error(error);
        // dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updatePost(post, id) {
  console.log('updating woo hoo');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post).then((response) => {
      console.log('response updae', response.data);
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    })
      .catch((error) => {
        throw new Error(error);
        // dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    })
      .catch((error) => {
        throw new Error(error);
        // dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deletePostSingular(id, history) {
  console.log('in action creator deleting post singluar', id);
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(() => {
      history.push('/');
    })
      .catch((error) => {
        throw new Error(error);
        // dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      const newPosts = response.data.filter((item) => item.id !== id);
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: newPosts });
    })
      .catch((error) => {
        throw new Error(error);
        // dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deletePostAll(id) {
  console.log('in action creator deleting post all', id);
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
      .catch((error) => {
        throw new Error(error);
        // dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      const newPosts = response.data.filter((item) => item.id !== id);
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: newPosts });
    })
      .catch((error) => {
        throw new Error(error);
        // dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

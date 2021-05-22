import axios from 'axios';

import ActionTypes from '../types';

const ROOT_URL = process.env.REACT_APP_ROOT_URL || 'http://localhost:9090/api';

export const toggleSidebar = () => ({
  type: ActionTypes.TOGGLE_SIDEBAR,
});

export function fetchProjects() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createProject(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      history.push('/');
      dispatch({ type: ActionTypes.NEW_POST, payload: response.data });
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateProject(post, id) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchProject(id, callback) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      callback(response.data);
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deleteProjectSingular(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then(() => {
      history.push('/');
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      const newProjects = response.data.filter((item) => item.id !== id);
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: newProjects });
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deleteProjectAll(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      const newProjects = response.data.filter((item) => item.id !== id);
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: newProjects });
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      history.push('/');
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

export function signupUser({ email, password, author }, history) {
  console.log('sign up', { email, password, author });
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, author }).then((response) => {
      history.push('/');
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
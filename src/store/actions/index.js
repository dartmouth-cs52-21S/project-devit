import axios from 'axios';

import { toast } from 'react-toastify';
import ActionTypes from '../types';

const ROOT_URL = process.env.REACT_APP_ROOT_URL || 'http://localhost:9090/api';

export const toggleSidebar = () => ({
  type: ActionTypes.TOGGLE_SIDEBAR,
});

export function fetchProjects() {
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/projects`).then((response) => {
        dispatch({ type: ActionTypes.FETCH_PROJECTS, payload: response.data });
      })
      .catch((error) => {
        console.error(error);
        toast.dark('Sorry, there was an issue when getting projects.');
      });
  };
}

export function createProject(project, history) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/projects`, project, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
        dispatch({ type: ActionTypes.NEW_PROJECT, payload: response.data });
        history.push('/projects');
      })
      .catch((error) => {
        console.error(error);
        toast.dark('Sorry, there was an issue when trying to create your project.');
      });
  };
}

export function updateProject(project, id) {
  return (dispatch) => {
    axios
      .put(`${ROOT_URL}/projects/${id}`, project, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
        dispatch({ type: ActionTypes.FETCH_PROJECT, payload: response.data });
      })
      .catch((error) => {
        console.error(error);
        toast.dark('Sorry, there was an issue when trying to update that project.');
      });
  };
}

export function fetchProject(id, callback) {
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/projects/${id}`).then((response) => {
        dispatch({ type: ActionTypes.FETCH_PROJECT, payload: response.data });
        callback(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.dark('Sorry, there was an issue when trying find that project.');
      });
  };
}

export function deleteProject(id, history) {
  return (dispatch) => {
    axios
      .delete(`${ROOT_URL}/projects/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.error(error);
        toast.dark('Sorry, there was an issue when trying to delete that project.');
      });
  };
}

export function signInUser(user, history) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signin`, user).then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        console.error(error);
        const toastMessage = `Sign In Failed: ${error.response.data}`;
        toast.dark(toastMessage);
      });
  };
}

export function signUpUser(user, history) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signup`, user).then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        console.error(error);
        toast.dark('Sorry, there was an issue when trying to sign you up.');
      });
  };
}

export function signOutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    toast.dark('✌️ You have signed out');
    history.push('/');
  };
}

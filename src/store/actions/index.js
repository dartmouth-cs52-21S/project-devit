import axios from 'axios';

import { toast } from 'react-toastify';
import ActionTypes from '../types';

export const ROOT_URL = process.env.REACT_APP_ROOT_URL || 'http://localhost:9090/api';

export const toggleSidebar = () => ({ type: ActionTypes.TOGGLE_SIDEBAR });

export function fetchProjects() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${ROOT_URL}/projects`);
      dispatch({ type: ActionTypes.FETCH_PROJECTS, payload: data });
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when getting projects.');
    }
  };
}

export function createProject(project, history) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${ROOT_URL}/projects`, project, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.NEW_PROJECT, payload: data });
      history.push('/projects');
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when trying to create your project.');
    }
  };
}

export function updateProject(project, id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${ROOT_URL}/projects/${id}`, project, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.FETCH_PROJECT, payload: data });
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when trying to update that project.');
    }
  };
}

export function fetchProject(id, callback) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${ROOT_URL}/projects/${id}`);
      dispatch({ type: ActionTypes.FETCH_PROJECT, payload: data });
      callback(data);
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when trying find that project.');
    }
  };
}

export function deleteProject(id, history) {
  return async () => {
    try {
      const { data } = await axios.delete(`${ROOT_URL}/projects/${id}`, { headers: { authorization: localStorage.getItem('token') } });
      console.log('data:', data);
      history.push('/');
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when trying to delete that project.');
    }
  };
}

export function signInUser(user, history) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${ROOT_URL}/signin`, user);
      dispatch({ type: ActionTypes.AUTH_USER, payload: data.user });
      localStorage.setItem('token', data.token);
      history.push('/profile');
    } catch (error) {
      console.error(error);
      const toastMessage = `Sorry, there was an issue when trying to sign you in: ${error.response.data}`;
      toast.dark(toastMessage);
    }
  };
}

export function signUpUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${ROOT_URL}/signup`, user);
      dispatch({ type: ActionTypes.AUTH_USER, payload: data.user });
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when trying to sign you up.');
    }
  };
}

export function updateUser(id, user, history) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${ROOT_URL}/users/${id}`, user);
      dispatch({ type: ActionTypes.AUTH_USER, payload: data.user });
      localStorage.setItem('token', data.token);
      history.push('/profile');
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when trying to update user.');
    }
  };
}

export function signOutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    toast.dark('✌️ You have signed out');
    history.push('/signin');
  };
}

export const toggleModalVisibility = (modalContent) => ({
  type: ActionTypes.TOGGLE_MODAL_VISIBILITY,
  modalContent,
});

export function getChatMessages(projectId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${ROOT_URL}/chat-messages/${projectId}`, { headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.UPDATE_CHAT_MESSAGES, messages: data });
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when trying to get chat messages.');
    }
  };
}

export function addChatMessage(message) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${ROOT_URL}/chat-messages/${message.projectId}`, { message, headers: { authorization: localStorage.getItem('token') } });
      dispatch({ type: ActionTypes.ADD_CHAT_MESSAGE, newMessage: data });
    } catch (error) {
      console.error(error);
      toast.dark('Sorry, there was an issue when trying to create a message.');
    }
  };
}

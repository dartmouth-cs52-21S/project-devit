import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import App from './App';

import { reauthenticateUser } from './store/actions';
import './styles/styles.scss';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

const token = localStorage.getItem('token');

if (token) store.dispatch(reauthenticateUser(token));

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
  document.getElementById('main'),
);

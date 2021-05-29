import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSend } from 'react-icons/md';
import axios from 'axios';
import dayjs from 'dayjs';

import { UserAvatar } from './UserAvatar';
import { addChatMessage, getChatMessages, ROOT_URL } from '../store/actions';
import { selectUser, selectChatMessages } from '../store/selectors/index';

import ActionTypes from '../store/types/index';

const localizedFormat = require('dayjs/plugin/localizedFormat');
const isYesterday = require('dayjs/plugin/isYesterday');
const isToday = require('dayjs/plugin/isToday');

dayjs.extend(localizedFormat);
dayjs.extend(isYesterday);
dayjs.extend(isToday);

const POLLING_INTERVAL_SECONDS = 1;

const Chat = () => {
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const messages = useSelector(selectChatMessages);

  useEffect(() => {
    const signIn = async () => {
      const { data } = await axios.post(`${ROOT_URL}/signin`, { email: 'a@a.com', password: 'a' });
      dispatch({ type: ActionTypes.AUTH_USER, payload: data.user });
      localStorage.setItem('token', data.token);
    };

    signIn();
  }, []);

  useEffect(() => {
    const pollInterval = setInterval(() => dispatch(getChatMessages('123456')), POLLING_INTERVAL_SECONDS * 1000);
    return () => clearInterval(pollInterval);
  }, []);

  const handleUpdateMessageText = (e) => setMessageText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      body: messageText,
      projectId: '123456', // Placeholder. This vallue should come from a URL parameter (something like "projects/:projectId")
      author: user.id,
      isDeleted: false,
    };

    dispatch(addChatMessage(newMessage));
    setMessageText('');
  };

  return (
    <div className="chat">
      <h1 className="chat__title">Chat</h1>
      <div className="chat__chat-window">
        {messages.length > 0 && (
          <div className="chat__messages">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        )}
        <div className="chat__message-input">
          <form className="chat__form form" onSubmit={handleSubmit}>
            <input type="text" id="message-input-field" value={messageText} className="chat__message-input-field" placeholder="Type something..." onChange={handleUpdateMessageText} />
            <button type="submit" className="chat__submit-button button" label="submit"><span className="chat__send-button-icon icon send-icon"><MdSend /></span></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

export const formatTimestamp = (timestamp) => {
  if (dayjs(timestamp).isYesterday()) return `Yesterday at ${dayjs(timestamp).format('LT')}`;
  if (dayjs(timestamp).isToday()) return `Today at ${dayjs(timestamp).format('LT')}`;
  return dayjs(timestamp).format('lll');
};

const ChatMessage = ({ message }) => (
  <div className="chat__message">
    <div className="chat__message-user">
      <UserAvatar passedInUser={message.author} />
    </div>
    <div className="chat__message-details">
      <div className="chat__message-details-meta">
        <div className="chat__message-username">{`${message.author.firstName} ${message.author.lastName}`}</div>
        <div className="chat__message-timestamp">{formatTimestamp(message.createdAt)}</div>
      </div>
      <div className="chat__message-text">{message.body}</div>
    </div>
  </div>
);

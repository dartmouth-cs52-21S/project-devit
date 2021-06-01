import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdSend } from 'react-icons/md';
// import axios from 'axios';
import dayjs from 'dayjs';

import { UserAvatar } from './UserAvatar';
import { addChatMessage, getChatMessages, updateUser } from '../store/actions';
import { selectUser, selectChatMessages } from '../store/selectors/index';

const localizedFormat = require('dayjs/plugin/localizedFormat');
const isYesterday = require('dayjs/plugin/isYesterday');
const isToday = require('dayjs/plugin/isToday');

dayjs.extend(localizedFormat);
dayjs.extend(isYesterday);
dayjs.extend(isToday);

const POLLING_INTERVAL_SECONDS = 1;

const Chat = () => {
  const [messageText, setMessageText] = useState('');
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const messages = useSelector(selectChatMessages);

  useEffect(() => {
    const pollInterval = setInterval(() => dispatch(getChatMessages(projectId)), POLLING_INTERVAL_SECONDS * 1000);
    return () => clearInterval(pollInterval);
  }, [projectId]);

  const handleUpdateMessageText = (e) => setMessageText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      body: messageText,
      projectId,
      author: user.id,
      isDeleted: false,
    };

    dispatch(addChatMessage(newMessage));
    setMessageText('');

    if (!user.messagesSent) {
      user.messagesSent = 1;
    } else {
      user.messagesSent += 1;
    }

    dispatch(updateUser(user.id, user));
  };

  return (
    <div className="chat">
      <h1 className="chat__title">Chat</h1>
      <div className="chat__chat-window">
        <div className="chat__messages">
          {messages.length > 0
            ? (<>{ messages.map((message) => <ChatMessage key={message.id} message={message} />) }</>)
            : (<p className="chat__loading-message">Retrieving messages...</p>)}
        </div>
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

import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { UserAvatar } from './UserAvatar';

const Chat = () => {
  const [messageText, setMessageText] = useState('');

  const users = [
    {
      firstName: 'Carrie',
      lastName: 'Cove',
      picture: 'https://media.giphy.com/media/1Ag1kXnpY6YcFoeg0L/giphy.gif',
      roles: ['designer'],
    },
    {
      firstName: 'Duncan',
      lastName: 'Denver',
      picture: 'https://media.giphy.com/media/l0K4oIudAiHkJswyk/giphy.gif',
      roles: ['designer'],
    },
    {
      firstName: 'Eva',
      lastName: 'Eldridge',
      picture: 'https://media.giphy.com/media/damwlhg3HEoQE4anQ8/giphy.gif',
      roles: ['designer'],
    },
  ];

  const messages = [
    {
      user: users[0],
      body: 'I should be able to get to it later today.',
      createdAt: 'Today at 8:22am',
    },
    {
      user: users[1],
      body: 'I am love these new components! 😍',
      createdAt: 'Today at 2:12pm',
    },
    {
      user: users[1],
      body: 'What do you guys think about the new Toast component?',
      createdAt: 'Today at 2:13pm',
    },
    {
      user: users[0],
      body: 'Looks really good!',
      createdAt: 'Today at 2:13pm',
    },
    {
      user: users[0],
      body: 'I wonder if it’d be good to expose toastDuration?',
      createdAt: 'Today at 2:13pm',
    },
    {
      user: users[1],
      body: 'That is definitely doable. Let me double check with Eva. @Eva, Would you look into this?',
      createdAt: 'Today at 2:14pm',
    },
    {
      user: users[2],
      body: 'Looks good to me.',
      createdAt: 'Today at 2:14pm',
    },
  ];

  const handleUpdateMessageText = (e) => setMessageText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hello there. You tried to submit.');
    setMessageText('');
  };

  return (
    <div className="chat">
      <h1 className="chat__title">Team Chat</h1>
      <div className="chat__chat-window">
        <div className="chat__messages">
          {messages.map((message) => (
            <ChatMessage message={message} />
          ))}
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

const ChatMessage = ({ message }) => (
  <div className="chat__message">
    <div className="chat__message-user">
      <UserAvatar passedInUser={message.user} />
    </div>
    <div className="chat__message-details">
      <div className="chat__message-details-meta">
        <div className="chat__message-username">{`${message.user.firstName} ${message.user.lastName}`}</div>
        <div className="chat__message-timestamp">{message.createdAt}</div>
      </div>
      <div className="chat__message-text">{message.body}</div>
    </div>
  </div>
);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser, signupUser } from '../actions/index';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [author, setAuthor] = useState('');

  console.log(author);
  return (
    <div className="sign-in">
      <h1>Sign In or Sign Up</h1>
      <ul>
        <li><h2>Email: </h2><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></li>
        <li><h2>Password: </h2><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></li>
        <li><h2>Name: </h2><input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></li>
      </ul>
      <button type="button" onClick={() => props.signinUser({ email, password }, props.history)}>Sign In</button>
      <button type="button" onClick={() => props.signupUser({ email, password, author }, props.history)}>Sign Up</button>
    </div>
  );
};

export default withRouter(connect(null, { signinUser, signupUser })(SignIn));

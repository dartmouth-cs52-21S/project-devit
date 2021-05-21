import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser } from '../actions/index';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="sign-in">
      <div className="container">
        <img src="../../images/logo/devit_logo_light.png" alt="DevIt Logo" />
        <ul>
          <li><h2>Email<span id="red">*</span> </h2></li>
          <li><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></li>
          <li><h2>Password<span id="red">*</span> </h2></li>
          <li><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></li>
          <li><button type="button" onClick={() => props.signinUser({ email, password }, props.history)}>Sign In</button></li>
        </ul>
        <p>Do not have an account? <span id="underline">Sign Up</span></p>
      </div>
    </div>
  );
};

export default withRouter(connect(null, { signinUser })(SignIn));

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { signInUser } from '../store/actions';
import DarkBG from './DarkBG';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const readyToSubmit = email && password;

  const handleSignInUser = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }, history));
  };

  const handleUpdateEmail = (e) => setEmail(e.target.value);
  const handleUpdatePassword = (e) => setPassword(e.target.value);

  return (
    <DarkBG>
      <section className="sign-in form">
        <div className="form__container">
          <h2 className="form__heading">Sign In</h2>
          <form className="form__form" onSubmit={handleSignInUser}>
            <label className="form__label" htmlFor="email">
              <p className="form__label-text">Email<span className="form__required">*</span></p>
              <input className="form__label-input" type="text" id={email} value={email} onChange={handleUpdateEmail} />
            </label>
            <label className="form__label" htmlFor="password">
              <p className="form__label-text">Password<span className="form__required">*</span></p>
              <input className="form__label-input" type="password" id={password} value={password} onChange={handleUpdatePassword} />
            </label>
            <button type="submit" className="button form__button" disabled={!readyToSubmit}>Sign In</button>
          </form>
          <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </section>
    </DarkBG>
  );
};

export default SignIn;

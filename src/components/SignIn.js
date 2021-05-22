import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signinUser } from '../store/actions';
import Logo from './Logo';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const readyToSubmit = email && password;

  const handleSignInUser = () => dispatch(signinUser({ email, password }, history));
  const handleUpdateEmail = (e) => setEmail(e.target.value);
  const handleUpdatePassword = (e) => setPassword(e.target.value);

  return (
    <section className="sign-in">
      <div className="sign-in__container">
        <div className="sign-in__logo">
          <Logo />
        </div>
        <form className="sign-in__form" onSubmit={handleSignInUser}>
          <label className="sign-in__label" htmlFor="email">
            <p className="sign-in__label-text">Email<span className="required">*</span></p>
            <input className="sign-in__label-input" type="text" id={email} value={email} onChange={handleUpdateEmail} />
          </label>
          <label className="sign-in__label" htmlFor="password">
            <p className="sign-in__label-text">Password<span className="required">*</span></p>
            <input className="sign-in__label-input" type="password" id={password} value={password} onChange={handleUpdatePassword} />
          </label>
          <button type="submit" className="button full-width" disabled={!readyToSubmit}>Sign In</button>
        </form>
        <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </section>
  );
};

export default SignIn;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { signUpUser } from '../store/actions';
import DarkBG from './DarkBG';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const readyToSubmit = email && password && confirmPassword;

  const handleSignUpUser = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ email, password }, history));
    history.push('/onboarding');
  };

  const handleUpdateEmail = (e) => setEmail(e.target.value);
  const handleUpdatePassword = (e) => setPassword(e.target.value);
  const handleUpdateConfirmPassword = (e) => setConfirmPassword(e.target.value);

  return (
    <DarkBG>
      <section className="sign-in form">
        <div className="form__container">
          <h2 className="form__heading">Sign Up</h2>
          <form className="form__form" onSubmit={handleSignUpUser}>
            <label className="form__label" htmlFor="email">
              <p className="form__label-text">Email<span className="form__required">*</span></p>
              <input className="form__label-input" type="text" value={email} onChange={handleUpdateEmail} />
            </label>
            <label className="form__label" htmlFor="password">
              <p className="form__label-text">Password<span className="form__required">*</span></p>
              <input className="form__label-input" type="password" value={password} onChange={handleUpdatePassword} />
            </label>
            <label className="form__label" htmlFor="password">
              <p className="form__label-text">Confirm Password<span className="form__required">*</span></p>
              <input className="form__label-input" type="password" value={confirmPassword} onChange={handleUpdateConfirmPassword} />
            </label>
            <button type="submit" className="button form__button" disabled={!readyToSubmit}>Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
      </section>
    </DarkBG>
  );
};

export default SignUp;

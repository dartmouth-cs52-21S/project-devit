import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DarkBG from './DarkBG';
import { selectUser, selectUserIsDefined } from '../store/selectors';
import { toggleModalVisibility, signOutUser } from '../store/actions';

const LandingPage = () => {
  const dispatch = useDispatch();
  const userIsDefined = useSelector(selectUserIsDefined);
  const history = useHistory();

  const handleRedirect = (path) => {
    if (userIsDefined) return dispatch(toggleModalVisibility(<AlreadySignedInMessage />));
    return history.push(path);
  };

  return (
    <DarkBG>
      <div className="landing">
        <div className="landing__cta-wrapper">
          <h1 className="landing__heading">Connect. Build. Share.</h1>
          <h2 className="landing__subheading">Find your team today</h2>
          <div className="button-group">
            <button type="button" className="button" onClick={() => handleRedirect('/signup')}>Get started now</button>
            <button type="button" className="button ghost" onClick={() => handleRedirect('/signin')}>Sign in</button>
          </div>
        </div>
        <div className="landing__image">
          <img className="landing__logo-3d" src="../images/devit_3d_logo.png" alt="DevIt 3D Logo" />
        </div>
      </div>
    </DarkBG>
  );
};

export default LandingPage;

const AlreadySignedInMessage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleClose = () => dispatch(toggleModalVisibility({}));
  const handleSignOut = () => {
    dispatch(signOutUser());
    dispatch(toggleModalVisibility({}));
  };

  return (
    <div className="signed-in-message">
      <h2 className="signed-in-message__heading">Already signed in</h2>
      <p className="signed-in-message__message">{`Looks like you're already signed in as ${user.email}.`}</p>
      <div className="button-group">
        <button type="button" className="button" onClick={handleClose}>Stay signed in</button>
        <button type="button" className="button ghost" onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

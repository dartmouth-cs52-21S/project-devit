import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './Logo';
import { UserAvatar } from './UserAvatar';
import { selectisAuthenticated } from '../store/selectors';
import { signOutUser } from '../store/actions';

const Banner = () => {
  const history = useHistory();
  const isAuthenticated = useSelector(selectisAuthenticated);

  const handleGoHome = () => history.push('/');

  return (
    <header className="banner">
      <div className="banner__logo" role="button" tabIndex="0" onClick={handleGoHome}>
        <Logo />
      </div>
      {isAuthenticated && (
        <div className="banner__user-actions">
          <UserActionButton />
          <UserAvatar />
        </div>
      )}
    </header>
  );
};

export default Banner;

const UserActionButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOutUser = () => dispatch(signOutUser(history));

  return (
    <button type="button" className="banner__button button" onClick={handleSignOutUser}>Sign Out</button>
  );
};

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

  const handleRedirect = () => {
    if (isAuthenticated) return history.push('/profile');
    return history.push('/');
  };

  const handleGoToProfile = () => history.push('/profile');

  return (
    <header className="banner">
      <div className="banner__logo" role="button" tabIndex="0" onClick={handleRedirect}>
        <Logo />
      </div>
      {isAuthenticated && (
        <div className="banner__user-actions">
          <UserActionButton />
          <UserAvatar useAuthenticatedUser onClick={handleGoToProfile} />
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

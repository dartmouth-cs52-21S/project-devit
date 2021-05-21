import React from 'react';
import { useHistory } from 'react-router-dom';

import Logo from './Logo';
import { UserAvatar } from './UserAvatar';

const Banner = () => {
  const history = useHistory();

  const handleGoHome = () => history.push('/');

  return (
    <header className="banner">
      <div className="banner__logo" role="button" tabIndex="0" onClick={handleGoHome}>
        <Logo />
      </div>
      <div className="banner__user-actions">
        <button type="button" className="banner__button button">Login</button>
        <UserAvatar />
      </div>
    </header>
  );
};

export default Banner;

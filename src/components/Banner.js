import React from 'react';

import Logo from './Logo';
import { UserAvatar } from './UserAvatar';

const Banner = () => {
  return (
    <header className="banner">
      <Logo className="banner__logo" />
      <div className="banner__user-actions">
        <button type="button" className="banner__button button">Login</button>
        <UserAvatar />
      </div>
    </header>
  );
};

export default Banner;

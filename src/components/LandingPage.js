import React from 'react';
import { useHistory } from 'react-router-dom';

import Logo from './Logo';

const LandingPage = () => {
  const history = useHistory();
  const getStarted = () => history.push('/signup');

  return (
    <div id="landingPageOuter">
      <div id="callToAction">
        <Logo />
        <h1>Connect. Build. Share.</h1>
        <h2>Find your team today</h2>
        <button type="button" onClick={getStarted} className="button">Get started now</button>
      </div>
      <img id="biglogo" src="../../images/logo/devit_logo_dark.svg" alt="" />
    </div>
  );
};

export default LandingPage;

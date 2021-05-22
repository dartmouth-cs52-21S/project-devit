import React from 'react';
import Logo from './Logo';

const LandingPage = (props) => {
  const getStarted = () => {
    props.history.push('/signup');
  };
  return (
    <div id="landingPageOuter">
      <div id="callToAction">
        <Logo />
        <h1>Connect. Build. Share.</h1>
        <h2>Find your team today</h2>
        <input type="submit" onClick={getStarted} className="button" value="Get started now" />
      </div>
      <img id="biglogo" src="../../images/logo/devit_logo_dark.svg" alt="" />
    </div>
  );
};

export default LandingPage;

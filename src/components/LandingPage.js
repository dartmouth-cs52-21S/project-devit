import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();
  const getStarted = () => history.push('/signup');

  return (
    <div className="landing">
      <div className="landing__cta-wrapper">
        <h1 className="landing__heading">Connect. Build. Share.</h1>
        <h2 className="landing__subheading">Find your team today</h2>
        <button type="button" className="button" onClick={getStarted}>Get started now</button>
      </div>
      <div className="landing__image">
        <img className="landing__logo-3d" src="../images/devit_3d_logo.png" alt="DevIt 3D Logo" />
      </div>
    </div>
  );
};

export default LandingPage;

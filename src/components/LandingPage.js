import React from 'react';
import { useHistory } from 'react-router-dom';

import DarkBG from './DarkBG';

const LandingPage = () => {
  const history = useHistory();
  const handleRedirect = (path) => history.push(path);

  return (
    <DarkBG>
      <div className="landing">
        <div className="landing__cta-wrapper">
          <h1 className="landing__heading">Connect. Build. Share.</h1>
          <h2 className="landing__subheading">Find your team today</h2>
          <div className="button-group">
            <button type="button" className="button" onClick={() => handleRedirect('/signup')}>Get started now</button>
            <button type="button" className="button ghost" onClick={() => handleRedirect('/signin')}>Login</button>
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

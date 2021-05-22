import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectisAuthenticated } from '../store/selectors';

const ProtectedPageNotice = () => {
  const history = useHistory();
  const isAuthenticated = useSelector(selectisAuthenticated);

  const handleGoToSignIn = () => history.push('/signin');

  return (
    <div className="protected">
      <h2 className="protected__heading">You must be signed in to view this page.</h2>
      {!isAuthenticated && <button type="button" className="button" onClick={handleGoToSignIn}>Sign In</button>}
    </div>
  );
};

export default ProtectedPageNotice;

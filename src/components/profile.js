import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectisAuthenticated, selectUser } from '../store/selectors';

const Profile = () => {
  const history = useHistory();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectisAuthenticated);

  const handleGoToSignIn = () => history.push('/signin');

  return (
    <div className="profile">
      <h1 className="profile__heading">Profile</h1>
      <h2 className="profile__subheading">{user && isAuthenticated ? `Welcome, ${user.author}` : 'You must be signed in to view this page.'}</h2>
      {!isAuthenticated && <button type="button" className="button" onClick={handleGoToSignIn}>Sign In</button>}
    </div>
  );
};

export default Profile;

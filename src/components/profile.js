import React from 'react';
import { useSelector } from 'react-redux';

import { selectisAuthenticated } from '../store/selectors';
import ProtectedPageNotice from './ProtectedPageNotice';

const Profile = () => {
  const isAuthenticated = useSelector(selectisAuthenticated);

  return (
    <div className="profile">
      <h1 className="profile__heading">Profile</h1>
      {!isAuthenticated ? <ProtectedPageNotice /> : (
        <h2>This is the content of your profile.</h2>
      )}
    </div>
  );
};

export default Profile;

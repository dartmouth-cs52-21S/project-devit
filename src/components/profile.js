import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signoutUser } from '../store/actions/index';

import { selectisAuthenticated, selectUser } from '../store/selectors';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectisAuthenticated);

  return (
    <div>
      <h1>This is the Profile Page.</h1>
      <h2>{user && isAuthenticated ? `Welcome, ${user.author}` : 'Please check you are logged in properly.'}</h2>
      {isAuthenticated ? <button type="button" onClick={() => dispatch(signoutUser(history))}>Sign Out</button> : <div />}
    </div>
  );
};

export default Profile;

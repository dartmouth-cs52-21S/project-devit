import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signoutUser } from '../store/actions/index';

import { selectAuthenticated, selectUser } from '../store/selectors';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const authenticated = useSelector(selectAuthenticated);

  return (
    <div>
      <h1>This is the Profile Page.</h1>
      <h2>{user && authenticated ? `Welcome, ${user.author}` : 'Please check you are logged in properly.'}</h2>
      {authenticated ? <button type="button" onClick={() => dispatch(signoutUser(history))}>Sign Out</button> : <div />}
    </div>
  );
};

export default Profile;

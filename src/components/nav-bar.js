import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUser } from '../store/actions';

import { selectisAuthenticated } from '../store/selectors';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(selectisAuthenticated);

  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">My Blog</NavLink></li>
        <li><NavLink to="/posts/new">New Post</NavLink></li>
        <li><NavLink to="/signin">Sign In</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li>{isAuthenticated ? <button type="button" onClick={() => dispatch(signoutUser(history))}>Sign Out</button> : <div />}</li>
      </ul>
    </nav>
  );
};

export default NavBar;

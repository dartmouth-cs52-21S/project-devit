import React from 'react';
import {
  NavLink, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser } from '../actions/index';

const NavBar = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">My Blog</NavLink></li>
        <li><NavLink to="/posts/new">New Post</NavLink></li>
        <li><NavLink to="/signin">Sign In</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li>{props.authed ? <button type="button" onClick={() => props.signoutUser(props.history)}>Sign Out</button> : <div />}</li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  authed: state.auth.authenticated,
});

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signoutUser } from '../actions/index';

const Profile = (props) => {
  console.log(props);
  return (
    <div>
      <h1>This is the Profile Page.</h1>
      <h2>{props.user && props.authed ? `Welcome, ${props.user.author}` : 'Please check you are logged in properly.'}</h2>
      {props.authed ? <button type="button" onClick={() => props.signoutUser(props.history)}>Sign Out</button> : <div />}
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  authed: reduxState.auth.authenticated,
  user: reduxState.auth.user,
});

export default withRouter(connect(mapStateToProps, { signoutUser })(Profile));

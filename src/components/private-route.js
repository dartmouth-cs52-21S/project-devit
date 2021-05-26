/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { selectAuthenticated } from '../store/selectors';

// Router Wrapper
const PrivateRoute = ({ component: Child, ...props }) => {
  const authenticated = useSelector(selectAuthenticated);

  return (
    <Route
      {...props}
      render={(routeProps) => (authenticated ? (
        <Child {...routeProps} />
      ) : (
        <Redirect to="/signin" />
      ))}
    />
  );
};

export default PrivateRoute;

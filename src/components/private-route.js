/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { selectisAuthenticated } from '../store/selectors';

// Router Wrapper
const PrivateRoute = ({ component: Child, ...props }) => {
  const isAuthenticated = useSelector(selectisAuthenticated);

  return (
    <Route
      {...props}
      render={(routeProps) => (isAuthenticated ? (
        <Child {...routeProps} />
      ) : (
        <Redirect to="/signin" />
      ))}
    />
  );
};

export default PrivateRoute;

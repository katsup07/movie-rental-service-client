/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => (
  <Route
    path={path}
    {...rest} // path= can also be set here
    render={(props) => {
      // a function that defines what to render
      if (!auth.getCurrentUser())
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }, // current location before being redirected
            }}
          />
        );
      // else
      return Component ? <Component {...props} /> : render(props);
    }}
  />
);

export default ProtectedRoute;

// <ProtectedRoute path="/movies/:id" component={MovieForm} />

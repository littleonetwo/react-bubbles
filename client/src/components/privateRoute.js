import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  return(
    <Route {...rest} render={props => (
        localStorage.getItem('token') ? (
            <Component {...props} />) : ( <Redirect to="/" /> )
    )} />
  );
};

export default PrivateRoute;

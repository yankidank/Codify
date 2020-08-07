import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { axiosInstance } from './API';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axiosInstance.get('/auth/isauthenticated').then(({ data: { user } }) => {
      if (user !== undefined) {
        setAuthenticated(true);
      } else {
        window.location = '/menu/login';
      }
    });
  }, []);

  return isAuthenticated ? <Route {...rest} render={(props) => <Component {...props} />} /> : <p>Loading</p>;
};

PrivateRoute.propTypes = {
  component: PropTypes.any
};

export default PrivateRoute;

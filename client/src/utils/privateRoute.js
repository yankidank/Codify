import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import axiosInstance from './API';

function PrivateRoute({ component: Component, ...rest }) {
	const [isAuthenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		axiosInstance.get('http://localhost:3001/auth/isauthenticated').then((data) => {
			if (data.data.user !== undefined) {
				setAuthenticated(true);
			} else {
				window.location = '/menu/login';
			}
		});
	}, []);

	return isAuthenticated ? <Route {...rest} render={(props) => <Component {...props} />} /> : <h1>{'Loading'}</h1>;
}

PrivateRoute.propTypes = {
	component: PropTypes.any
};

export default PrivateRoute;

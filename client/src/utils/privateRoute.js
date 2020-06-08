<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../App';

// this function cannot be asynchronous
export function PrivateRoute({ component: Component, ...rest }) {
	return (
		<UserContext.Consumer>
			{(user) => {
				console.log(user.userObject.isAuthenticated);
				return (
					<Route
						{...rest}
						render={(props) =>
							user.userObject.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
						}
					/>
				);
			}}
		</UserContext.Consumer>
	);
>>>>>>> context API attempt 1
}

PrivateRoute.propTypes = {
	component: PropTypes.any
};

export default PrivateRoute;

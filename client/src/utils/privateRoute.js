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
}

PrivateRoute.propTypes = {
	component: PropTypes.any
};

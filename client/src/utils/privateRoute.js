import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
// configure up axios to send cookie with request
const axiosInstance = axios.create({
	withCredentials: true
});
// this function cannot be asynchronous 
export function PrivateRoute({ component: Component, ...rest }) {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	useEffect(()=>{
		axiosInstance.get('http://localhost:3001/auth/isauthenticated').then((data) => {
			console.log(data.data.user);
			setIsLoggedIn(data.data.user); // will be undefined if user is not logged in 
		})
	}, []);
    // this needs to be returned after the ajax request
	return (<Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/menu/login" />)} />);
}

PrivateRoute.propTypes = {
	component: PropTypes.any
};

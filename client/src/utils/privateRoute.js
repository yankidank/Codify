import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';


export function PrivateRoute ({component: Component, ...rest }) {
    let isLoggedIn = false;
    // get("localhost:3001/api/getUserInfo")
    //      .then(result => isLoggedIn = result);
    //  
    return <Route {...rest} render={(props) => ( isLoggedIn ? <Component {...props} /> : <Redirect to='/login' /> )} />
}

PrivateRoute.propTypes = {
    component: PropTypes.any
}
    

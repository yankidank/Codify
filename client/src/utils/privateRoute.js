import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    let isLoggedIn = true;
    // get("localhost:3001/api/getUserInfo")
    //      .then(result => isLoggedIn = result);
    //  
    return <Route {...rest} render={(props) => ( isLoggedIn ? <Component {...props} /> : <Redirect to='/login' /> )} />
}
    

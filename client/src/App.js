import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import MenuLogin from './components/LoginMenu/MenuLogin';
import MenuLoggedIn from './components/LoginMenu/MenuLoggedIn';
import AddJob from './components/LoginMenu/AddJob';
import Dashboard from './components/Dashboard/Dashboard';
import JobsList from './components/JobList/JobsList';
import Saved from './components/JobTracking/Saved';
import { PrivateRoute } from './utils/privateRoute';
import axios from 'axios';
// configure up axios to send cookie with request
const axiosInstance = axios.create({
	withCredentials: true
});
const UserContext = React.createContext();

function App() {
	const [userObject, setUserObject] = useState({
		isAuthenticated: false,
		userInfo: {}
	});

	useEffect(() => {
		axiosInstance.get('http://localhost:3001/auth/isauthenticated').then((data) => {
			// will be undefined if user is not logged in
			if (data.data.user != undefined) {
				setUserObject({
					isAuthenticated: true,
					userInfo: data.data.user
				});
			}
		});
	}, []);

	return (
		<UserContext.Provider value={{ userObject }}>
			<Router>
				<div className="appRouter">
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={MenuLogin} />
					<Route exact path="/loggedinmenu" component={MenuLoggedIn} />
					<Route exact path="/loggedinaddjob" component={AddJob} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<Route exact path="/joblist" component={JobsList} />
					<Route exact path="/jobtracking" component={Saved} />
				</div>
			</Router>
		</UserContext.Provider>
	);
}

export { App, UserContext };

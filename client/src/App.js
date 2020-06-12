import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import MenuLogin from './components/LoginMenu/MenuLogin';
import MenuLoggedIn from './components/LoginMenu/MenuLoggedIn';
import AddJob from './components/LoginMenu/AddJob';
import Dashboard from './components/Dashboard/Dashboard';
import JobsList from './components/JobList/JobsList';
import Job from './components/JobTracking/Job';
import PrivateRoute from './utils/privateRoute';

function App() {
	return (
		<Router>
			<div className="appRouter">
				<Route exact path="/menu/login" component={MenuLogin} />
				<Switch>
					<PrivateRoute exact path="/menu" component={MenuLoggedIn} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<PrivateRoute exact path="/jobs/add" component={AddJob} />
					<PrivateRoute exact path="/jobs/:id" component={Job} />
					<PrivateRoute exact path="/jobs" component={JobsList} />
				</Switch>
				<Route exact path="/" component={Home} />
			</div>
		</Router>
	);
}

export { App };

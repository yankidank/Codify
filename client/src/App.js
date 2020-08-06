import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './components/Home';
import MenuLogin from './components/LoginMenu/MenuLogin';
import MenuLoggedIn from './components/LoginMenu/MenuLoggedIn';
import AddJob from './components/LoginMenu/AddJob';
import Dashboard from './components/Dashboard/Dashboard';
import JobsList from './components/JobList/JobsList';
import Job from './components/JobTracking/Job';
import Autofill from './components/Autofill';
import PrivateRoute from './utils/privateRoute';

function App() {
  return (
    <Router>
      <div className="appRouter">
        <Helmet titleTemplate="%s / Cōdify" defaultTitle="Cōdify">
          <title>Organize Your Job Hunt</title>
          <meta property="og:title" content="Cōdify.Works" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/logo512.png" />
          <meta property="og:site_name" content="Cōdify" />
          <meta property="og:description" content="Organize your job hunt. Import job post details from supported websites, track your progress, manage contacts, schedule interviews, and compare offers in one place." />
          <meta property="og:locale" content="en_US" />
        </Helmet>
        <Route exact path="/menu/login" component={MenuLogin} />
        <Route exact path="/autofill" component={Autofill} />
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

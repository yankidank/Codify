import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from '../pages/components/home';
import MenuLogin from '../layout/components/menu-login';
import MenuLoggedIn from '../layout/components/menu-logged-in';
import AddJob from '../pages/components/add-job';
import Dashboard from '../pages/components/dashboard';
import JobsList from '../job-list';
import Job from '../job-details';
import Autofill from '../pages/components/autofill';
import PrivateRoute from '../../utils/privateRoute';
import './app.css';

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

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import MenuLogin from "./components/LoginMenu/MenuLogin";
import MenuLoggedIn from "./components/LoginMenu/MenuLoggedIn";
import AddJob from "./components/LoginMenu/AddJob";
import Dashboard from "./components/Dashboard/Dashboard";
import JobsList from "./components/JobList/JobsList";
import Saved from "./components/JobTracking/Saved";
import Applied from "./components/JobTracking/Applied";
import Interview from "./components/JobTracking/Interview";
import Offer from "./components/JobTracking/Offer";
import {PrivateRoute} from "./utils/privateRoute"


function App() {
  return (
    <Router>
      <div className="appRouter">
        <Route exact path="/" component={Home} />
        <Route exact path="/menu/login" component={MenuLogin} />
        <PrivateRoute exact path="/menu" component={MenuLoggedIn} />
        <PrivateRoute exact path="/jobs/add" component={AddJob} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/jobs" component={JobsList} />
        <PrivateRoute exact path="/jobs/saved" component={Saved} />
        <PrivateRoute exact path="/jobs/applied" component={Applied} />
        <PrivateRoute exact path="/jobs/interview" component={Interview} />
        <PrivateRoute exact path="/jobs/offer" component={Offer} />
      </div>
    </Router>
  );
}

export default App;
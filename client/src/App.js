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
        <Route exact path="/login" component={MenuLogin} />
        <Route exact path="/loggedinmenu" component={MenuLoggedIn} />
        <Route exact path="/loggedinaddjob" component={AddJob} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/joblist" component={JobsList} />
        <Route exact path="/jobtracking/saved" component={Saved} />
        <Route exact path="/jobtracking/applied" component={Applied} />
        <Route exact path="/jobtracking/interview" component={Interview} />
        <Route exact path="/jobtracking/offer" component={Offer} />
      </div>
    </Router>
  );
}

export default App;
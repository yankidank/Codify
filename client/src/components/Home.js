import React from 'react';
import NavBar from './NavBar';
import StatusBar from './JobTracking/subComponents/StatusBar';

function Home() {
  return (
    <div className="home">
      <NavBar />
      <div className="container pushtop dashboard">
        <div className="row">
          <StatusBar state="1" first="Signup" second="Track" third="Apply" fourth="Employed" />
          <div className="col s12 m12 l12">
            <div className="card card-home">
             <h3>Begin Your Hunt</h3>
             <p>Track your favorite job posts, application status, contacts, interviews, and offers. Keep organized throughout your job hunt and stay ahead of the game!</p>
             <p>Sign up and access our job tracking tools for free.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

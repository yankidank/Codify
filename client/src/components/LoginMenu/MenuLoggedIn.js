import React from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import axios from 'axios';

const handleLogout = () => {
  axios.get('/auth/logout', '_self');
  window.location = '/';
};

function MenuLoggedIn() {
  return (
    <div>
      <NavBar />
      <div className="menuNav">
        <ul>
          <li>
            <a href="/" className="button btn-home-login">
              Home
            </a>
          </li>
          <li>
            <a href="/jobs" className="button btn-home-login">
              Your Jobs
            </a>
          </li>
          <li>
            <a href="/jobs/add" className="button btn-home-login">
              Add Job
            </a>
          </li>
          <li>
            <span onClick={handleLogout} className="button btn-home-login">
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuLoggedIn;

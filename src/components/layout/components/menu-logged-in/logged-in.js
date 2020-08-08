import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import NavBar from '../../../layout/components/navbar';

const handleLogout = () => {
  axios.get('/auth/logout');
  window.location.href = '/';
};

function MenuLoggedIn() {
  return (
    <div>
      <Helmet>
        <title>Menu</title>
      </Helmet>
      <NavBar />
      <div>
        <ul className="menuNav">
          <li>
            <a href="/dashboard" className="button btn-home-login">
              Dashboard
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

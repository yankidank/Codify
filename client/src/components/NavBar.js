import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {axiosInstance} from '../utils/API';

function NavBar() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    axios.get('/auth/logout');
  };

  useEffect(() => {
    axiosInstance.get('/auth/isauthenticated').then(({ data: { user } }) => {
      if (user !== undefined) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);
  
	// Menu back button
	const handleBack = () => {
		if (document.referrer.indexOf(window.location.host) !== -1) {
			window.history.go(-1);
			return false;
		} else {
			window.location.href = '/';
		}
	};

  return (
    <div className="app-navbar-fixed">
      <nav id="navbar" className="nav-class">
        <div className="nav-wrapper">
          <button
            id="nav-back-btn"
            onClick={handleBack}
            data-target="nav-mobile"
            className="left nav-back"
          >
            <img src="/assets/img/icon-nav-back.png" alt="← Back" />
          </button>
          <a href={isAuthenticated ? "/dashboard" : "/"} className="brand-logo center">
            Cōdify
          </a>
          { isAuthenticated ?
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/jobs">Your Jobs</a>
              </li>
              <li>
                <a href="/jobs/add">Add Job</a>
              </li>
              <li>
                <a href="/" onClick={handleLogout} >Logout</a>
              </li>
            </ul>
          :
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="/menu/login">Login</a>
              </li>
            </ul>
          }
          <a
            href="/menu"
            id="menu-trigger"
            data-target="slide-out"
            className="right sidenav-trigger"
          >
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

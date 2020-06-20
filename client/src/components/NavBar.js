import React from 'react';

function NavBar() {
	// Menu back button
	const handleBack = () => {
		if (document.referrer.indexOf(window.location.host) !== -1) {
			window.history.go(-1);
			//window.history.back();
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
          <a href="/" className="brand-logo center">
            Cōdify
          </a>
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
              <a href="/menu/login">Login</a>
            </li>
            <li>
              <a href="/auth/logout">Logout</a>
            </li>
          </ul>
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

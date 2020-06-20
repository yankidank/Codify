import React from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
const handleLogout = () => {
	axios.get('http://localhost:3001/auth/logout');
	window.location = '/';
};

function MenuLoggedIn() {
	return (
		<div>
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

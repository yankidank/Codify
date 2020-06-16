import React from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
const handleLogout = () => {
	axios.get('/auth/logout');
	window.location = '/';
};
const testBackend = () => {
	// axios.get('/api/contacts/user/5ee325eaadf366a19608ba65').then((data) => console.log(data));
	axios.get('/api/contacts').then((data) => console.log(data));
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
					<li>
						<span onClick={testBackend} className="button btn-home-login">
							Axios
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default MenuLoggedIn;

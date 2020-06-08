import React, { useContext } from 'react';
import { UserContext } from '../../App';

const handleGoogleLogin = () => {
	window.open('http://localhost:3001/auth/google', '_self');
};
const handleGithubLogin = () => {
	window.open('http://localhost:3001/auth/github', '_self');
};
const handleLinkedInLogin = () => {
	window.open('http://localhost:3001/auth/linkedin', '_self');
};
const handleLogout = () => {
	window.open('http://localhost:3001/auth/logout', '_self');
};
function MenuLogin() {
	return (
		<div className="menuLogin">
			<ul>
				<li>
					<button>HOME</button>
				</li>
				<li>
					<button>ABOUT</button>
				</li>
				<li>
					<button onClick={handleGithubLogin}>LOGIN: Github</button>
				</li>
				<li>
					<button onClick={handleLinkedInLogin}>LOGIN: LinkedIn</button>
				</li>
				<li>
					<button onClick={handleGoogleLogin}>LOGIN: Google</button>
				</li>
				<li>
					<button onClick={handleLogout}>LOGOUT</button>
				</li>
			</ul>
			{/* <UserContext.Consumer>
				{(user) => {
					console.log(user.isAuthenticated);
					return <div>{user.userObject.displayName}</div>;
				}}
			</UserContext.Consumer> */}
		</div>
	);
}

export default MenuLogin;

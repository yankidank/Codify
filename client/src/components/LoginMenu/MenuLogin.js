import React from "react";

const handleGoogleLogin = () => {
    window.open("http://localhost:3001/auth/google", "_self")
}
const handleGithubLogin = () => {
    window.open("http://localhost:3001/auth/github", "_self")
}
const handleLinkedInLogin = () => {
    window.open("http://localhost:3001/auth/linkedin", "_self")
}
const handleLogout = () => {
    window.open("http://localhost:3001/auth/logout", "_self");
}
function MenuLogin(){
    return (
        <div>
            <ul>
                <li><button>HOME</button></li>
                <li><button>ABOUT</button></li>
                <li><button onClick={handleGithubLogin}>LOGIN: Github</button></li>
                <li><button onClick={handleLinkedInLogin}>LOGIN: LinkedIn</button></li>
                <li><button onClick={handleGoogleLogin}>LOGIN: Google</button></li>
                <li><button onClick={handleLogout}>LOGOUT</button></li>
            </ul>
        </div>
    )
}

export default MenuLogin;
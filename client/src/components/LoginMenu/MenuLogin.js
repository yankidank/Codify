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
        <div className="menuLogin">
            <ul>
                <li><button className="btn-home-login">HOME</button></li>
                <li><button className="btn-home-login">ABOUT</button></li>
                <li><button onClick={handleGithubLogin} className="btn-github">
                    <div><img src="./assets/img/icon-github.png" style={{height: "25px"}}></img></div>
                    <div>Login with GitHub</div>
                    </button></li>
                <li><button onClick={handleLinkedInLogin} className="btn-linkedin">
                    <div><img src="./assets/img/icon-linkedin.png" style={{height: "25px"}}></img></div>
                    <div>Login with LinkedIn</div>
                    </button></li>
                <li><button onClick={handleGoogleLogin} className="btn-google">
                    <div><img src="./assets/img/icon-google.png" style={{height: "25px"}}></img></div>
                    <div>Login with Google</div>
                    </button></li>
                <li><button onClick={handleLogout}>LOGOUT</button></li>
            </ul>
        </div>
    )
}

export default MenuLogin;
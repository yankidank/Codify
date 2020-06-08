import React from "react";

function MenuLogin(){
    return (
        <div className="menuLogin">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="http://localhost:3001/auth/github" rel="nofollow"><div className="btn btn-login btn-login-github">Github Login</div></a></li>
                <li><a href="http://localhost:3001/auth/linkedin" rel="nofollow"><div className="btn btn-login btn-login-github">LinkedIn Login</div></a></li>
                <li><a href="http://localhost:3001/auth/google" rel="nofollow"><div className="btn btn-login btn-login-github">Google Login</div></a></li>
                <li><a href="http://localhost:3001/auth/logout">LOGOUT</a></li>
            </ul>
        </div>
    )
}

export default MenuLogin;
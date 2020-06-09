import React from "react";

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
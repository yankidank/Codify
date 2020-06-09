import React from "react";
import NavBar from "../NavBar"

const handleGoogleLogin = () => {
    window.open("http://localhost:3001/auth/google", "_self")
}
const handleGithubLogin = () => {
    window.open("http://localhost:3001/auth/github", "_self")
}
const handleLinkedInLogin = () => {
    window.open("http://localhost:3001/auth/linkedin", "_self")
}
const handleHome = () => {
    window.open("/", "_self")
}
function MenuLogin(){
    return (
        <div>
            <NavBar />
            <div className="menuNav">
                <ul>
                    <li><button onClick={handleHome} className="btn-home-login">HOME</button></li>
                    {/* <li><button onClick={handleAbout} className="btn-home-login">ABOUT</button></li> */}
                    <li><button onClick={handleGithubLogin} className="btn-github">
                        <div className="btn-logo"><img src="/assets/img/icon-github.png" alt="GitHub"></img></div>
                        <div className="btn-title">Login with GitHub</div>
                        </button>
                    </li>
                    <li><button onClick={handleLinkedInLogin} className="btn-linkedin">
                        <div className="btn-logo"><img src="/assets/img/icon-linkedin.png" alt="LinkedIn"></img></div>
                        <div className="btn-title">Login with LinkedIn</div>
                        </button>
                    </li>
                    <li><button onClick={handleGoogleLogin} className="btn-google">
                        <div className="btn-logo"><img src="/assets/img/icon-google.png" alt="Google"></img></div>
                        <div className="btn-title">Login with Google</div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuLogin;
import React from "react";

function MenuLogin(){
    return (
        <div className="menuLogin">
            <ul>
                <li><a href="/">HOME</a></li>
                <li><a href="/">ABOUT</a></li>
                <li><a href="/auth/github"><div className="btn btn-login btn-github">Github</div></a></li>
                <li><a href="/auth/linkedin"><div className="btn btn-login btn-github">LinkedIn</div></a></li>
                <li><a href="/auth/google"><div className="btn btn-login btn-github">Google</div></a></li>
            </ul>
        </div>
    )
}

export default MenuLogin;
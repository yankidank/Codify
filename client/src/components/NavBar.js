import React from "react";

const handleBack = () => {
    if (document.referrer.indexOf(window.location.host) !== -1) {
        window.history.go(-1);
        //window.history.back();
        return false
    } else {
        window.location.href = '/';
    }
}

function NavBar(){
    return(
        <div className="navbar-fixed">
            <nav id="navbar">
                <div className="nav-wrapper">
                    <button id="nav-back-btn" onClick={handleBack} data-target="nav-mobile" className="left nav-back"><img src="/assets/img/icon-nav-back.png" alt="← Back" /></button>
                    <a href="/" className="brand-logo center">Présumé</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/">Home</a></li>
                        <li><a href="/jobs">Your Jobs</a></li>
                        <li><a href="/jobs/add">Add Job</a></li>
                        {/* <li><a href="/about">About</a></li> */}
                        <li><a href="/menu/login">Login</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                    <a href="/menu" id="menu-trigger" data-target="slide-out" className="right sidenav-trigger"><i className="material-icons">menu</i></a>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;
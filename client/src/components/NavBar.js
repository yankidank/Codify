import React from "react";

function NavBar(){
    return(
        <div className="navbar-fixed">
            <nav id="navbar">
                <div className="nav-wrapper">
                    <a href="#" data-target="nav-mobile" className="left nav-back"><img src="/assets/img/icon-nav-back.png" /></a>
                    <a href="#" className="brand-logo center">Présumé</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Your Jobs</a></li>
                        <li><a href="#">Add Job</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                    <a href="#" data-target="nav-mobile" className="right sidenav-trigger"><i className="material-icons">menu</i></a>
                </div>
            </nav>
      </div>
    )
}

export default NavBar;
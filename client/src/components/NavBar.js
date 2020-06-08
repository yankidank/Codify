import React from "react";

function NavBar(){
    return(
        <div className="navbar-fixed">
            <nav id="navbar">
                <div className="nav-wrapper">
                    <a href="#back" data-target="nav-mobile" className="left nav-back"><img src="/assets/img/icon-nav-back.png" alt="← Back" /></a>
                    <a href="./" className="brand-logo center">Présumé</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="./">Home</a></li>
                        <li><a href="./jobs">Your Jobs</a></li>
                        <li><a href="./jobs/add">Add Job</a></li>
                        <li><a href="./about">About</a></li>
                        <li><a href="./logout">Logout</a></li>
                    </ul>
                    <a href="#menu" id="menu-trigger" data-target="slide-out" className="right sidenav-trigger"><i className="material-icons">menu</i></a>
                </div>
            </nav>

            <ul id="slide-out" className="sidenav">
                <li>
                    <div className="user-view">
                        <a href="#name"><span className="white-text name">John Doe</span></a>
                        <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                    </div>
                </li>
                <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                <li><a href="#!">Second Link</a></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>

      </div>
    )
}

export default NavBar;
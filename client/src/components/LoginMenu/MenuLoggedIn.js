import React from "react";
import NavBar from "../NavBar"

const handleHome = () => {
    window.open("/", "_self")
}
const handleJobs = () => {
    window.open("/jobs", "_self")
}
const handleAdd = () => {
    window.open("/jobs/add", "_self")
}
const handleLogout = () => {
    window.open("/logout", "_self")
}

function MenuLoggedIn(){
    return (
        <div>
            <NavBar />
            <div className="menuNav">
                <ul>
                    <li><button onClick={handleHome} className="btn-home-login">HOME</button></li>
                    {/* <li><button onClick={handleAbout} className="btn-home-login">ABOUT</button></li> */}
                    <li><button onClick={handleJobs} className="btn-home-login">YOUR JOBS</button></li>
                    <li><button onClick={handleAdd} className="btn-home-login">ADD JOB</button></li>
                    <li><button onClick={handleLogout} className="btn-home-login">LOGOUT</button></li>
                </ul>
            </div>
        </div>
    )
}

export default MenuLoggedIn;

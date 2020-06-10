import React from "react";
import NavBar from "../NavBar"

const handleAdd = () => {
    window.open("/jobs", "_self")
}

function AddJob(){
    return(
        <div>
            <NavBar />
            <div className="menuNav">
                <ul>
                    <li className="btn-home-login">Add Job URL</li>
                    {/* <li><input className="menu-url-input" placeholder="https://"></input></li> */}
                    <li><input className="menu-url-input-field" placeholder="https://"></input></li>
                    <li><button onClick={handleAdd} className="btn-job-add">Track Job</button></li>
                </ul>
            </div>
        </div>
    )
}

export default AddJob;
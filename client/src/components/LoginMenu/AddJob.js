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
                    <li className="btn-home-login">Job Post URL</li>
                    <li><input className="menu-url-input-field" id="paste" placeholder="https://"></input></li>
                    <li><button onClick={handleAdd} className="btn-job-add">Save Job</button></li>
                </ul>
            </div>
        </div>
    )
}

export default AddJob;
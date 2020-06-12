import React from "react";
import StatusMenu from "./StatusMenu"

function CompanyInfo(){
    return(
        <div className="col s12 m12 l6 saved">
            <div className="card companyInfo">
                <div>
                    <a href="#addphoto" data-target="nav-mobile" className="right sidenav-trigger"><i className="material-icons">add_a_photo</i></a>
                    <img bsrc="https://image.flaticon.com/icons/svg/306/306424.svg" alt="ⓒ Logo" style={{height: "50px"}}></img>
                    <p>POSITION</p>
                    <p>LOCATION</p>
                </div>
                <div>
                    DROPDOWN
                    <StatusMenu />
                </div>
            </div>
        </div>
    )
}

export default CompanyInfo;
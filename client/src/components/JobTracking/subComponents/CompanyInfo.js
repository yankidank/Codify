import React from "react";
import StatusMenu from "./StatusMenu"

function CompanyInfo(){
    return(
        <div className="companyInfo">
            <div>
                <a href="#" data-target="nav-mobile" class="right sidenav-trigger"><i class="material-icons">add_a_photo</i></a>
                <img bsrc="https://image.flaticon.com/icons/svg/306/306424.svg" style={{height: "50px"}}></img>
                <p>POSITION</p>
                <p>LOCATION</p>
            </div>
            <div>
                DROPDOWN
                <StatusMenu />
            </div>
        </div>
    )
}

export default CompanyInfo;
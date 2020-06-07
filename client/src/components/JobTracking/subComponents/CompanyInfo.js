import React from "react";
import StatusMenu from "./StatusMenu"

function CompanyInfo(){
    return(
        <div>
            <div>
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
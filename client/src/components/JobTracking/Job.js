import React from "react";
import NavBar from "../NavBar"
import CompanyInfo from "./subComponents/CompanyInfo"
import StatusBar from "./subComponents/StatusBar"
import Position from "./subComponents/Position"
import Contact from "./subComponents/Contact"
import InterviewInputs from "./subComponents/Interview"
import OfferInputs from "./subComponents/Offer"

function Saved(){
    return(
        <div className="job">
            <NavBar />
            <div className="container">
                <div className="row">
                    <CompanyInfo />
                    <StatusBar state="saved" />
                    <Position />
                    <Contact />
                    <InterviewInputs />
                    <OfferInputs />
                </div>
            </div>
        </div>
    )
}

export default Saved;


import React from "react";
import NavBar from "../NavBar"
import CompanyInfo from "./subComponents/CompanyInfo"
import StatusBar from "./subComponents/StatusBar"
import Position from "./subComponents/Position"
import Contact from "./subComponents/Contact"
import InterviewInputs from "./subComponents/Interview"
import NewContactBtn from "./subComponents/NewContactBtn"
import NewInterviewBtn from "./subComponents/NewInterviewBtn"

function Interview(){
    return(
        <div className="interview">
            <NavBar />
            <div className="container">
                <div className="row">
                    <CompanyInfo />
                    <StatusBar state="interview"/>
                    <NewInterviewBtn />
                    <InterviewInputs />
                    <NewContactBtn />
                    <Contact />
                    <Position />
                </div>
            </div>
        </div>
    )
}

export default Interview;
import React from "react";
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
            <CompanyInfo />
            <StatusBar />
            <NewInterviewBtn />
            <InterviewInputs />
            <NewContactBtn />
            <Contact />
            <Position />
        </div>
    )
}

export default Interview;
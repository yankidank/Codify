import React from "react";
import CompanyInfo from "./components/CompanyInfo"
import StatusBar from "./components/StatusBar"
import Position from "./components/Position"
import Contact from "./components/Contact"
import InterviewInputs from "./components/Interview"
import NewContactBtn from "./components/NewContactBtn"
import NewInterviewBtn from "./components/NewInterviewBtn"

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
import React from "react";

function InterviewInputs(){
    return(
        <div>
            <div>
                <input value="Date"></input>
                <input value="Time"></input>
                <input value="Location"></input>
                <textarea value="Notes"></textarea>
                <button>ADD NEW INTERVIEW</button>
            </div>
        </div>
    )
}

export default InterviewInputs;
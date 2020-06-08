import React from "react";

function Position(){
    return(
        <div className="position">
            <div>
                <h3>Header: Position</h3>
            </div>
            <div>
                <input value="Title"></input>
                <input value="Salary"></input>
                <input value="Comapny Name"></input>
                <input value="Location"></input>
                <button>VIEW JOB POST</button>
            </div>
            <div>
                <button>REMOVE JOB POST</button>
            </div>
        </div>
    )
}

export default Position;
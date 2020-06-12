import React from "react";

function Position(){
    return(
        <div className="col s12 m12 l6">
            <div className="card position">
                <div>
                    <h3>Position</h3>
                </div>
                <div>
                    <input placeholder="Title"></input>
                    <input placeholder="Salary"></input>
                    <input placeholder="Comapny Name"></input>
                    <input placeholder="Location"></input>
                    <button>VIEW JOB POST</button>
                </div>
                <div>
                    <button>REMOVE JOB POST</button>
                </div>
            </div>
        </div>
    )
}

export default Position;
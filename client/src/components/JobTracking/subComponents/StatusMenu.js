import React from "react";

function StatusMenu(){
    return(
        <div className="col s12 m12 l12">
            <div className="jobListingStatusMenu">
                <ul>
                    <li><button>SAVE</button></li>
                    <li><button>APPLIED</button></li>
                    <li><button>INTERVIEWING</button></li>
                    <li><button>JOB OFFERS</button></li>
                    <li><button>ENDED</button></li>
                </ul>
            </div>
        </div>
    )
}

export default StatusMenu;
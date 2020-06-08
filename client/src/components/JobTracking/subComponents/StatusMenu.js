import React from "react";

function StatusMenu(){
    return(
        <div className="jobListingStatusMenu">
            <ul>
                <li><button>SAVE</button></li>
                <li><button>APPLIED</button></li>
                <li><button>INTERVIEWING</button></li>
                <li><button>JOB OFFERS</button></li>
                <li><button>ENDED</button></li>
            </ul>
        </div>
    )
}

export default StatusMenu;
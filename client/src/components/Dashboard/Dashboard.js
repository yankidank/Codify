import React from "react";
import DoughtnutChart from "./Doughnut"
import List from "../JobList/List"

function Dashboard(){
    return(
        <div className="container dashboard">
            <div className="row">
                <DoughtnutChart />
                <List />
            </div>
        </div>
    )
}

export default Dashboard;
import React from "react";
import DoughtnutChart from "./Doughnut";
import List from "../JobList/List"

function Dashboard(){
    return(
        <div>
            <div>
                <DoughtnutChart />
            </div>
            <div>
                <h3>Header: Recent Jobs</h3>
            </div>
            <div>
                <List />
            </div>
        </div>
    )
};

export default Dashboard;
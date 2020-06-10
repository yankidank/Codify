import React from "react";
import DoughtnutChart from "./Doughnut"
import List from "../JobList/List"
import NavBar from "../NavBar"

function Dashboard(){
    return(
        <div>
            <NavBar />
            <div className="container dashboard">
                <div className="row">
                    <DoughtnutChart />
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
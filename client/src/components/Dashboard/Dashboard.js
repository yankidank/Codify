import React from "react";
import DoughtnutChart from "./Doughnut"
import List from "../JobList/List"
import NavBar from "../NavBar"

function Dashboard(){
    return(
        <div>
            <NavBar />
            <div className="container pushtop dashboard">
                <div className="row">
                    <DoughtnutChart />
                    <List cols="col s12 m12 l8" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
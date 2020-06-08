import React from "react";
import NavBar from "./NavBar"
import Dashboard from "./Dashboard/Dashboard"


function Home(){
    return(
        <div className="home">
            <NavBar />
            <Dashboard />
        </div>
    )
}

export default Home;
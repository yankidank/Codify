import React from "react";
import NavBar from "../NavBar"
import Search from "./Search"
import Filter from "./Filter"
import List from "./List"

const handleAdd = () => {
    window.open("/jobs/add", "_self")
}

function JobsList(){
    return(
        <div>
            <NavBar />
            <div classNmame="jobsList">
                <div>
                    <h3>Jobs List</h3>
                    <button onClick={handleAdd}>Add New Job</button>
                </div>
                <div>
                    <Search />
                    <Filter />
                </div>
                <div>
                    <List />
                </div>
            </div>
        </div>
    )
}

export default JobsList;
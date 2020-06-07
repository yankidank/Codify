import React from "react";
import Search from "./Search";
import Filter from "./Filter";
import List from "./List";

function JobsList(){
    return(
        <div>
            <div>
                <h3>Header: Jobs List</h3>
                <button>ADD NEW JOB</button>
            </div>
            <div>
                <Search />
                <Filter />
            </div>
            <div>
               <List />
            </div>
        </div>
    )
};

export default JobsList;
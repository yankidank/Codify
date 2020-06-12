import React from "react";
import PropTypes from 'prop-types';
import Filter from "./Filter"
import OneJobListing from "./JobListItem"

const handleAdd = () => {
    window.open("/jobs/add", "_self")
}

function List(props){
    return (
        <div className={props.cols}>
            <div className="card oneJobListing">
                <div className="card-image">
                    <span className="card-title">Recent Jobs</span>
                    <span className="card-button" onClick={handleAdd}>Add New Job</span>
                </div>
                <div className="container container-full ">
                    <Filter />
                    <OneJobListing />
                </div>
            </div>
        </div>
    )
}

List.propTypes = {
    cols: PropTypes.string,
}

export default List;



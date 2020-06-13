import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import OneJobListing from './JobListItem';

function List(props) {
  return (
    <div className={props.cols}>
      <div className="card oneJobListing">
        <div className="card-image">
          <span className="card-title">Recent Jobs</span>
          <a className="card-button" href="/jobs/add">
            Add New Job
          </a>
        </div>
        <div className="container container-full ">
          <Filter />
          <OneJobListing />
        </div>
      </div>
    </div>
  );
}

List.propTypes = {
  cols: PropTypes.string,
};

export default List;

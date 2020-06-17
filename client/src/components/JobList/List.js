import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import OneJobListing from './JobListItem';

function List(props) {
  console.log(props.jobs)
  return (
    <div className={props.cols}>
      <div className="row card-image">
        <div className="col s6 card-title">
          Recent Jobs
        </div>
        <div className="col s6">
          <a href="/jobs/add" className="card-button" id="new-contact-btn">
            Add Job
          </a>
        </div>
      </div>
      <div className="card card-contact">
        <div className="container container-full">
          <Filter />
          <OneJobListing />
          {/* {props.jobs.map(job =>( 

            <OneJobListing 
            name ={job.name}
            />
          ))} */}
          
        </div>
      </div>
    </div>
  );
}

List.propTypes = {
  cols: PropTypes.string,
};

export default List;

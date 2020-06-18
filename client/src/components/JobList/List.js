import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import OneJobListing from './JobListItem';

function List(props) {
  
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
  
          {props.jobs.map(job =>( 

            <OneJobListing 
            id={job._id}
            key ={job._id} 
            companyName = {job.company.displayName}
            position= {job.post.position}
            city={job.post.city}
            state={job.post.state}
            // status={job.statusHistory}
            />
          ))}
          
        </div>
      </div>
    </div>
  );
}

List.propTypes = {
  cols: PropTypes.string,
  jobs: PropTypes.object,
};

export default List;

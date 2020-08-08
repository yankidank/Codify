import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OneJobListing from '../job-list-item';
import Filter from '../filter';

function List(props) {
  const inputJobs = props.jobs;
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setJobs(inputJobs);
  }, [inputJobs]);

  useEffect(filterJobs, [filters]);

  function filterJobs() {
    if (filters.length !== 0) {
      const filtered = inputJobs.filter(({ status }) => filters.includes(status && status.toLowerCase()));
      setJobs(filtered);
    } else {
      setJobs(inputJobs);
    }
  }

  const handleFilterChange = (status) => {
    // don't nullify event object
    const statusIndex = filters.indexOf(status);
    console.log({ status, statusIndex });
    if (statusIndex > -1) {
      const filtersClone = filters.concat();
      filtersClone.splice(statusIndex, 1);
      setFilters(filtersClone);
    } else {
      setFilters([...filters, status]);
    }
  };
  return (
    <div className={props.cols}>
      <div className="row card-image">
        <div className="col s6 card-title">Recent Jobs</div>
        <div className="col s6">
          <a href="/jobs/add" className="card-button" id="new-contact-btn">
            Add Job
          </a>
        </div>
      </div>
      <div className="card card-jobslist">
        <div className="container container-full">
          <Filter handleFilterChange={handleFilterChange} />
          {jobs.length ? (
            jobs.map((job) => (
              <OneJobListing
                id={job._id}
                key={job._id}
                companyName={job.company.displayName}
                position={job.post.position}
                city={job.post.city}
                state={job.post.state}
                url={job.post.url}
                status={job.status}
              />
            ))
          ) : (
            <p className="center">
              No Jobs Returned. Would you like to <a href="/jobs/add">add a new job</a>?
            </p>
          )}
          <button className="btn btn-card btn-more">Load More</button>
        </div>
      </div>
    </div>
  );
}

List.propTypes = {
  cols: PropTypes.string,
  jobs: PropTypes.array,
};

export default List;

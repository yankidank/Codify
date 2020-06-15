import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import OneJobListing from './JobListItem';

function List(props) {
  return (
    <div className={props.cols}>
      <div className="row card-image">
        <div className="col s7 card-title">
          Recent Jobs
        </div>
        <div className="col s5">
          <div className="card-button" id="new-contact-btn">
            Add Job
          </div>
        </div>
      </div>
      <div className="card card-contact">
        <div className="container container-full">
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

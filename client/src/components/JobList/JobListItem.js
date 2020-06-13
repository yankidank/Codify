import React from 'react';

function OneJobListing() {
  return (
    <div className="row card-content">
      <div className="card-inner">
        <div className="col m2 l2 company-image">
          <i className="company-img-src material-icons">add_a_photo</i>
        </div>
        <div className="co8 m8 l8 company-details">
          <a href="/jobs/1">
            <h3>COMPANY NAME</h3>
            <p>JOB TITLE</p>
            <p>LOCATION</p>
          </a>
        </div>
        <div className="col m2 l2 btn-status">
          <button className="btn-saved">Saved</button>
        </div>
      </div>
    </div>
  );
}

export default OneJobListing;

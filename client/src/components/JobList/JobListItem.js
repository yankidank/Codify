import React from 'react';

function OneJobListing() {

  return (
    <div className="card-content">
      <div className="row card-inner">
        <div className="col s3 m2 l2 company-image">
          <i className="company-img-src material-icons">add_a_photo</i>
        </div>
        <div className="col s5 m6 l7 company-details">
          <a href="/jobs/1">
            <h3>Alphabet</h3>
            <p>Position Title</p>
            <p>City, State</p>
          </a>
        </div>
        <div className="col s4 m4 l3 btn-status">
          <button className="btn-applied">Applied</button>
        </div>
      </div>
      {/* <!-- Repeat --> */}
    </div>
  );
}

export default OneJobListing;

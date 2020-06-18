import React from 'react';
import PropTypes from 'prop-types';

function OneJobListing(props) {

  const id = props.id

  return (
    <div className="card-content">
      <div className="row card-inner">
        <div className="col s3 m2 l2 company-image">
          <i className="company-img-src material-icons">add_a_photo</i>
        </div>
        <div className="col s5 m6 l7 company-details">
          <a href={`/jobs/${id}`}>
            <h3>{props.companyName}</h3>
            <p>{props.position}</p>
            <p>{props.city}, {props.state}</p>
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

OneJobListing.propTypes = {
  id: PropTypes.string,
  companyName: PropTypes.string,
  position: PropTypes.string,
  city: PropTypes.string, 
  state: PropTypes.string
}

export default OneJobListing;

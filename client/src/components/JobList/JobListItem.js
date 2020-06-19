import React from 'react';
import PropTypes from 'prop-types';

function OneJobListing(props) {

  const {id, companyName, position, city, state, status} = props;

  // Create Logo URL
  const logoBase = 'https://logo.clearbit.com/';
  const logoCompany = companyName.trim().toLowerCase()+'.com';
  const logoSrc = logoBase+logoCompany;

  return (
      <div className="row card-inner">
        <div className="col s3 m2 l2 company-image">
          <img src={logoSrc} alt=" " className="company-img-src" />
        </div>
        <div className="col s5 m6 l7 company-details">
          <a href={`/jobs/${id}`}>
            <h3>{companyName}</h3>
            <p>{position}</p>
            <p>{city}, {state}</p>
          </a>
        </div>
        <div className="col s4 m4 l3 btn-status">
          <button className="btn-applied">{status[0].toUpperCase() + status.slice(1)}</button>
        </div>
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

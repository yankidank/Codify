import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function OneJobListing(props) {

  const [logo, setLogo] = useState('/assets/img/logo.png');

  useEffect(() => {
    // Create Logo URL
    const logoBase = 'https://logo.clearbit.com/';
    const logoCompany = companyName.trim().toLowerCase()+'.com';
    const logoUrl = logoBase+logoCompany;
    // Check that the image exists or fallback to default
    const getImageOrFallback = (path, fallback) => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = path;
        img.onload = () => resolve(path);
        img.onerror = () => resolve(fallback);
      });
    };
    const fetchData = async () => {
      const data = await getImageOrFallback(logoUrl,'/assets/img/logo.png' );
      setLogo(data);
    }
    fetchData();
	}, []);

  const {id, companyName, position, city, state} = props;

  return (
      <div className="row card-inner">
        <div className="col s3 m2 l2 company-image">
          <img src={logo} alt=" " className="company-img-src" />
        </div>
        <div className="col s5 m6 l7 company-details">
          <a href={`/jobs/${id}`}>{logo}
            <h3>{companyName}</h3>
            <p>{position}</p>
            <p>{city}, {state}</p>
          </a>
        </div>
        <div className="col s4 m4 l3 btn-status">
          <button className="btn-applied">Applied</button>
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

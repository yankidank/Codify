import React from "react";

function CompanyInfo() {
  return (
    <div className="col s12 m12 l12">
      <div className="row card-content company-header">
        <div className="card-inner job-company">
          <div className="col s2 m2 l2 company-image">
            <i className="company-img-src material-icons">add_a_photo</i>
          </div>
          <div className="col s8 m8 l8 company-details">
            <input className="company-input" id="company-name" placeholder="Company Name"></input>
            <input className="company-input" id="company-city" placeholder="City"></input>
            <input className="company-input" id="company-state" placeholder="State"></input>
          </div>
          <div className="col s2 m2 l2 btn-status">
            <button className="btn-saved">Saved</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;

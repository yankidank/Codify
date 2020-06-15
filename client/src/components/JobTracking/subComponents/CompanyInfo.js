import React from "react";

function CompanyInfo() {
  return (
    <div className="col s12 m12 l12">
      <div className="row card-content company-header">
        <div className="card-inner job-company">
          <div className="col s12 m2 l2 company-image">
            <i className="company-img-src material-icons">add_a_photo</i>
          </div>
          <div className="col s12 m6 l7 company-details">
            <div className="row">
              <input className="col s12 m12 l12 company-input" id="company-name" placeholder="Company Name"></input>
              <input className="col s12 m12 l12 company-input" id="company-jobtitle" placeholder="Position Title"></input>
              <input className="col s12 m5 l4 company-input" id="company-city" placeholder="City"></input>
              <input className="col s12 m5 l4 company-input" id="company-state" placeholder="State"></input>
            </div>
          </div>
          <div className="col s12 m4 l3 btn-status">
            <button className="btn-saved">Saved</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;

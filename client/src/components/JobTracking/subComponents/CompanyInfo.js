import React from "react";

function CompanyInfo() {
  return (
    <div className="col s12 m12 l6">
      <div className="row card-content company-header">
        <div className="card-inner job-company">
          <div className="col m2 l2 company-image">
            <i className="company-img-src material-icons">add_a_photo</i>
          </div>
          <div className="co8 m8 l8 company-details">
            <h3>COMPANY NAME</h3>
            <p>JOB TITLE</p>
            <p>LOCATION</p>
          </div>
          <div className="col m2 l2 btn-status">
            <button className="btn-saved">Saved</button>
          </div>
        </div>
      </div>
      <div className="card companyInfo">
        <div>
          <input placeholder="Company Name"></input>
          <input placeholder="Street Address"></input>
          <input placeholder="City"></input>
          <input placeholder="State"></input>
          <input placeholder="ZIP"></input>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;

import React from "react";

function CompanyInfo() {
  return (
    <div className="col s12 m12 l12">
      <div className="row card-content company-header">
        <div className="card-inner job-company">
          <div className="col m2 l2 company-image">
            <i className="company-img-src material-icons">add_a_photo</i>
          </div>
          <div className="co8 m8 l8 company-details">
            <h3>Company</h3>
            <p>Job Title</p>
            <p>City, State</p>
          </div>
          <div className="col m2 l2 btn-status">
            <button className="btn-saved">Saved</button>
          </div>
        </div>
      </div>
      <div className="card companyInfo">
        <div>
          <input className="col s6 m6 l6" placeholder="Company Name"></input>
          <input className="col s6 m6 l6" placeholder="Street Address"></input>
          <input className="col s6 m3 l3" placeholder="City"></input>
          <input className="col s6 m3 l3" placeholder="State"></input>
          <input className="col s6 m6 l6" placeholder="ZIP"></input>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;

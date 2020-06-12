import React from 'react';
import StatusMenu from './StatusMenu';

<<<<<<< HEAD
function CompanyInfo(){
    return(
        <div className="col s12 m12 l6">
            <div className="row card-content">
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
                        <button className="btn-applied">Applied</button>
                    </div>
                </div>
            </div>
            <div className="card companyInfo">
                <div>
                    <a href="#addphoto" data-target="nav-mobile" className="right sidenav-trigger"><i className="material-icons">add_a_photo</i></a>
                    <img src="https://image.flaticon.com/icons/svg/306/306424.svg" alt="ⓒ Logo" style={{height: "50px"}}></img>
                    <p>POSITION</p>
                    <p>LOCATION</p>
                </div>
                <div>
                    DROPDOWN
                    <StatusMenu />
                </div>
            </div>
=======
function CompanyInfo() {
  return (
    <div className="col s12 m12 l12">
      <div className="row card-content">
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
            <button className="btn-applied">Applied</button>
          </div>
>>>>>>> 53643ae5e07980cb696cae9a22f3fcaae267b90b
        </div>
      </div>
      <div className="card companyInfo">
        <div>
          <a
            href="#addphoto"
            data-target="nav-mobile"
            className="right sidenav-trigger"
          >
            <i className="material-icons">add_a_photo</i>
          </a>
          <img
            src="https://image.flaticon.com/icons/svg/306/306424.svg"
            alt="ⓒ Logo"
            style={{ height: '50px' }}
          ></img>
          <p>POSITION</p>
          <p>LOCATION</p>
        </div>
        <div>
          DROPDOWN
          <StatusMenu />
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;

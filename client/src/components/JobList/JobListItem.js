import React from "react";

function OneJobListing(){
    return (
        <div className="col s12 m12 l8">
            <div className="card oneJobListing">
                <div className="card-image">
                    <span className="card-title">Jobs List</span>
                    <span className="card-button">Add New Job</span>
                </div>
                <div className="container container-full ">
                    <div className="row">
                        <div className="col l12 card-filter">
                            Filter <i className="material-icons">keyboard_arrow_down</i>
                        </div>
                    </div>
                    <div className="row card-content">
                        <div className="card-inner">
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
                    <div className="row card-content">
                        <div className="card-inner">
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
                    <div className="row card-content">
                        <div className="card-inner">
                            <div className="col m2 l2 company-image">
                                <i className="company-img-src material-icons">add_a_photo</i>
                            </div>
                            <div className="co8 m8 l8 company-details">
                                <h3>COMPANY NAME</h3>
                                <p>JOB TITLE</p>
                                <p>LOCATION</p>
                            </div>
                            <div className="col m2 l2 btn-status">
                                <button className="btn-interview">Interview</button>
                            </div>
                        </div>
                    </div>
                    <div className="row card-content">
                        <div className="card-inner">
                            <div className="col m2 l2 company-image">
                                <i className="company-img-src material-icons">add_a_photo</i>
                            </div>
                            <div className="co8 m8 l8 company-details">
                                <h3>COMPANY NAME</h3>
                                <p>JOB TITLE</p>
                                <p>LOCATION</p>
                            </div>
                            <div className="col m2 l2 btn-status">
                                <button className="btn-offer">Offer</button>
                            </div>
                        </div>
                    </div>
                    <div className="row card-content">
                        <div className="card-inner">
                            <div className="col m2 l2 company-image">
                                <img className="company-img-src material-icons" src="https://image.flaticon.com/icons/svg/306/306424.svg"></img>
                            </div>
                            <div className="co8 m8 l8 company-details">
                                <h3>COMPANY NAME</h3>
                                <p>JOB TITLE</p>
                                <p>LOCATION</p>
                            </div>
                            <div className="col m2 l2 btn-status">
                                <button className="btn-ended">Ended</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneJobListing;
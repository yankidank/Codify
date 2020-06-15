import React from 'react';

function InterviewCard() {
  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s6 card-title">
          Interviews
        </div>
        <div className="col s6">
          <div className="card-button" id="new-interview-btn">
            Add Interview
          </div>
        </div>
      </div>
      <div className="card card-padded card-position">
        <div className="interviewInputs">
          <input className="col s6 m4 l4 datepicker" placeholder="01/01/2000"></input>
          <input className="col s6 m4 l4" placeholder="10:30 AM"></input>
          <select className="col s6 m4 l4" placeholder="Remote" id="remote">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <input className="col s6 m4 l4" placeholder="Street Address"></input>
          <input className="col s6 m4 l4" placeholder="City"></input>
          <input className="col s6 m4 l4" placeholder="State"></input>
          <textarea placeholder="Notes"></textarea>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;

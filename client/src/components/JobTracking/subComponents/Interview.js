import React from 'react';

function InterviewCard() {
  return (
    <div className="col s12 m12 l6">
      <div className="card interview">
        <div className="card-image">
          <span className="card-title">Interviews</span>
          <span className="card-button" id="new-interview-btn">
            New Interview
          </span>
        </div>
        <div className="interviewInputs">
          <input placeholder="Date"></input>
          <input placeholder="Time"></input>
          <input placeholder="Location"></input>
          <textarea placeholder="Notes"></textarea>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;

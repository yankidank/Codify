import React from 'react';
import NewInterviewBtn from './NewInterviewBtn';

function InterviewInputs() {
  return (
    <div className="col s12 m12 l6">
      <div className="card interview">
        <div className="interviewInputs">
          <input placeholder="Date"></input>
          <input placeholder="Time"></input>
          <input placeholder="Location"></input>
          <textarea placeholder="Notes"></textarea>
          <NewInterviewBtn />
        </div>
      </div>
    </div>
  );
}

export default InterviewInputs;

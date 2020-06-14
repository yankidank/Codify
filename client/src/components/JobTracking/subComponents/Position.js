import React from 'react';

function PositionCard() {
  return (
    <div className="col s12 m12 l6">
      <div className="card position">
        <div className="card-image">
          <span className="card-title">Position</span>
        </div>
        <div>
          <input className="col s6 m6 l6" placeholder="Job Title"></input>
          <input className="col s6 m6 l6" placeholder="City"></input>
          <input className="col s6 m6 l6" placeholder="Salary"></input>
          <input className="col s6 m6 l6" placeholder="State"></input>
          <textarea placeholder="Notes"></textarea>
          <button className="btn btn-card">View Job Post</button>
          <button className="btn btn-card btn-remove">Remove Job Post</button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;

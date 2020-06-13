import React from 'react';

function PositionCard() {
  return (
    <div className="col s12 m12 l6">
      <div className="card position">
        <div className="card-image">
          <span className="card-title">Position</span>
        </div>
        <div>
          <input placeholder="Title"></input>
          <input placeholder="Salary"></input>
          <input placeholder="Location"></input>
          <button className="btn btn-card">View Job Post</button>
          <button className="btn btn-card btn-remove">Remove Job Post</button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;

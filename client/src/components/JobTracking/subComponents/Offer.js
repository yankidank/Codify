import React from 'react';

function OfferCard() {
  return (
    <div className="col s12 m12 l6">
      <div className="card offer">
        <div className="card-image">
          <span className="card-title">Offers</span>
          <span className="card-button" id="new-offer-btn">
            New Offer
          </span>
        </div>
        <div className="offerInputs">
          <input placeholder="Offer Amount"></input>
          <input placeholder="Date"></input>
          <input placeholder="Bonus"></input>
          <button className="btn btn-card">Accept Offer</button>
        </div>
      </div>
    </div>
  );
}

export default OfferCard;

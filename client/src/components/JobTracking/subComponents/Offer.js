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
        <div className="row offerInputs">
          <input className="col s6 m6 l6" placeholder="$150,000 Salary"></input>
          <input className="col s6 m6 l6" placeholder="01/01/1970"></input>
          <input className="col s6 m6 l6" placeholder="Bonus"></input>
          <textarea placeholder="Notes"></textarea>
          <button className="btn btn-card">Accept Offer</button>
        </div>
      </div>
    </div>
  );
}

export default OfferCard;

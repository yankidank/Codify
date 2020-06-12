import React from 'react';
import NewOfferBtn from './NewOfferBtn';

function OfferInputs() {
  return (
    <div className="col s12 m12 l6">
      <div className="card offer">
        <div className="offerInputs">
          <input placeholder="Offer Amount"></input>
          <input placeholder="Date"></input>
          <input placeholder="Bonus"></input>
        </div>
        <NewOfferBtn />
      </div>
    </div>
  );
}

export default OfferInputs;

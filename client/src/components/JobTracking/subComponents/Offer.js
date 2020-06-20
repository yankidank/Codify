import React, { useState, useEffect } from 'react';
import {getOffers } from "../../../utils/API";
import { useParams } from 'react-router-dom';

function OfferCard() {
  const [offer, setOffers] = useState([]);

  const {id} = useParams();

  const onPostInput = async event => {
    event.preventDefault();
    const { target: { name, value }} = event;

    setOffers({ ...offer, [name]: value})
  }
  console.log(offer, onPostInput)
  useEffect(() => {
		(async () => {
			let retrievedOffers = await getOffers(id);
	
			if(retrievedOffers){
        setOffers(retrievedOffers);
			} else {
				console.log("Add empty offer")
			}
		})();
	}, []);

  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s6 card-title">
          Offers
        </div>
        <div className="col s6">
          <div className="card-button" id="new-contact-btn">
            Add Offer
          </div>
        </div>
      </div>
      <div className="card card-padded card-offer">
        <div className="offerInputs">
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

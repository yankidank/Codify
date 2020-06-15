import React from 'react';

function ContactCard() {
  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s6 card-title">
          Contacts
        </div>
        <div className="col s6">
          <div className="card-button" id="new-contact-btn">
            Add Contact
          </div>
        </div>
      </div>
      <div className="card card-padded card-contact">
        <div className="contactInputs">
          <input className="col s6 m6 l6" placeholder="Full Name"></input>
          <input className="col s6 m6 l6" placeholder="Position"></input>
          <input className="col s6 m6 l6" placeholder="Email@address.tld"></input>
          <input className="col s6 m6 l6" placeholder="(800) 555-1234"></input>
          <input className="col s6 m6 l6" placeholder="Position"></input>
          <textarea placeholder="Notes"></textarea>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;

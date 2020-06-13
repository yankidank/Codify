import React from 'react';

function ContactCard() {
  return (
    <div className="col s12 m12 l6">
      <div className="card contact">
        <div className="card-image">
          <span className="card-title">Contacts</span>
          <span className="card-button" id="new-contact-btn">
            Add Contact
          </span>
        </div>
        <div className="contactInputs">
          <input placeholder="Name"></input>
          <input placeholder="Email"></input>
          <input placeholder="Phone"></input>
          <input placeholder="Position"></input>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;

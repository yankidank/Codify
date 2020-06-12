import React from 'react';
import NewContactBtn from './NewContactBtn';

function Contact() {
  return (
    <div className="col s12 m12 l6">
      <div className="card contact">
        <div className="contactInputs">
          <input placeholder="Name"></input>
          <input placeholder="Email"></input>
          <input placeholder="Phone"></input>
          <input placeholder="Position"></input>
        </div>
        <NewContactBtn />
      </div>
    </div>
  );
}

export default Contact;

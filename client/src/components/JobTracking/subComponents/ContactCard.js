import React from 'react';
import PropTypes from 'prop-types';

function ContactCard(props){
    const {index, handleInputChange, addNewContact, displayName, position, email, phone, notes, id} = props;

    return (
        <div className="card card-padded card-contact" id="contact-wrap">
            <div className="contactInputs">
                <input className="col s6 m6 l6" onChange={(event) => handleInputChange(event, index, id)} placeholder="Full Name" name="displayName" value={displayName || ''}></input>
                <input className="col s6 m6 l6" onChange={(event) => handleInputChange(event, index, id)} placeholder="Position" name="position" value={position || ''}
                ></input>
                <input className="col s6 m6 l6" onChange={(event) => handleInputChange(event, index, id)} placeholder="Email@address.tld" name="email" value={email || ''}
                ></input>
                <input className="col s6 m6 l6" onChange={(event) => handleInputChange(event, index, id)} placeholder="(800) 555-1234" name="phone" value={phone || ''}
                ></input>
                <textarea placeholder="Notes" onChange={(event) => handleInputChange(event, index, id)} name="notes" value={notes || ''}
                ></textarea>
            </div>
            {(id) ? '' : <button onClick={() => addNewContact(index)}>Save New Contact</button>}
        </div>

    )
}

ContactCard.propTypes = {
  jobId: PropTypes.string,
  index: PropTypes.number,
  handleInputChange: PropTypes.func,
  addNewContact: PropTypes.func,
  displayName: PropTypes.string,
  position: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  notes: PropTypes.string,
  id: PropTypes.string
};

export default ContactCard;


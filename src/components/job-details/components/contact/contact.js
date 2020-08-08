import React from 'react';
import PropTypes from 'prop-types';
import { deleteContact } from '../../../../utils/API';
import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';

function ContactCard(props) {
  const {
    index, handleInputChange, /* addNewContact, */ removeContactField, displayName, position, email, phone, notes, id
  } = props;

  const handleClick = () => {
    removeContactField(id);
    deleteContact(id);
  };

  return (
    <div className="card card-padded card-contact" id="contact-wrap">
      <div className="contactInputs">
        <div className="input-field col s6">
          <input name="displayName" value={displayName || ''} id={`contact-name-${id}`} className="validate" type="text" onChange={(event) => handleInputChange(event, index, id)} />
          <label htmlFor={`contact-name-${id}`} className={displayName ? 'active' : ''}>Full Name</label>
        </div>
        <div className="input-field col s6">
          <input name="position" value={position || ''} id={`contact-position-${id}`} className="validate" type="text" onChange={(event) => handleInputChange(event, index, id)} />
          <label htmlFor={`contact-position-${id}`} className={position ? 'active' : ''}>Position</label>
        </div>
        <div className="input-field col s6">
          <input name="email" value={email || ''} id={`contact-email-${id}`} className="validate" type="text" onChange={(event) => handleInputChange(event, index, id)} />
          <label htmlFor={`contact-email-${id}`} className={email ? 'active' : ''}>Email</label>
        </div>
        <div className="input-field col s6">
          <Cleave
            options={{ phone: true, phoneRegionCode: 'US' }}
            name="phone"
            value={phone}
            id={`contact-phone-${id}`}
            className="validate"
            type="text"
            onChange={(event) => handleInputChange(event, index, id)}
          />
          <label htmlFor={`contact-phone-${id}`} className={phone ? 'active' : ''}>Phone</label>
        </div>
        <div className="input-field col s12">
          <textarea name="notes" value={notes || ''} id={`contact-notes-${id}`} className="validate materialize-textarea" type="text" onChange={(event) => handleInputChange(event, index, id)} />
          <label htmlFor={`contact-notes-${id}`} className={notes ? 'active' : ''}>Notes</label>
        </div>
      </div>
      {(!id) ? '' : <button className="btn btn-card btn-remove" onClick={handleClick}>Remove Contact</button>}
    </div>

  );
}

ContactCard.propTypes = {
  jobId: PropTypes.string,
  index: PropTypes.number,
  handleInputChange: PropTypes.func,
  addNewContact: PropTypes.func,
  removeContactField: PropTypes.func,
  displayName: PropTypes.string,
  position: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  notes: PropTypes.string,
  id: PropTypes.string
};

export default ContactCard;

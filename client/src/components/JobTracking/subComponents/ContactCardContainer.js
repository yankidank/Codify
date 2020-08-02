import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
import _ from 'lodash';
import { getContacts, updateContact, addContact } from '../../../utils/API';
import ContactCard from './ContactCard';

function ContactCardContainer() {
  const [contacts, setContacts] = useState([
    {
      _id: '', displayName: '', email: '', phone: '', position: '', notes: ''
    },
  ]);
  const [postOut, setPostOut] = useState(false);

  const { id: jobId } = useParams();

  const debouncedUpdateContact = useCallback(
    _.debounce(updateContact, 500),
    []
  );

  const debouncedAddContact = useCallback(
    _.debounce(async (index, contact, jobId) => {
      const newContacts = contacts.concat();
      const response = await addContact(contact, jobId);
      const { data: newContact } = response;
      if (newContacts[index]) {
        newContacts[index]._id = newContact._id;
      }

      setContacts(newContacts);
      setPostOut(false);
    }, 500),
    [contacts]
  );

  const handleInputChange = async (event, index, contactId) => {
    const newContacts = contacts.concat();

    const shortName = event.target.name;
    newContacts[index][shortName] = event.target.value;

    if (newContacts[index].displayName) {
      if (contactId) {
        debouncedUpdateContact(newContacts[index], contactId);
        /* M.toast({ html: 'Saved Contact' }); */
      } else if (!postOut) {
        setPostOut(true);
        debouncedAddContact(index, newContacts[index], jobId);
        /* M.toast({ html: 'Created New Contact' }); */
      }
    }

    setContacts(newContacts);
  };

  const removeContactField = (id) => {
    const filteredContacts = contacts.filter((contact) => contact._id !== id);
    const emptyContact = {
      _id: '',
      displayName: '',
      email: '',
      phone: '',
      position: '',
      notes: '',
    };
    const newContactArr = [emptyContact, ...filteredContacts];
    setContacts(newContactArr);
    M.toast({ html: 'Removed Contact' });
  };

  const addContactField = () => {
    const newContact = {
      _id: '',
      displayName: '',
      email: '',
      phone: '',
      position: '',
      notes: '',
    };
    const newContactArr = [newContact, ...contacts];
    setContacts(newContactArr);
    M.toast({ html: 'Contact Card Added' });
  };

  const addNewContact = async (index) => {
    await addContact(contacts[index], jobId);
    const newContacts = await getContacts(jobId);
    setContacts(newContacts);
  };

  useEffect(() => {
    (async () => {
      const retrievedContacts = await getContacts(jobId);
      retrievedContacts.reverse();
      if (retrievedContacts.length > 0) {
        setContacts(retrievedContacts);
      }
    })();
  }, []);

  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s6 card-title">Contacts</div>
        <div className="col s6">
          <div
            className="card-button"
            onClick={addContactField}
            id="new-contact-btn"
          >
            Add Contact
          </div>
        </div>
      </div>
      {contacts.map((contact, index) => {
        const {
          displayName, position, email, phone, notes
        } = contact;
        return (
          <ContactCard
            key={contact._id || index}
            id={contact._id}
            displayName={displayName}
            email={email}
            phone={phone}
            notes={notes}
            position={position}
            handleInputChange={handleInputChange}
            removeContactField={removeContactField}
            addNewContact={addNewContact}
            addContactField={addContactField}
            index={index}
          />
        );
      })}
    </div>
  );
}

ContactCardContainer.propTypes = {
  jobId: PropTypes.string,
};

export default ContactCardContainer;

import React, { useState, useEffect, useCallback } from 'react';
import { getContacts, updateContact, addContact } from '../../../utils/API';
import { useParams } from 'react-router-dom';
import ContactCard from './ContactCard';
import _ from 'lodash';

function ContactCardContainer() {
  const [contacts, setContacts] = useState([
    { _id: '', displayName: '', email: '', phone: '', position: '', notes: '' },
  ]);
  const [postOut, setPostOut] = useState(false);

  const { id } = useParams();

  const debouncedUpdateContact = useCallback(
    _.debounce(updateContact, 500),
    []
  );

  const debouncedAddContact = useCallback(
    _.debounce(async (index, contact, jobId) => {
      console.log({ contacts });
      let newContacts = contacts.concat();
      const response = await addContact(contact, jobId);
      console.log(response);
      const { data: newContact } = response;
      if (newContacts[index]) {
        newContacts[index]._id = newContact._id;
      }

      setContacts(newContacts);
      setPostOut(false);
    }, 500),
    []
  );

  const handleInputChange = async (event, index, contactId) => {
    console.log({contactId});
    let newContacts = contacts.concat();

    let shortName = event.target.name;
    newContacts[index][shortName] = event.target.value;

    if (newContacts[index].displayName) {
      if (contactId) {
        debouncedUpdateContact(newContacts[index], contactId);
      } else if (!postOut) {
        setPostOut(true);
        debouncedAddContact(index, newContacts[index], id);
      }
    }

    console.log({ newContacts });
    setContacts(newContacts);
  };

  const addContactField = () => {
    let newContact = {
      _id: '',
      displayName: '',
      email: '',
      phone: '',
      position: '',
      notes: '',
    };
    let newContactArr = [newContact, ...contacts];
    setContacts(newContactArr);
  };

  const addNewContact = async index => {
    await addContact(contacts[index], id);
    let newContacts = await getContacts(id);
    setContacts(newContacts);
  };

  useEffect(() => {
    (async () => {
      let retrievedContacts = await getContacts(id);
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
        const { displayName, position, email, phone, notes } = contact;
        return (
          <ContactCard
            key={contact._id || index}
            id={contact._id}
            displayName={displayName}
            email={email}
            phone={phone}
            notes={notes}
            position={position}
            addNewContact={addNewContact}
            handleInputChange={handleInputChange}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default ContactCardContainer;

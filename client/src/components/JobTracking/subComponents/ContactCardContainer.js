import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../../../utils/API';
import { useParams } from 'react-router-dom';
import ContactCard from './ContactCard';
import _ from 'lodash';

const debouncedUpdateContact = _.debounce(updateContact, 500);
const debouncedAddContact = _.debounce(addContact, 500);

function ContactCardContainer() {
	const [contacts, setContacts] = useState([{ displayName: '', email: '', phone: '', position: '', notes: '' }]);

	const { id } = useParams();

	const handleInputChange = async (event, index, contactId) => {
		let newContacts = [...contacts];
		let shortName = event.target.name;
		newContacts[index][shortName] = event.target.value;
		
		if (contactId && newContacts[index].displayName) {
			debouncedUpdateContact(newContacts[index], contactId); 
		} else if (newContacts[index].displayName) {
			debouncedAddContact(newContacts[index], id)
		}
	
		setContacts(newContacts);
	};

	const addContact = () => {
		let newContact = { displayName: '', email: '', phone: '', position: '', notes: '' };
		let newContactArr = [...contacts, newContact];
		setContacts(newContactArr);
	};

	useEffect(() => {
		(async () => {
			let retrievedContacts = await getContacts(id);
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
					<div className="card-button" onClick={addContact} id="new-contact-btn">
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
						handleInputChange={handleInputChange}
						index={index}
					/>
				);
			})}
		</div>
	);
}

export default ContactCardContainer;

import React, { useState, useEffect } from 'react';
import {axiosInstance} from '../../../utils/API';

function ContactCard() {
	const [contacts, setContacts] = useState([]);

	const handleChange = (event) => {
		let indexToChange = event.target.getAttribute("dataindex");
		let newContacts = [...contacts];
		let shortName = event.target.name
		newContacts[indexToChange][shortName] = event.target.value;
		setContacts(newContacts);
	}
  
	useEffect(() => {
		axiosInstance.get('/api/contacts').then(({ data: apiContacts }) => {
			setContacts(apiContacts);
		});
  }, []);
  
	return (
		<div className="col s12 m12 l6">
			<div className="row card-image">
				<div className="col s6 card-title">Contacts</div>
				<div className="col s6">
					<div className="card-button" id="new-contact-btn">
						Add Contact
					</div>
				</div>
			</div>
			{contacts.length === 0 &&
				<div className="card card-padded card-contact">
					<div className="contactInputs">
					<input className="col s6 m6 l6" onChange={handleChange} placeholder="Full Name" dataindex="0" name="displayName"></input>
						<input className="col s6 m6 l6" onChange={handleChange} placeholder="Position" name="position" dataindex="0"></input>
						<input className="col s6 m6 l6" onChange={handleChange} placeholder="Email@address.tld" name="email" dataindex="0"></input>
						<input className="col s6 m6 l6" onChange={handleChange} placeholder="(800) 555-1234" name="phone" dataindex="0"></input>
						<textarea placeholder="Notes" onChange={handleChange} name="notes" dataindex="0"></textarea>
					</div>
				</div>
			}
			{contacts.map((contact, index) => {
				const { displayName, email, phone, position, notes } = contact;
				return (
					<div className="card card-padded card-contact" key={index}>
						<div className="contactInputs">
							<input className="col s6 m6 l6" onChange={handleChange} placeholder="Full Name" dataindex={index} name="displayName" value={displayName}></input>
							<input className="col s6 m6 l6" onChange={handleChange} placeholder="Position" name="position" dataindex={index} value={position ? position : ''}></input>
							<input className="col s6 m6 l6" onChange={handleChange} placeholder="Email@address.tld" name="email" dataindex={index} value={email ? email : ''}></input>
							<input className="col s6 m6 l6" onChange={handleChange} placeholder="(800) 555-1234" name="phone" dataindex={index} value={phone ? phone : ''}></input>
							<textarea placeholder="Notes" onChange={handleChange} name="notes" dataindex={index} value={notes ? notes : ''}></textarea>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ContactCard;

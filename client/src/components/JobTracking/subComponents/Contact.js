import React, { useState, useEffect } from 'react';
import {axiosInstance} from '../../../utils/API';

function ContactCard() {
  const [contacts, setContacts] = useState([]);
  
	useEffect(() => {
		axiosInstance.get('/api/contacts').then(({ data: newContacts }) => {
			//console.log(newContacts);
			setContacts(newContacts);
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
						<input className="col s6 m6 l6" placeholder="Full Name"></input>
						<input className="col s6 m6 l6" placeholder="Position"></input>
						<input className="col s6 m6 l6" placeholder="Email@address.tld"></input>
						<input className="col s6 m6 l6" placeholder="(800) 555-1234"></input>
						<textarea placeholder="Notes"></textarea>
					</div>
				</div>
			}
			{contacts.map((contact, index) => {
				const { displayName, email, phone, position, notes } = contact;
				return (
					<div className="card card-padded card-contact" key={index}>
						<div className="contactInputs">
							<input className="col s6 m6 l6" placeholder="Full Name" value={displayName}></input>
							<input className="col s6 m6 l6" placeholder="Position" value={position ? position : ''}
							></input>
							<input className="col s6 m6 l6" placeholder="Email@address.tld" value={email ? email : ''}
							></input>
							<input className="col s6 m6 l6" placeholder="(800) 555-1234" value={phone ? phone : ''}
							></input>
							<textarea placeholder="Notes" value={notes ? notes : ''}></textarea>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ContactCard;

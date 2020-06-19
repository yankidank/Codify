import React from 'react';

function ContactCard(props){
    const {index, handleChange ,contact} = props;

    return (
        <div className="card card-padded card-contact" id="contact-wrap">
            <div className="contactInputs">
                <input
                    className="col s6 m6 l6"
                    onChange={handleChange}
                    placeholder="Full Name"
                    dataindex={index}
                    name="displayName"
                    value={contact && contact.displayName}
                ></input>
                <input
                    className="col s6 m6 l6"
                    onChange={handleChange}
                    placeholder="Position"
                    name="position"
                    dataindex={index}
                    value={contact && contact.position}
                ></input>
                <input
                    className="col s6 m6 l6"
                    onChange={handleChange}
                    placeholder="Email@address.tld"
                    name="email"
                    dataindex={index}
                    value={contact && contact.email}
                ></input>
                <input
                    className="col s6 m6 l6"
                    onChange={handleChange}
                    placeholder="(800) 555-1234"
                    name="phone"
                    dataindex={index}
                    value={contact && contact.phone}
                ></input>
                <textarea
                    placeholder="Notes"
                    onChange={handleChange}
                    name="notes"
                    dataindex={index}
                    value={contact && contact.notes}
                ></textarea>
                    </div>
            </div>
    )
}

export default ContactCard;


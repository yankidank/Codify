import axios from 'axios';
// set up axios to send cookies with request
const axiosInstance = axios.create({
	withCredentials: true
});

////////////////////////////////////
// post endpoints //////////////////
////////////////////////////////////

const postContact = async (contactProperties) => {
	// contactProperties := { displayName(required), company, email, phone, position, notes }
	try {
		let newContact = await axiosInstance.post('/api/contacts', contactProperties);
		return newContact;
	} catch (err) {
		console.log(err);
	}
};
const postJob = async (jobProperties) => {
// jobProperties := {companyName(required), url, position(required), city(required), state(required)}
	try {
		const {companyName: displayName, position, state, city, url} = jobProperties;

		let newCompany = await axiosInstance.post('/api/companies', {displayName});
		let newJob = await axiosInstance.post('/api/jobs', {company: newCompany.data._id, post : {url, position, city, state}});
		return newJob;
	} catch (err) {
		console.log(err);
	}
};

////////////////////////////////////
// put endpoints ///////////////////
////////////////////////////////////

const updateContact = async (newContact, contactID) => {
// newContact := { displayName(required), company, email, phone, position, notes }
console.log(newContact);
	try {
		const updatedContact = await axiosInstance.put(`/api/contacts/${contactID}`, newContact);
		return updatedContact;
	} catch (err) {
		console.log(err)
	}
}

export { axiosInstance, postJob, postContact, updateContact};

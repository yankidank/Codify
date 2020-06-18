import axios from 'axios';
// set up axios to send cookies with request
export const axiosInstance = axios.create({
	withCredentials: true
});

////////////////////////////////////
// add endpoints ///////////////////
////////////////////////////////////

export const addContact = async (contactProperties) => {
	// contactProperties := { displayName(required), company, email, phone, position, notes }
	try {
		let newContact = await axiosInstance.post('/api/contacts', contactProperties);
		return newContact;
	} catch (err) {
		console.log(err);
	}
};

export const addJob = async (jobProperties) => {
	// jobProperties := {companyName(required), url, position(required), city(required), state(required)}
	try {
		const { companyName: displayName, position, state, city, url } = jobProperties;

		let newCompany = await axiosInstance.post('/api/companies', {displayName});
		let newJob = await axiosInstance.post('/api/jobs', {company: newCompany.data._id, post : {url, position, city, state}});
		
		return newJob;
	} catch (err) {
		console.log(err);
	}
};

export const addInterview = async (newInterview, jobId) => {
	// newInterview := { date, location: {remote, street, city, state, zip}, notes }
	try {
		let updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, { push: { interviews: newInterview } });
		console.log(updatedJob);
		const {
			data: { interviews }
		} = updatedJob;
		return interviews[interviews.length - 1];
	} catch (err) {
		console.log(err);
	}
};

export const addOffer = async (newOffer, jobId) => {
	// newOffer := {date, startDate, salary, bonus, benefits}
	try {
		let updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, { push: { offers: newOffer } });
		const {
			data: { offers }
		} = updatedJob;
		return offers[offers.length - 1];
	} catch (err) {
		console.log(err);
	}
};

////////////////////////////////////
// update endpoints ////////////////
////////////////////////////////////

export const updatePosition = async (newPosition, jobId) => {
	// newPosition := {position(required), city(required), state(required), salary}
	try {
		let updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, { set: { post: newPosition } });
		return updatedJob.data.post;
	} catch (err) {
		console.log(err);
	}
};

export const updateContact = async (newContact, contactId) => {
	// newContact := { displayName(required), company, email, phone, position, notes }
	try {
		const updatedContact = await axiosInstance.put(`/api/contacts/${contactId}`, newContact);
		return updatedContact;
	} catch (err) {
		console.log(err);
	}
};

export const updateInterview = async (newInterview, jobId, interviewId) => {
	// newInterview := { date, location: {remote, street, city, state, zip}, notes }
	try {
		const updatedInterview = await axiosInstance.put(`/api/jobs/${jobId}`, {
			extraQuery: { interviewId },
			set: { 'interviews.$': newInterview }
		});
		const {
			data: { interviews }
		} = updatedInterview;
		return interviews[interviews.length - 1];
	} catch (err) {
		console.log(err);
	}
};

export const updateOffer = async (newOffer, jobId, offerId) => {
	// newOffer := {date, startDate, salary, bonus, benefits}
	try {
		const updatedOffer = await axiosInstance.put(`/api/jobs/${jobId}`, {
			extraQuery: { offerId },
			set: { 'offers.$': newOffer }
		});
		const {
			data: { offers }
		} = updatedOffer;
		return offers[offers.length - 1];
	} catch (err) {
		console.log(err);
	}
};

////////////////////////////////////
// get endpoints ///////////////////
////////////////////////////////////

export const getAllJobs = async () => {
	try {
		let { data: jobs } = await axiosInstance.get('/api/jobs');
		return jobs;
	} catch (err) {
		console.log(err);
	}
};

export const getAllContacts = async () => {
	try {
		let { data: contacts } = await axiosInstance.get('/api/contacts');
		return contacts;
	} catch (err) {
		console.log(err);
	}
};

export const getJob = async (jobId) => {
	try {
		let job = await axiosInstance.get(`/api/jobs/${jobId}`);
		return job;
	} catch (err) {
		console.log(err);
	}
}

export const getPosition = async (jobId) => {
	let {data: {post}} = await getJob(jobId);
	return post;
}

export const getInterviews = async (jobId) => {
	let {data: {interviews}} = await getJob(jobId);
	return interviews;
}

export const getOffers = async (jobId) => {
	let {data: {offers}} = await getJob(jobId);
	return offers;
}

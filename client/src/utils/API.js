import axios from 'axios';
// set up axios to send cookies with request
export const axiosInstance = axios.create({
	withCredentials: true
});

////////////////////////////////////
// add endpoints ///////////////////
////////////////////////////////////

export const addContact = async (contactProperties, jobId) => {
  // contactProperties := { displayName(required), company, email, phone, position, notes }
	try {
		let newContact;
		if (jobId) {
			newContact = await axiosInstance.post('/api/contacts', contactProperties);
			await axiosInstance.put(`/api/jobs/${jobId}`, { push: { contacts: newContact.data._id } });
		} else {
			newContact = await axiosInstance.post('/api/contacts', contactProperties);
		}
		return newContact;
	} catch (err) {
		console.log(err);
	}
};

export const addJob = async (jobProperties) => {
	// jobProperties := {companyName(required), url, position(required), city, state}
	try {
		const { companyName: displayName, position, state, city, url, status } = jobProperties;
		let newCompany = await axiosInstance.post('/api/companies', {displayName});
		let newJob = await axiosInstance.post('/api/jobs', {company: newCompany.data._id, post : {url, position, city, state}, status});
		
		return newJob;
	} catch (err) {
		console.log(err);
	}
};

export const addInterview = async (newInterview, jobId) => {
	// newInterview := { date, location: {remote, street, city, state, zip}, notes }
	try {
		let updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, { push: { interviews: newInterview } });
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

export const updateStatus = async (newStatus, jobId) => {
	let newStatusHistory = {status: newStatus, date: Date.now()}
	try {
		let updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, {set: {status: newStatus}, push: {statusHistory: newStatusHistory}});
		return updatedJob.data.status;
	} catch (err) {
		console.log(err);
	}
}

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

export const updateInterview = async (newInterview, jobId, index) => {
	// newInterview := { date, location: {remote, street, city, state, zip}, notes }
	try {
		let interviewQuery = `interviews.${index}`;
		const updatedInterview = await axiosInstance.put(`/api/jobs/${jobId}`, {
			set: { [interviewQuery]: newInterview }
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

export const getStatusReport = async () => {
  try {
    let { data } = await axiosInstance.get('/api/reports/status');
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getCommunicationReport = async () => {
  try {
    let { data } = await axiosInstance.get('/api/reports/communication');
    return data
  } catch (err) {
    console.log(err)
  }
}

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

export const getContacts = async (jobId) => {
	let {data: {contacts}} = await getJob(jobId);
	return contacts;
}

export const getOffers = async (jobId) => {
	let {data: {offers}} = await getJob(jobId);
	return offers;
}

////////////////////////////////////
// delete endpoints ////////////////
////////////////////////////////////

export const deleteJob = async (jobId) => {
	try {
		let job = await axiosInstance.delete(`/api/jobs/${jobId}`);
		return job;
	} catch (err) {
		console.log(err);
	}
}
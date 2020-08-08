import axios from 'axios';
// set up axios to send cookies with request
export const axiosInstance = axios.create({
  withCredentials: true
});

// Add Endpoints

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
    const {
      companyName: displayName, position, state, city, remote, salary, url, notes, status
    } = jobProperties;
    const newCompany = await axiosInstance.post('/api/companies', { displayName });
    const newJob = await axiosInstance.post('/api/jobs', {
      company: newCompany.data._id,
      post: {
        url, position, city, state, remote, salary, notes
      },
      status
    });

    return newJob;
  } catch (err) {
    console.log(err);
  }
};

export const addInterview = async (newInterview, jobId) => {
  // newInterview := { date, location: {remote, street, city, state, zip}, notes }
  try {
    const updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, { push: { interviews: newInterview } });
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
    const updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, { push: { offers: newOffer } });
    const {
      data: { offers }
    } = updatedJob;
    return offers[offers.length - 1];
  } catch (err) {
    console.log(err);
  }
};

/// /////////////////////////////////
// update endpoints ////////////////
/// /////////////////////////////////

export const updateStatus = async (newStatus, jobId) => {
  const newStatusHistory = { status: newStatus, date: Date.now() };
  try {
    const updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, { set: { status: newStatus }, push: { statusHistory: newStatusHistory } });
    return updatedJob.data.status;
  } catch (err) {
    console.log(err);
  }
};

export const updatePosition = async (newPosition, jobId) => {
  // newPosition := {position(required), city(required), state(required), salary}
  try {
    const updatedJob = await axiosInstance.put(`/api/jobs/${jobId}`, { set: { post: newPosition } });
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
    const interviewQuery = `interviews.${index}`;
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

export const updateOffer = async (newOffer, jobId, index) => {
  // newOffer := {date, startDate, salary, bonus, benefits}
  try {
    const offerQuery = `offers.${index}`;
    const updatedOffer = await axiosInstance.put(`/api/jobs/${jobId}`, {
      set: { [offerQuery]: newOffer }
    });
    const {
      data: { offers }
    } = updatedOffer;
    return offers[offers.length - 1];
  } catch (err) {
    console.log(err);
  }
};

// Get Endpoints 

export const getStatusReport = async () => {
  try {
    const { data } = await axiosInstance.get('/api/reports/status');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getCommunicationReport = async () => {
  try {
    const { data } = await axiosInstance.get('/api/reports/communication');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllJobs = async () => {
  try {
    const { data: jobs } = await axiosInstance.get('/api/jobs');
    return jobs;
  } catch (err) {
    console.log(err);
  }
};

export const getAllContacts = async () => {
  try {
    const { data: contacts } = await axiosInstance.get('/api/contacts');
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

export const getJob = async (jobId) => {
  try {
    const job = await axiosInstance.get(`/api/jobs/${jobId}`);
    return job;
  } catch (err) {
    console.log(err);
  }
};

export const getPosition = async (jobId) => {
  const { data: { post } } = await getJob(jobId);
  return post;
};

export const getInterviews = async (jobId) => {
  const { data: { interviews } } = await getJob(jobId);
  return interviews;
};

export const getContacts = async (jobId) => {
  const { data: { contacts } } = await getJob(jobId);
  return contacts;
};

export const getOffers = async (jobId) => {
  const { data: { offers } } = await getJob(jobId);
  return offers;
};

// Delete Endpoints

export const deleteJob = async (jobId) => {
  try {
    const job = await axiosInstance.delete(`/api/jobs/${jobId}`);
    return job;
  } catch (err) {
    console.log(err);
  }
};

export const deleteContact = async (contactId) => {
  try {
    const contact = await axiosInstance.delete(`/api/contacts/${contactId}`);
    return contact;
  } catch (err) {
    console.log(err);
  }
};

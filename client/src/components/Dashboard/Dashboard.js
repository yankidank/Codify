import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoughtnutChart from './Doughnut';
import List from '../JobList/List';
import NavBar from '../NavBar';
import { getAllJobs, getStatusReport } from '../../utils/API';
import { Helmet } from "react-helmet";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [statusReport, setStatusReport] = useState([]);
  // const [communicationReport, setcommunicationReport] = useState([]);

  useEffect(() => {
    (async () => {

      const jobs = await getAllJobs();
      setJobs(jobs);

      const statusReport = await getStatusReport();
      setStatusReport(statusReport);

      // const communicationReport = await getCommunicationReport();
      // setcommunicationReport(communicationReport);

      setLoading(false);

    })();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Job Dashboard</title>
      </Helmet>
      <NavBar />
      <div className="container pushtop dashboard">
        <div className="row">
          <DoughtnutChart statusReport={statusReport} loading={loading} />
          <List cols="col s12 m12 l8" jobs={jobs} />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
	jobs: PropTypes.object,
};

export default Dashboard;

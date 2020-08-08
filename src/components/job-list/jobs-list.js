import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getAllJobs } from '../../utils/API';
import NavBar from '../layout/components/navbar';
import List from './components/list';

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const jobArr = await getAllJobs();
      setJobs(jobArr);
    })();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Jobs Tracked</title>
      </Helmet>
      <NavBar />
      <div className="container pushtop jobsList">
        <div className="row">
          <List cols="col s12 m12 l12" jobs={jobs} />
        </div>
      </div>
    </div>
  );
}

export default JobsList;

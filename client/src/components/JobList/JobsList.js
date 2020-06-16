import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import List from './List';

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios('/api/jobs/', { withCredentials: true }).then(({ data: jobs }) => {
      setJobs(jobs);
    });
  }, []);
  console.log(jobs);

  return (
    <div>
      <NavBar />
      <div className="container pushtop jobsList">
        <div className="row">
          <List cols="col s12 m12 l12" />
        </div>
      </div>
    </div>
  );
}

export default JobsList;

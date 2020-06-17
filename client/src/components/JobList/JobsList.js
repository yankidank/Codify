import React, { useEffect, useState } from 'react';
import {axiosInstance} from '../../utils/API';
import NavBar from '../NavBar';
import List from './List';

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobArrList = await axiosInstance.get('/api/jobs');

        console.log(jobArrList)
				setJobs(jobArrList);
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container pushtop jobsList">
        <div className="row">
          <List cols="col s12 m12 l12" jobs={jobs}/>
        </div>
      </div>
    </div>
  );
}

export default JobsList;

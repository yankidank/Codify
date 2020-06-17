import React, { useEffect, useState } from 'react';
import DoughtnutChart from './Doughnut';
import List from '../JobList/List';
import NavBar from '../NavBar';
import { axiosInstance } from '../../utils/API';

function Dashboard() {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const jobArr = await axiosInstance.get('/api/jobs');
				setJobs(jobArr);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [companies, jobs]);
	return (
		<div>
			{// these are the jobs for the chart
			console.log(jobs) } 
			<NavBar />
			<div className="container pushtop dashboard">
				<div className="row">
					<DoughtnutChart />
					<List cols="col s12 m12 l8" />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import DoughtnutChart from './Doughnut';
import List from '../JobList/List';
import NavBar from '../NavBar';
import { axiosInstance, postJob } from '../../utils/API';

function Dashboard() {
	const [companies, setCompanies] = useState([]);
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const companyArr = await axiosInstance.get('/api/companies');
				const jobArr = await axiosInstance.get('/api/jobs');

				const newJob = await postJob({companyName: "tindr", position: 'engineer', state: 'CA', city: 'Los Angeles'});

				console.log(newJob);
				setCompanies(companyArr);
				setJobs(jobArr);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);
	return (
		<div>
			{console.log(companies, jobs)}
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

import React, { useState, useEffect } from 'react';
import DoughtnutChart from './Doughnut';
import List from '../JobList/List';
import NavBar from '../NavBar';
import { getAllJobs } from '../../utils/API';

function Dashboard() {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		(async () => {
			const jobArr = await getAllJobs();
			setJobs(jobArr);
		})();
	}, []);
	return (
		<div>
			<NavBar />
			<div className="container pushtop dashboard">
				<div className="row">
					<DoughtnutChart />
					<List cols="col s12 m12 l8" jobs={jobs}/>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

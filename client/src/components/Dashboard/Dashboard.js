import React, { useEffect, useState } from 'react';
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
			{
				// these are the jobs for the chart
				console.log(jobs)
			}
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

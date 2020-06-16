import React, { useEffect, useState } from 'react';
import DoughtnutChart from './Doughnut';
import List from '../JobList/List';
import NavBar from '../NavBar';
import axiosInstance from '../../utils/API';

function Dashboard() {
	const [companies, setCompanies] = useState([]);
	const [chat, setChart] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
        const companyArr = await axiosInstance.get('/api/companies');
        const jobArr = await axiosInstance.get('api/jobs');

        console.log(jobArr);
				console.log(companies);
			} catch (error) {}
		};

		fetchData();
	});
	return (
		<div>
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

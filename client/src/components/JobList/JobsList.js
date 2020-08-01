import React, { useEffect, useState } from 'react';
import { getAllJobs} from '../../utils/API';
import NavBar from '../NavBar';
import List from './List';
import { Helmet } from "react-helmet";

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
        <title>Cōdify / Jobs Tracked</title>
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

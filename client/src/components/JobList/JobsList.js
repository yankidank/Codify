import React, { useEffect, useState } from 'react';
import { getAllJobs, getJob , updateStatus} from '../../utils/API';
import NavBar from '../NavBar';
import List from './List';

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

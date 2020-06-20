import React, { useState, useEffect } from 'react';
import { getInterviews, addInterview, updateInterview } from '../../../utils/API';
import { useParams } from 'react-router-dom';
import InterviewCard from './InterviewCard';
import _ from 'lodash';

const debouncedUpdateInterview = _.debounce(updateInterview, 500);

function InterviewCardContainer(props) {
	const [interviews, setInterviews] = useState([
		{ date: '', remote: false, street: '', city: '', state: '', zip: '', notes: '', _id: '' }
	]);

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			let retrievedInterviews = await getInterviews(id);

			if (retrievedInterviews.length > 0) {
				let formattedInterviews = retrievedInterviews.map((interview) => {
					const {
						date,
						location: { remote, street, city, state, zip },
						notes,
						_id
					} = interview;
					return { date, remote, street, city, state, zip, notes, _id };
				});
				setInterviews(formattedInterviews);
			}
		})();
	}, []);

	const handleInputChange = async (event, index, interviewId) => {
		let newInterviews = [...interviews];
		let shortName = event.target.name;
		console.log(newInterviews);
		newInterviews[index][shortName] = event.target.value;

		if (interviewId) {
			const { date, remote, street, city, state, zip, notes } = newInterviews[index];
			const formattedInterview = { date, location: { remote, street, city, state, zip }, notes };
			debouncedUpdateInterview(formattedInterview, interviewId);
		}

		setInterviews(newInterviews);
	};

	const addInterviewField = () => {
		const newInterview = { date: '', remote: false, street: '', city: '', state: '', zip: '', notes: '', _id: '' };
		const newInterviewArr = [...interviews, newInterview];
		setInterviews(newInterviewArr);
	};

	const addNewInterview = async (index) => {
    const { date, remote, street, city, state, zip, notes } = interviews[index];
    if (date || remote || street || city || state || zip || notes ) {
      const formattedInterview = { date, location: { remote, street, city, state, zip }, notes };
      await addInterview(formattedInterview, id);
      let newInterviews = await getInterviews(id);
      setInterviews(newInterviews);
    }
	};

	return (
		<div className="col s12 m12 l6">
			<div className="row card-image">
				<div className="col s6 card-title">Interviews</div>
				<div className="col s6">
					<div onClick={addInterviewField} className="card-button" id="new-interview-btn">
						Add Interview
					</div>
				</div>
			</div>
			{interviews.map((interview, index) => {
				const { date, remote, street, city, state, zip, notes } = interview;
				return (
					<InterviewCard
						key={interview._id || index}
						_id={interview._id}
						date={date}
						remote={remote}
						street={street}
						city={city}
						state={state}
						zip={zip}
						notes={notes}
						index={index}
						addNewInterview={addNewInterview}
						handleInputChange={handleInputChange}
					/>
				);
			})}
		</div>
	);
}

export default InterviewCardContainer;

import React, { useState, useEffect } from 'react';
import { getInterviews, addInterview, updateInterview } from '../../../utils/API';
import { useParams } from 'react-router-dom';
import InterviewCard from './InterviewCard';
import M from "materialize-css";
import _ from 'lodash';

const debouncedUpdateInterview = _.debounce(updateInterview, 500);

function InterviewCardContainer() {
	const [interviews, setInterviews] = useState([
		{ date: '', time: '', remote: false, street: '', city: '', state: '', zip: '', notes: '', _id: '' }
	]);

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			let retrievedInterviews = await getInterviews(id);
			if (retrievedInterviews.length > 0) {
				let formattedInterviews = retrievedInterviews.map((interview) => {
					const {
						date, time,
						location: { remote, street, city, state, zip },
						notes,
						_id
					} = interview;
					return { date, time, remote, street, city, state, zip, notes, _id };
				});
				setInterviews(formattedInterviews);
			}
		})();
	}, []);

	const handleInputChange = async (event, index, interviewId) => {
		let newInterviews = [...interviews];
		let shortName = event.target.name;
		newInterviews[index][shortName] = event.target.value;

		if (interviewId) {
      const { date, time, remote, street, city, state, zip, notes } = newInterviews[index];
      let formattedDate = new Date(date);
			const formattedInterview = { date: formattedDate, time, location: { remote, street, city, state, zip }, notes };
			debouncedUpdateInterview(formattedInterview, id, index);
		}

		setInterviews(newInterviews);
	};

	const addInterviewField = () => {
		const newInterview = { date: '', time: '', remote: false, street: '', city: '', state: '', zip: '', notes: '', _id: '' };
		const newInterviewArr = [...interviews, newInterview];
		setInterviews(newInterviewArr);
	};

	const addNewInterview = async (index) => {
		const { date, time, remote, street, city, state, zip, notes } = interviews[index];
    if ( date || time || remote || street || city || state || zip || notes ) {
      let formattedDate = new Date(date);
      const formattedInterview = { date: formattedDate, time, location: { remote, street, city, state, zip }, notes };
      await addInterview(formattedInterview, id);
      let newInterviews = await getInterviews(id);
      let formattedInterviews = newInterviews.map((interview) => {
        const {
          date, time,
          location: { remote, street, city, state, zip },
          notes,
          _id
        } = interview;
        return { date, time, remote, street, city, state, zip, notes, _id };
      });
      setInterviews(formattedInterviews);
    } else {
			console.log('toast should send');
			M.toast({ html: 'Please fill out at least one field' });
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
        const { date, time, remote, street, city, state, zip, notes } = interview;
				return (
					<InterviewCard
						key={interview._id || index}
						_id={interview._id}
            date={date}
            time={time}
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
